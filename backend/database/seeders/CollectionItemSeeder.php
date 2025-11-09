<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CollectionItem;
use Illuminate\Support\Str;

class CollectionItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Clear existing items (disable foreign key checks temporarily)
        \DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        CollectionItem::truncate();
        \DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // T-Shirt styles and colors
        $tshirtStyles = [
            'Classic', 'Vintage', 'Modern', 'Retro', 'Premium', 'Essential',
            'Urban', 'Casual', 'Athletic', 'Graphic', 'Striped', 'Solid',
            'Printed', 'Oversized', 'Fitted', 'Relaxed', 'Slim Fit', 'Regular Fit'
        ];

        $colors = [
            'White', 'Black', 'Navy', 'Grey', 'Red', 'Blue', 'Green',
            'Yellow', 'Orange', 'Purple', 'Pink', 'Brown', 'Beige', 'Cream'
        ];

        $descriptions = [
            'Premium cotton blend with superior comfort and durability.',
            'Soft, breathable fabric perfect for everyday wear.',
            'High-quality construction with attention to detail.',
            'Comfortable fit that moves with you throughout the day.',
            'Stylish design that pairs well with any outfit.',
            'Perfect for layering or wearing on its own.',
            'Made with eco-friendly materials and sustainable practices.',
            'Classic style that never goes out of fashion.',
        ];

        // Unsplash t-shirt image IDs
        $tshirtImageIds = [
            '1521572163474-6864f9cf17ab', '1618354691373-d851c5c3a990', '1562157873-818bc0726f68',
            '1583744946564-b52ac1c389c8', '1622445275463-afa2ab738c34', '1583743814966-8936f5b7be1a',
            '1503341504253-dff4815485f1', '1576566588028-4147f3842f27', '1581655353564-df123a1eb820',
            '1598032895397-b9c0d0f7c5e6', '1529374255404-311a2a4f1fd9', '1620799140188-3b2a7c2e0e12',
        ];

        // Generate 60 T-shirts
        for ($i = 1; $i <= 60; $i++) {
            $style = $tshirtStyles[array_rand($tshirtStyles)];
            $color = $colors[array_rand($colors)];
            $title = "{$style} {$color} T-Shirt";
            $description = $descriptions[array_rand($descriptions)];
            $price = rand(2499, 4999) / 100; // $24.99 to $49.99

            $imageId = $tshirtImageIds[array_rand($tshirtImageIds)];
            $mainImage = "https://images.unsplash.com/photo-{$imageId}?w=800&h=800&fit=crop&q=80";

            // Generate gallery images
            $galleryImages = [];
            for ($j = 0; $j < 3; $j++) {
                $galleryImageId = $tshirtImageIds[array_rand($tshirtImageIds)];
                $galleryImages[] = "https://images.unsplash.com/photo-{$galleryImageId}?w=800&h=800&fit=crop&q=80";
            }

            CollectionItem::create([
                'title' => $title,
                'description' => $description,
                'image' => $mainImage,
                'images' => $galleryImages,
                'type' => 't-shirt',
                'slug' => Str::slug($title) . '-' . $i,
                'price' => $price,
                'is_active' => true,
            ]);
        }

        // Hoodie styles
        $hoodieStyles = [
            'Essential', 'Premium', 'Zip-Up', 'Pullover', 'Oversized', 'Classic',
            'Urban', 'Athletic', 'Fleece', 'Lightweight', 'Heavyweight', 'Tech',
            'Vintage', 'Modern', 'Casual', 'Sport', 'Street', 'Performance'
        ];

        // Unsplash hoodie image IDs
        $hoodieImageIds = [
            '1556821840-3a63f95609a7', '1591047139829-d91aecb6caea', '1620799140116-491c8fee2828',
            '1542327897-d73f4005b533', '1620799140408-edc6dcb6d633', '1578587018452-892bacefd3f2',
            '1620799140188-3b2a7c2e0e12', '1614252369475-531eba835eb1', '1515886657613-9f3515b0c78f',
            '1620799139834-6b8f844fbe61', '1564584217132-2271feaeb3c5',
        ];

        // Generate 60 Hoodies
        for ($i = 1; $i <= 60; $i++) {
            $style = $hoodieStyles[array_rand($hoodieStyles)];
            $color = $colors[array_rand($colors)];
            $title = "{$style} {$color} Hoodie";
            $description = $descriptions[array_rand($descriptions)];
            $price = rand(4999, 8999) / 100; // $49.99 to $89.99

            $imageId = $hoodieImageIds[array_rand($hoodieImageIds)];
            $mainImage = "https://images.unsplash.com/photo-{$imageId}?w=800&h=800&fit=crop&q=80";

            // Generate gallery images
            $galleryImages = [];
            for ($j = 0; $j < 3; $j++) {
                $galleryImageId = $hoodieImageIds[array_rand($hoodieImageIds)];
                $galleryImages[] = "https://images.unsplash.com/photo-{$galleryImageId}?w=800&h=800&fit=crop&q=80";
            }

            CollectionItem::create([
                'title' => $title,
                'description' => $description,
                'image' => $mainImage,
                'images' => $galleryImages,
                'type' => 'hoodie',
                'slug' => Str::slug($title) . '-' . $i,
                'price' => $price,
                'is_active' => true,
            ]);
        }

        $this->command->info('Created 60 T-shirts and 60 Hoodies (120 total items)');
    }
}
