<?php

namespace App\Http\Controllers;

use App\Models\CollectionItem;
use Illuminate\Http\Request;

class CollectionItemController extends Controller
{
    /**
     * Get all collection items by type with pagination.
     */
    public function index(Request $request, $type)
    {
        $perPage = $request->input('per_page', 20); // Default 20 items per page
        $perPage = min($perPage, 100); // Maximum 100 items per page

        $items = CollectionItem::ofType($type)
            ->active()
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $items->items(),
            'pagination' => [
                'current_page' => $items->currentPage(),
                'per_page' => $items->perPage(),
                'total' => $items->total(),
                'last_page' => $items->lastPage(),
                'from' => $items->firstItem(),
                'to' => $items->lastItem(),
            ],
        ]);
    }

    /**
     * Get a single collection item by slug.
     */
    public function show($type, $slug)
    {
        $item = CollectionItem::ofType($type)
            ->where('slug', $slug)
            ->active()
            ->firstOrFail();

        return response()->json([
            'success' => true,
            'data' => $item,
        ]);
    }

    /**
     * Store a new collection item.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'required|string',
            'images' => 'nullable|array',
            'type' => 'required|in:t-shirt,hoodie',
            'price' => 'nullable|numeric|min:0',
            'is_active' => 'boolean',
        ]);

        $item = CollectionItem::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Collection item created successfully',
            'data' => $item,
        ], 201);
    }

    /**
     * Update an existing collection item.
     */
    public function update(Request $request, $id)
    {
        $item = CollectionItem::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'sometimes|required|string',
            'images' => 'nullable|array',
            'type' => 'sometimes|required|in:t-shirt,hoodie',
            'price' => 'nullable|numeric|min:0',
            'is_active' => 'boolean',
        ]);

        $item->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Collection item updated successfully',
            'data' => $item,
        ]);
    }

    /**
     * Delete a collection item.
     */
    public function destroy($id)
    {
        $item = CollectionItem::findOrFail($id);
        $item->delete();

        return response()->json([
            'success' => true,
            'message' => 'Collection item deleted successfully',
        ]);
    }
}
