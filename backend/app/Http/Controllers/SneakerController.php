<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sneaker;
use Illuminate\Support\Str;

class SneakerController extends Controller
{
    public function index(Request $request)
    {
        $page = $request->get('page', 1);
        $limit = $request->get('limit', 10);
        $search = $request->get('search');

        $query = Sneaker::with('user:id,name,email')
            ->select('id', 'user_id', 'title', 'slug', 'brand_id', 'status', 'sneaker_color', 'preferred_color', 'created_at');

        if ($search) {
            $query->where('title', 'like', "%{$search}%")
                  ->orWhere('original_title', 'like', "%{$search}%")
                  ->orWhere('sneaker_color', 'like', "%{$search}%");
        }

        $sneakers = $query->paginate($limit, ['*'], 'page', $page);

        return response()->json([
            'data' => $sneakers->items(),
            'meta' => [
                'current_page' => $sneakers->currentPage(),
                'total' => $sneakers->total(),
                'per_page' => $sneakers->perPage(),
            ]
        ]);
    }

    public function show($id)
    {
        $sneaker = Sneaker::with('user:id,name,email')->findOrFail($id);

        return response()->json([
            'data' => $sneaker
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:150',
            'original_title' => 'nullable|string|max:125',
            'brand_id' => 'nullable|integer',
            'sub_model_category_id' => 'nullable|integer',
            'model_id' => 'nullable|integer',
            'description' => 'nullable|string',
            'image' => 'nullable|integer',
            'status' => 'required|integer',
            'is_feed' => 'boolean',
            'sneaker_color' => 'nullable|string|max:125',
            'preferred_color' => 'string|max:125',
            'colors' => 'required|string|max:125'
        ]);

        $validated['user_id'] = auth()->id();
        $validated['slug'] = Str::slug($validated['title']);
        $validated['preferred_color'] = $validated['preferred_color'] ?? 'Black';

        $counter = 1;
        $originalSlug = $validated['slug'];
        while (Sneaker::where('slug', $validated['slug'])->exists()) {
            $validated['slug'] = $originalSlug . '-' . $counter;
            $counter++;
        }

        $sneaker = Sneaker::create($validated);

        return response()->json([
            'data' => $sneaker->load('user:id,name,email'),
            'message' => 'Sneaker created successfully'
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $sneaker = Sneaker::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:150',
            'original_title' => 'nullable|string|max:125',
            'brand_id' => 'nullable|integer',
            'sub_model_category_id' => 'nullable|integer',
            'model_id' => 'nullable|integer',
            'description' => 'nullable|string',
            'image' => 'nullable|integer',
            'status' => 'required|integer',
            'is_feed' => 'boolean',
            'sneaker_color' => 'nullable|string|max:125',
            'preferred_color' => 'string|max:125',
            'colors' => 'required|string|max:125'
        ]);

        if ($validated['title'] !== $sneaker->title) {
            $validated['slug'] = Str::slug($validated['title']);

            $counter = 1;
            $originalSlug = $validated['slug'];
            while (Sneaker::where('slug', $validated['slug'])->where('id', '!=', $id)->exists()) {
                $validated['slug'] = $originalSlug . '-' . $counter;
                $counter++;
            }
        }

        $sneaker->update($validated);

        return response()->json([
            'data' => $sneaker->load('user:id,name,email'),
            'message' => 'Sneaker updated successfully'
        ]);
    }

    public function destroy($id)
    {
        $sneaker = Sneaker::findOrFail($id);
        $sneaker->delete();

        return response()->json([
            'message' => 'Sneaker deleted successfully'
        ]);
    }
}