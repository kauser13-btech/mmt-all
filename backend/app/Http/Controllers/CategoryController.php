<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        $typeId = $request->get('type_id');
        $parentId = $request->get('parent_id');
        $search = $request->get('search');

        $query = Category::where('status', 1);

        if ($typeId) {
            $query->where('type', $typeId);
        }

        if ($parentId !== null) {
            $query->where('parent_id', $parentId);
        }

        if ($search) {
            $query->where('title', 'like', "%{$search}%");
        }

        $categories = $query->select('id', 'title', 'parent_id', 'type')
                           ->orderBy('title')
                           ->get();
        return response()->json([
            'data' => $categories
        ]);
    }

    public function getBrands()
    {
        $brands = Category::where('type', 2)
                         ->where('parent_id', 0)
                         ->where('status', 1)
                         ->select('id', 'title', 'description')
                         ->orderBy('title')
                         ->get();

        return response()->json([
            'data' => $brands
        ]);
    }

    public function getSubModelCategories(Request $request)
    {
        $brandId = $request->get('brand_id');

        if (!$brandId) {
            return response()->json(['data' => []]);
        }

        $subModelCategories = Category::where('type', 2)
                                    ->where('parent_id', $brandId)
                                    ->where('status', 1)
                                    ->select('id', 'title', 'description')
                                    ->orderBy('title')
                                    ->get();

        return response()->json([
            'data' => $subModelCategories
        ]);
    }

    public function getModels(Request $request)
    {
        $subModelCategoryId = $request->get('sub_model_category_id');

        if (!$subModelCategoryId) {
            return response()->json(['data' => []]);
        }

        $models = Category::where('type', 2)
                         ->where('parent_id', $subModelCategoryId)
                         ->where('status', 1)
                         ->select('id', 'title', 'description')
                         ->orderBy('title')
                         ->get();

        return response()->json([
            'data' => $models
        ]);
    }
}
