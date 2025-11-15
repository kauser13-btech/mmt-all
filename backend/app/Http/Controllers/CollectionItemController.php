<?php

namespace App\Http\Controllers;

use App\Models\Product;
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

        $items = Product::where('type', $type)
            ->whereNotNull('price')
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);

        // Transform data to match frontend expectations
        $transformedItems = $items->getCollection()->map(function ($product) {
            return [
                'id' => $product->id,
                'title' => $product->title,
                'slug' => $product->slug,
                'description' => $product->description,
                'image' => $product->primary_img_url,
                'images' => $product->sneaker_image_url ? [$product->primary_img_url, $product->sneaker_image_url] : [$product->primary_img_url],
                'mockup_url' => $product->mockup_url,
                'type' => $product->type,
                'price' => $product->price,
                'color_name' => $product->color_name,
                'color_code' => $product->color_code,
                'brand' => $product->brand,
                'material' => $product->material,
                'weight' => $product->weight,
                'sku' => $product->sku,
                'is_active' => true,
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $transformedItems,
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
        $product = Product::where('type', $type)
            ->where('slug', $slug)
            ->whereNotNull('price')
            ->firstOrFail();

        // Transform data to match frontend expectations
        $item = [
            'id' => $product->id,
            'title' => $product->title,
            'slug' => $product->slug,
            'description' => $product->description,
            'image' => $product->primary_img_url,
            'images' => $product->sneaker_image_url ? [$product->primary_img_url, $product->sneaker_image_url] : [$product->primary_img_url],
            'mockup_url' => $product->mockup_url,
            'type' => $product->type,
            'price' => $product->price,
            'color_name' => $product->color_name,
            'color_code' => $product->color_code,
            'brand' => $product->brand,
            'material' => $product->material,
            'weight' => $product->weight,
            'sku' => $product->sku,
            'is_active' => true,
        ];

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
            'primary_img_url' => 'required|string|max:500',
            'sneaker_image_url' => 'nullable|string|max:500',
            'type' => 'required|string|max:100',
            'brand' => 'nullable|string|max:150',
            'price' => 'required|numeric|min:0',
            'color_name' => 'nullable|string|max:100',
            'color_code' => 'nullable|string|max:20',
            'material' => 'nullable|string|max:150',
            'weight' => 'nullable|numeric|min:0',
        ]);

        $product = Product::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Product created successfully',
            'data' => $product,
        ], 201);
    }

    /**
     * Update an existing collection item.
     */
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'primary_img_url' => 'sometimes|required|string|max:500',
            'sneaker_image_url' => 'nullable|string|max:500',
            'type' => 'sometimes|required|string|max:100',
            'brand' => 'nullable|string|max:150',
            'price' => 'sometimes|required|numeric|min:0',
            'color_name' => 'nullable|string|max:100',
            'color_code' => 'nullable|string|max:20',
            'material' => 'nullable|string|max:150',
            'weight' => 'nullable|numeric|min:0',
        ]);

        $product->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Product updated successfully',
            'data' => $product,
        ]);
    }

    /**
     * Delete a collection item.
     */
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return response()->json([
            'success' => true,
            'message' => 'Product deleted successfully',
        ]);
    }
}
