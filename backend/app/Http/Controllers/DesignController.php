<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Design;
use App\Models\DesignTag;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class DesignController extends Controller
{
    public function index(Request $request)
    {
        $page = $request->get('page', 1);
        $limit = $request->get('limit', 10);
        $search = $request->get('search');

        $query = Design::with(['user:id,name,email', 'category:id,title', 'tags'])
            ->select('id', 'user_id', 'category_id', 'title', 'slug', 'status', 'is_chosen', 'is_featured', 'is_feed', 'created_at');

        if ($search) {
            $query->where('title', 'like', "%{$search}%")
                  ->orWhereHas('tags', function($q) use ($search) {
                      $q->where('tag', 'like', "%{$search}%");
                  });
        }

        $designs = $query->paginate($limit, ['*'], 'page', $page);

        return response()->json([
            'data' => $designs->items(),
            'meta' => [
                'current_page' => $designs->currentPage(),
                'total' => $designs->total(),
                'per_page' => $designs->perPage(),
            ]
        ]);
    }

    public function show($id)
    {
        $design = Design::with(['user:id,name,email', 'category', 'tags'])->findOrFail($id);

        return response()->json([
            'data' => $design
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|integer|exists:categories,id',
            'title' => 'required|string|max:100',
            'svg' => 'required|string',
            'description' => 'nullable|string',
            'status' => 'required|integer|in:0,1',
            'is_chosen' => 'boolean',
            'is_featured' => 'boolean',
            'is_feed' => 'boolean',
            'tags' => 'nullable|array',
            'tags.*' => 'nullable|string|max:125'
        ]);

        $validated['user_id'] = auth()->id();
        $validated['slug'] = Str::slug($validated['title']);

        $counter = 1;
        $originalSlug = $validated['slug'];
        while (Design::where('slug', $validated['slug'])->exists()) {
            $validated['slug'] = $originalSlug . '-' . $counter;
            $counter++;
        }

        return DB::transaction(function () use ($validated) {
            $tags = $validated['tags'] ?? [];
            unset($validated['tags']);

            $design = Design::create($validated);

            if (!empty($tags)) {
                foreach ($tags as $tag) {
                    if (!empty($tag)) {
                        $design->tags()->create(['tag' => $tag]);
                    }
                }
            }

            return response()->json([
                'data' => $design->load(['user:id,name,email', 'category', 'tags']),
                'message' => 'Design created successfully'
            ], 201);
        });
    }

    public function update(Request $request, $id)
    {
        $design = Design::findOrFail($id);

        $validated = $request->validate([
            'category_id' => 'required|integer|exists:categories,id',
            'title' => 'required|string|max:100',
            'svg' => 'required|string',
            'description' => 'nullable|string',
            'status' => 'required|integer|in:0,1',
            'is_chosen' => 'boolean',
            'is_featured' => 'boolean',
            'is_feed' => 'boolean',
            'tags' => 'nullable|array',
            'tags.*' => 'nullable|string|max:125'
        ]);

        if ($validated['title'] !== $design->title) {
            $validated['slug'] = Str::slug($validated['title']);

            $counter = 1;
            $originalSlug = $validated['slug'];
            while (Design::where('slug', $validated['slug'])->where('id', '!=', $id)->exists()) {
                $validated['slug'] = $originalSlug . '-' . $counter;
                $counter++;
            }
        }

        return DB::transaction(function () use ($validated, $design) {
            $tags = $validated['tags'] ?? [];
            unset($validated['tags']);

            $design->update($validated);

            // Delete existing tags and create new ones
            if (isset($tags)) {
                $design->tags()->delete();

                if (!empty($tags)) {
                    foreach ($tags as $tag) {
                        if (!empty($tag)) {
                            $design->tags()->create(['tag' => $tag]);
                        }
                    }
                }
            }

            return response()->json([
                'data' => $design->load(['user:id,name,email', 'category', 'tags']),
                'message' => 'Design updated successfully'
            ]);
        });
    }

    public function destroy($id)
    {
        $design = Design::findOrFail($id);

        // Delete associated tags
        $design->tags()->delete();

        $design->delete();

        return response()->json([
            'message' => 'Design deleted successfully'
        ]);
    }
}
