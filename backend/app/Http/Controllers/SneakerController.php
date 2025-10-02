<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sneaker;
use App\Models\SpecificColor;
use App\Models\Asset;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

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
        $sneaker = Sneaker::with(['user:id,name,email', 'specificColors', 'asset'])->findOrFail($id);

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
            'asset_id' => 'nullable|integer',
            'status' => 'required|integer',
            'is_feed' => 'boolean',
            'sneaker_color' => 'nullable|string|max:125',
            'preferred_color' => 'string|max:125',
            'color_sequences' => 'nullable|array',
            'color_sequences.*.color_name' => 'nullable|string|max:125',
            'color_sequences.*.color_code' => 'nullable|string|max:7',
            'color_sequences.*.color_sequence' => 'nullable|array',
            'color_sequences.*.color_palette' => 'nullable|array'
        ]);

        $validated['user_id'] = auth()->id();
        $validated['slug'] = Str::slug($validated['title']);
        $validated['preferred_color'] = $validated['preferred_color'] ?? 'Black';

        // Auto-generate colors field from color_sequences
        $colorSequences = $validated['color_sequences'] ?? [];
        if (!empty($colorSequences)) {
            $colorCodes = array_column($colorSequences, 'color_code');
            $validated['colors'] = implode(',', $colorCodes);
        }

        $counter = 1;
        $originalSlug = $validated['slug'];
        while (Sneaker::where('slug', $validated['slug'])->exists()) {
            $validated['slug'] = $originalSlug . '-' . $counter;
            $counter++;
        }

        return DB::transaction(function () use ($validated) {
            $colorSequences = $validated['color_sequences'] ?? [];
            unset($validated['color_sequences']);

            $sneaker = Sneaker::create($validated);

            if (!empty($colorSequences)) {
                foreach ($colorSequences as $colorData) {
                    // Only save sequences that have both color_name and color_code
                    if (!empty($colorData['color_name']) && !empty($colorData['color_code'])) {
                        $sneaker->specificColors()->create([
                            'color_name' => $colorData['color_name'],
                            'color_code' => $colorData['color_code'],
                            'color_sequence' => $colorData['color_sequence'] ?? null,
                            'color_palette' => $colorData['color_palette'] ?? null
                        ]);
                    }
                }
            }

            return response()->json([
                'data' => $sneaker->load(['user:id,name,email', 'specificColors']),
                'message' => 'Sneaker created successfully'
            ], 201);
        });
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
            'asset_id' => 'nullable|integer',
            'status' => 'required|integer',
            'is_feed' => 'boolean',
            'sneaker_color' => 'nullable|string|max:125',
            'preferred_color' => 'string|max:125',
            'color_sequences' => 'nullable|array',
            'color_sequences.*.color_name' => 'nullable|string|max:125',
            'color_sequences.*.color_code' => 'nullable|string|max:7',
            'color_sequences.*.color_sequence' => 'nullable|array',
            'color_sequences.*.color_palette' => 'nullable|array',
            'colorPalette' => 'nullable|array',
            'colorPalette.*.name' => 'nullable|string|max:125',
            'colorPalette.*.color' => 'nullable|string|max:255'
        ]);

        // Auto-generate colors field from color_sequences
        $colorSequences = $validated['color_sequences'] ?? [];
        if (!empty($colorSequences)) {
            $colorCodes = array_column($colorSequences, 'color_code');
            $validated['colors'] = implode(',', $colorCodes);
        }

        if ($validated['title'] !== $sneaker->title) {
            $validated['slug'] = Str::slug($validated['title']);

            $counter = 1;
            $originalSlug = $validated['slug'];
            while (Sneaker::where('slug', $validated['slug'])->where('id', '!=', $id)->exists()) {
                $validated['slug'] = $originalSlug . '-' . $counter;
                $counter++;
            }
        }

        return DB::transaction(function () use ($validated, $sneaker) {
            $colorSequences = $validated['color_sequences'] ?? [];
            $colorPalette = $validated['colorPalette'] ?? null;
            unset($validated['color_sequences']);
            unset($validated['colorPalette']);

            $sneaker->update($validated);

            // Update Asset's color_palette if provided
            if ($colorPalette !== null && !empty($validated['asset_id'])) {
                $asset = Asset::find($validated['asset_id']);
                if ($asset) {
                    $asset->update(['color_palette' => $colorPalette]);
                }
            }

            if (isset($colorSequences)) {
                $sneaker->specificColors()->delete();

                if (!empty($colorSequences)) {
                    foreach ($colorSequences as $colorData) {
                        // Only save sequences that have both color_name and color_code
                        if (!empty($colorData['color_name']) && !empty($colorData['color_code'])) {
                            $sneaker->specificColors()->create([
                                'color_name' => $colorData['color_name'],
                                'color_code' => $colorData['color_code'],
                                'color_sequence' => $colorData['color_sequence'] ?? null,
                                'color_palette' => $colorData['color_palette'] ?? null
                            ]);
                        }
                    }
                }
            }

            return response()->json([
                'data' => $sneaker->load(['user:id,name,email', 'specificColors', 'asset']),
                'message' => 'Sneaker updated successfully'
            ]);
        });
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