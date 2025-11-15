<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CartController extends Controller
{
    /**
     * Get cart items for current user or session.
     */
    public function index(Request $request)
    {
        $userId = $request->user()?->id;
        $sessionId = $request->input('session_id') ?: $request->session()->getId();

        $query = CartItem::with('product');

        if ($userId) {
            $query->where('user_id', $userId);
        } else {
            $query->where('session_id', $sessionId);
        }

        $items = $query->get();

        return response()->json([
            'success' => true,
            'data' => $items,
            'total' => $items->sum(fn($item) => $item->price * $item->quantity),
        ]);
    }

    /**
     * Add item to cart.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:product,id',
            'size' => 'required|string',
            'color' => 'nullable|string',
            'quantity' => 'required|integer|min:1',
            'session_id' => 'nullable|string',
        ]);

        $userId = $request->user()?->id;
        $sessionId = $validated['session_id'] ?? $request->session()->getId();

        // Get the product to get the current price
        $product = Product::findOrFail($validated['product_id']);

        // Check if item already exists in cart
        $existingItem = CartItem::where('product_id', $validated['product_id'])
            ->where('size', $validated['size'])
            ->where('color', $validated['color'] ?? '')
            ->where(function ($query) use ($userId, $sessionId) {
                if ($userId) {
                    $query->where('user_id', $userId);
                } else {
                    $query->where('session_id', $sessionId);
                }
            })
            ->first();

        if ($existingItem) {
            // Update quantity
            $existingItem->quantity += $validated['quantity'];
            $existingItem->save();
            $cartItem = $existingItem;
        } else {
            // Create new cart item
            $cartItem = CartItem::create([
                'user_id' => $userId,
                'session_id' => $userId ? null : $sessionId,
                'product_id' => $validated['product_id'],
                'size' => $validated['size'],
                'color' => $validated['color'],
                'quantity' => $validated['quantity'],
                'price' => $product->price,
            ]);
        }

        $cartItem->load('product');

        return response()->json([
            'success' => true,
            'message' => 'Item added to cart',
            'data' => $cartItem,
        ], 201);
    }

    /**
     * Update cart item quantity.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $userId = $request->user()?->id;
        $sessionId = $request->input('session_id') ?: $request->session()->getId();

        $cartItem = CartItem::where('id', $id)
            ->where(function ($query) use ($userId, $sessionId) {
                if ($userId) {
                    $query->where('user_id', $userId);
                } else {
                    $query->where('session_id', $sessionId);
                }
            })
            ->firstOrFail();

        $cartItem->quantity = $validated['quantity'];
        $cartItem->save();

        return response()->json([
            'success' => true,
            'message' => 'Cart item updated',
            'data' => $cartItem->load('product'),
        ]);
    }

    /**
     * Remove item from cart.
     */
    public function destroy(Request $request, $id)
    {
        $userId = $request->user()?->id;
        $sessionId = $request->input('session_id') ?: $request->session()->getId();

        $cartItem = CartItem::where('id', $id)
            ->where(function ($query) use ($userId, $sessionId) {
                if ($userId) {
                    $query->where('user_id', $userId);
                } else {
                    $query->where('session_id', $sessionId);
                }
            })
            ->firstOrFail();

        $cartItem->delete();

        return response()->json([
            'success' => true,
            'message' => 'Item removed from cart',
        ]);
    }

    /**
     * Clear all cart items.
     */
    public function clear(Request $request)
    {
        $userId = $request->user()?->id;
        $sessionId = $request->input('session_id') ?: $request->session()->getId();

        $query = CartItem::query();

        if ($userId) {
            $query->where('user_id', $userId);
        } else {
            $query->where('session_id', $sessionId);
        }

        $query->delete();

        return response()->json([
            'success' => true,
            'message' => 'Cart cleared',
        ]);
    }

    /**
     * Merge guest cart with user cart after login.
     */
    public function merge(Request $request)
    {
        $validated = $request->validate([
            'session_id' => 'required|string',
        ]);

        $userId = $request->user()->id;
        $sessionId = $validated['session_id'];

        // Get guest cart items
        $guestItems = CartItem::where('session_id', $sessionId)
            ->whereNull('user_id')
            ->get();

        foreach ($guestItems as $guestItem) {
            // Check if user already has this item
            $existingItem = CartItem::where('user_id', $userId)
                ->where('product_id', $guestItem->product_id)
                ->where('size', $guestItem->size)
                ->where('color', $guestItem->color)
                ->first();

            if ($existingItem) {
                // Merge quantities
                $existingItem->quantity += $guestItem->quantity;
                $existingItem->save();
                $guestItem->delete();
            } else {
                // Transfer to user
                $guestItem->user_id = $userId;
                $guestItem->session_id = null;
                $guestItem->save();
            }
        }

        return response()->json([
            'success' => true,
            'message' => 'Cart merged successfully',
        ]);
    }
}
