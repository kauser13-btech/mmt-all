<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Asset;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Services\ColorExtractor;

class AssetController extends Controller
{
    /**
     * Extract color palette from image using ColorExtractor service
     */
    private function extractColorPalette($imagePath, $numColors = 5)
    {
        try {
            // Get the full path to the image
            $fullPath = storage_path('app/public/' . str_replace('/storage/', '', $imagePath));

            if (!file_exists($fullPath)) {
                return [];
            }

            $colorExtractor = new ColorExtractor();
            $palette = $colorExtractor->generatePalette($fullPath, $numColors);

            return $palette;

        } catch (\Exception $e) {
            \Log::error('Color extraction failed: ' . $e->getMessage());
            return [];
        }
    }
    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:jpeg,png,jpg,gif,webp|max:10240', // 10MB max
        ]);

        try {
            $file = $request->file('file');
            $originalName = $file->getClientOriginalName();
            $extension = $file->getClientOriginalExtension();

            // Generate unique filename
            $fileName = Str::uuid() . '.' . $extension;

            // Store file in local storage (public/assets directory)
            $path = $file->storeAs('assets', $fileName, 'public');

            // Extract color palette from the uploaded image
            $colorPalette = $this->extractColorPalette('/storage/' . $path);

            // If color extraction failed, provide basic color info
            if (empty($colorPalette)) {
                $colorExtractor = new ColorExtractor();
                $colorPalette = $colorExtractor->getBasicColorInfo($originalName);
            }

            // Create asset record
            $asset = Asset::create([
                'user_id' => auth()->id(),
                'asset_name' => $originalName,
                'asset_url' => '/storage/' . $path,
                'status' => Asset::STATUS_ACTIVE,
                'storage_type' => Asset::STORAGE_LOCAL,
                'color_palette' => $colorPalette
            ]);

            return response()->json([
                'success' => true,
                'data' => [
                    'id' => $asset->id,
                    'asset_name' => $asset->asset_name,
                    'asset_url' => $asset->asset_url,
                    'full_url' => url($asset->asset_url),
                    'color_palette' => $colorPalette,
                    'dominant_colors' => array_slice(array_column($colorPalette, 'color'), 0, 3),
                    'color_names' => array_column($colorPalette, 'name')
                ],
                'message' => 'File uploaded successfully'
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Upload failed: ' . $e->getMessage()
            ], 500);
        }
    }

    public function index(Request $request)
    {
        $page = $request->get('page', 1);
        $limit = $request->get('limit', 20);
        $search = $request->get('search');

        $query = Asset::where('user_id', auth()->id())
                     ->where('status', Asset::STATUS_ACTIVE)
                     ->orderBy('created_at', 'desc');

        if ($search) {
            $query->where('asset_name', 'like', "%{$search}%");
        }

        $assets = $query->paginate($limit, ['*'], 'page', $page);

        return response()->json([
            'data' => $assets->items(),
            'meta' => [
                'current_page' => $assets->currentPage(),
                'total' => $assets->total(),
                'per_page' => $assets->perPage(),
            ]
        ]);
    }

    public function show($id)
    {
        $asset = Asset::where('user_id', auth()->id())
                     ->where('id', $id)
                     ->firstOrFail();

        return response()->json([
            'data' => [
                'id' => $asset->id,
                'asset_name' => $asset->asset_name,
                'asset_url' => $asset->asset_url,
                'full_url' => url($asset->asset_url),
                'storage_type' => $asset->storage_type_name,
                'color_palette' => $asset->color_palette,
                'created_at' => $asset->created_at
            ]
        ]);
    }

    public function destroy($id)
    {
        $asset = Asset::where('user_id', auth()->id())
                     ->where('id', $id)
                     ->firstOrFail();

        // Delete file from storage
        if ($asset->storage_type === Asset::STORAGE_LOCAL) {
            $filePath = str_replace('/storage/', '', $asset->asset_url);
            Storage::disk('public')->delete($filePath);
        }

        $asset->delete();

        return response()->json([
            'message' => 'Asset deleted successfully'
        ]);
    }
}