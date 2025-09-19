<?php

namespace App\Services;

use Exception;

class ColorExtractor
{
    /**
     * Extract dominant colors from an image
     * @param string $imagePath Path to the image file
     * @param int $numColors Number of dominant colors to extract
     * @return array Array of hex color codes
     */
    public function extractDominantColors($imagePath, $numColors = 5)
    {
        if (!file_exists($imagePath)) {
            throw new Exception("Image file not found: $imagePath");
        }

        if (!extension_loaded('gd')) {
            throw new Exception("GD extension is not loaded");
        }

        // Create image resource based on file type
        $imageInfo = @getimagesize($imagePath);
        if (!$imageInfo) {
            throw new Exception("Unable to get image information");
        }

        $mimeType = $imageInfo['mime'];

        switch ($mimeType) {
            case 'image/jpeg':
                $image = @imagecreatefromjpeg($imagePath);
                break;
            case 'image/png':
                $image = @imagecreatefrompng($imagePath);
                break;
            case 'image/gif':
                $image = @imagecreatefromgif($imagePath);
                break;
            case 'image/webp':
                $image = @imagecreatefromwebp($imagePath);
                break;
            default:
                throw new Exception("Unsupported image format: $mimeType");
        }

        if (!$image) {
            throw new Exception("Failed to create image resource");
        }

        // Resize image for faster processing
        $resizedImage = $this->resizeImage($image, 150, 150);
        $width = imagesx($resizedImage);
        $height = imagesy($resizedImage);

        // Extract all colors
        $colors = [];
        for ($x = 0; $x < $width; $x++) {
            for ($y = 0; $y < $height; $y++) {
                $rgb = imagecolorat($resizedImage, $x, $y);
                $r = ($rgb >> 16) & 0xFF;
                $g = ($rgb >> 8) & 0xFF;
                $b = $rgb & 0xFF;

                // Skip very light or very dark colors
                $brightness = ($r + $g + $b) / 3;
                if ($brightness > 240 || $brightness < 15) {
                    continue;
                }

                // Group similar colors together (reduce precision)
                $r = floor($r / 16) * 16;
                $g = floor($g / 16) * 16;
                $b = floor($b / 16) * 16;

                $hex = sprintf("#%02x%02x%02x", $r, $g, $b);

                if (!isset($colors[$hex])) {
                    $colors[$hex] = 0;
                }
                $colors[$hex]++;
            }
        }

        // Sort by frequency and return top colors
        arsort($colors);
        $dominantColors = array_slice(array_keys($colors), 0, $numColors);

        // Cleanup
        imagedestroy($image);
        imagedestroy($resizedImage);

        return $dominantColors;
    }

    /**
     * Get color at specific pixel coordinates
     * @param string $imagePath Path to the image file
     * @param int $x X coordinate
     * @param int $y Y coordinate
     * @return string Hex color code
     */
    public function getColorAtPixel($imagePath, $x, $y)
    {
        if (!file_exists($imagePath)) {
            throw new Exception("Image file not found: $imagePath");
        }

        if (!extension_loaded('gd')) {
            throw new Exception("GD extension is not loaded");
        }

        $imageInfo = @getimagesize($imagePath);
        if (!$imageInfo) {
            throw new Exception("Unable to get image information");
        }

        $mimeType = $imageInfo['mime'];

        switch ($mimeType) {
            case 'image/jpeg':
                $image = @imagecreatefromjpeg($imagePath);
                break;
            case 'image/png':
                $image = @imagecreatefrompng($imagePath);
                break;
            case 'image/gif':
                $image = @imagecreatefromgif($imagePath);
                break;
            case 'image/webp':
                $image = @imagecreatefromwebp($imagePath);
                break;
            default:
                throw new Exception("Unsupported image format: $mimeType");
        }

        if (!$image) {
            throw new Exception("Failed to create image resource");
        }

        $rgb = imagecolorat($image, $x, $y);
        $r = ($rgb >> 16) & 0xFF;
        $g = ($rgb >> 8) & 0xFF;
        $b = $rgb & 0xFF;

        $hex = sprintf("#%02x%02x%02x", $r, $g, $b);

        imagedestroy($image);

        return $hex;
    }

    /**
     * Generate a color palette from the image
     * @param string $imagePath Path to the image file
     * @param int $paletteSize Size of the color palette
     * @return array Color palette with hex codes and RGB values
     */
    public function generatePalette($imagePath, $paletteSize = 8)
    {
        $dominantColors = $this->extractDominantColors($imagePath, $paletteSize);

        $palette = [];
        foreach ($dominantColors as $hex) {
            $rgb = $this->hexToRgb($hex);
            $palette[] = [
                'color' => $hex,
                'name' => $this->getColorName($hex),
                'count' => 1,
                'rgb' => $rgb,
                'hsl' => $this->rgbToHsl($rgb['r'], $rgb['g'], $rgb['b'])
            ];
        }

        return $palette;
    }

    /**
     * Resize image while maintaining aspect ratio
     */
    private function resizeImage($image, $maxWidth, $maxHeight)
    {
        $width = imagesx($image);
        $height = imagesy($image);

        $ratio = min($maxWidth / $width, $maxHeight / $height);
        $newWidth = (int)($width * $ratio);
        $newHeight = (int)($height * $ratio);

        $resized = imagecreatetruecolor($newWidth, $newHeight);
        imagecopyresampled($resized, $image, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);

        return $resized;
    }

    /**
     * Convert hex color to RGB
     */
    private function hexToRgb($hex)
    {
        $hex = ltrim($hex, '#');
        return [
            'r' => hexdec(substr($hex, 0, 2)),
            'g' => hexdec(substr($hex, 2, 2)),
            'b' => hexdec(substr($hex, 4, 2))
        ];
    }

    /**
     * Convert RGB to HSL
     */
    private function rgbToHsl($r, $g, $b)
    {
        $r /= 255;
        $g /= 255;
        $b /= 255;

        $max = max($r, $g, $b);
        $min = min($r, $g, $b);
        $l = ($max + $min) / 2;

        if ($max == $min) {
            $h = $s = 0;
        } else {
            $d = $max - $min;
            $s = $l > 0.5 ? $d / (2 - $max - $min) : $d / ($max + $min);

            switch ($max) {
                case $r:
                    $h = ($g - $b) / $d + ($g < $b ? 6 : 0);
                    break;
                case $g:
                    $h = ($b - $r) / $d + 2;
                    break;
                case $b:
                    $h = ($r - $g) / $d + 4;
                    break;
            }
            $h /= 6;
        }

        return [
            'h' => round($h * 360),
            's' => round($s * 100),
            'l' => round($l * 100)
        ];
    }

    /**
     * Get basic color name from hex
     */
    private function getColorName($hex)
    {
        $rgb = $this->hexToRgb($hex);
        $r = $rgb['r'];
        $g = $rgb['g'];
        $b = $rgb['b'];

        // Simple color naming logic
        if ($r > 200 && $g < 100 && $b < 100) return 'Red';
        if ($r < 100 && $g > 200 && $b < 100) return 'Green';
        if ($r < 100 && $g < 100 && $b > 200) return 'Blue';
        if ($r > 200 && $g > 200 && $b < 100) return 'Yellow';
        if ($r > 200 && $g < 100 && $b > 200) return 'Magenta';
        if ($r < 100 && $g > 200 && $b > 200) return 'Cyan';
        if ($r > 150 && $g > 100 && $b < 100) return 'Orange';
        if ($r > 100 && $g < 100 && $b > 100) return 'Purple';
        if ($r > 150 && $g > 100 && $b > 100) return 'Pink';
        if ($r > 100 && $g > 80 && $b < 80) return 'Brown';
        if ($r < 100 && $g < 100 && $b < 100) return 'Black';
        if ($r > 200 && $g > 200 && $b > 200) return 'White';
        if ($r > 100 && $g > 100 && $b > 100) return 'Gray';

        return 'Mixed';
    }

    /**
     * Fallback method for basic color info when GD is not available
     */
    public function getBasicColorInfo($filename)
    {
        // Try to extract color information from filename
        $filename = strtolower($filename);
        $colors = [];

        $colorKeywords = [
            'red' => ['color' => '#dc2626', 'name' => 'Red'],
            'blue' => ['color' => '#2563eb', 'name' => 'Blue'],
            'green' => ['color' => '#16a34a', 'name' => 'Green'],
            'yellow' => ['color' => '#ca8a04', 'name' => 'Yellow'],
            'orange' => ['color' => '#ea580c', 'name' => 'Orange'],
            'purple' => ['color' => '#9333ea', 'name' => 'Purple'],
            'pink' => ['color' => '#ec4899', 'name' => 'Pink'],
            'brown' => ['color' => '#a16207', 'name' => 'Brown'],
            'black' => ['color' => '#171717', 'name' => 'Black'],
            'white' => ['color' => '#f8fafc', 'name' => 'White'],
            'gray' => ['color' => '#6b7280', 'name' => 'Gray'],
            'grey' => ['color' => '#6b7280', 'name' => 'Gray'],
        ];

        foreach ($colorKeywords as $keyword => $colorInfo) {
            if (strpos($filename, $keyword) !== false) {
                $colors[] = [
                    'color' => $colorInfo['color'],
                    'name' => $colorInfo['name'],
                    'count' => 1
                ];
            }
        }

        // If no colors found in filename, return default sneaker colors
        if (empty($colors)) {
            $colors = [
                ['color' => '#171717', 'name' => 'Black', 'count' => 1],
                ['color' => '#f8fafc', 'name' => 'White', 'count' => 1],
                ['color' => '#6b7280', 'name' => 'Gray', 'count' => 1]
            ];
        }

        return $colors;
    }
}