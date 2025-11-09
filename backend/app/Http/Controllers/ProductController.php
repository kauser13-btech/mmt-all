<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $page = $request->get('page', 1);
        $limit = $request->get('limit', 10);
        $search = $request->get('search');

        $query = Product::query();

        if ($search) {
            $query->where('title', 'like', "%{$search}%")
                  ->orWhere('brand', 'like', "%{$search}%")
                  ->orWhere('sku', 'like', "%{$search}%")
                  ->orWhere('material', 'like', "%{$search}%")
                  ->orWhere('color', 'like', "%{$search}%");
        }

        $products = $query->orderBy('created_at', 'desc')
                         ->paginate($limit, ['*'], 'page', $page);

        return response()->json([
            'data' => $products->items(),
            'meta' => [
                'current_page' => $products->currentPage(),
                'total' => $products->total(),
                'per_page' => $products->perPage(),
            ]
        ]);
    }

    public function show($id)
    {
        $product = Product::findOrFail($id);

        return response()->json([
            'data' => $product
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'brand' => 'nullable|string|max:255',
            'main_image' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'weight' => 'nullable|numeric|min:0',
            'material' => 'nullable|string|max:255',
            'color' => 'nullable|string|max:255',
            'status' => 'required|string|in:active,inactive,draft',
            'type' => 'required|string|in:tees,hoodies',
        ]);

        $product = Product::create($validated);

        return response()->json([
            'data' => $product,
            'message' => 'Product created successfully'
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'brand' => 'nullable|string|max:255',
            'main_image' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'weight' => 'nullable|numeric|min:0',
            'material' => 'nullable|string|max:255',
            'color' => 'nullable|string|max:255',
            'status' => 'required|string|in:active,inactive,draft',
            'type' => 'required|string|in:tees,hoodies',
        ]);

        $product->update($validated);

        return response()->json([
            'data' => $product,
            'message' => 'Product updated successfully'
        ]);
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return response()->json([
            'message' => 'Product deleted successfully'
        ]);
    }
}
