<?php

namespace App\Services;

class ColorConverter
{
    private static $colorMap = [
        '#000000' => 'Black',
        '#FFFFFF' => 'White',
        '#FF0000' => 'Red',
        '#00FF00' => 'Lime',
        '#0000FF' => 'Blue',
        '#FFFF00' => 'Yellow',
        '#00FFFF' => 'Cyan',
        '#FF00FF' => 'Magenta',
        '#C0C0C0' => 'Silver',
        '#808080' => 'Gray',
        '#800000' => 'Maroon',
        '#808000' => 'Olive',
        '#008000' => 'Green',
        '#800080' => 'Purple',
        '#008080' => 'Teal',
        '#000080' => 'Navy',
        '#FFA500' => 'Orange',
        '#FFC0CB' => 'Pink',
        '#A52A2A' => 'Brown',
        '#FFFFE0' => 'LightYellow',
        '#90EE90' => 'LightGreen',
        '#ADD8E6' => 'LightBlue',
        '#F0E68C' => 'Khaki',
        '#E6E6FA' => 'Lavender',
        '#FFB6C1' => 'LightPink',
        '#20B2AA' => 'LightSeaGreen',
        '#87CEEB' => 'SkyBlue',
        '#98FB98' => 'PaleGreen',
        '#F5DEB3' => 'Wheat',
        '#D2691E' => 'Chocolate'
    ];

    /**
     * Convert hex color code to color name
     * @param string $hexCode - Hex color code (with or without #)
     * @return string - Color name or hex code if not found
     */
    public static function hexToColorName($hexCode)
    {
        // Clean and normalize the hex code
        $hexCode = strtoupper(str_replace('#', '', $hexCode));

        // Add # prefix for lookup
        $lookupCode = '#' . $hexCode;

        // Direct match
        if (isset(self::$colorMap[$lookupCode])) {
            return self::$colorMap[$lookupCode];
        }

        // Try to find closest color match
        $closestColor = self::findClosestColor($hexCode);

        return $closestColor ?: '#' . $hexCode; // Return original if no close match
    }

    /**
     * Find the closest color name by calculating color distance
     * @param string $hexCode - Hex color code without #
     * @return string|null - Closest color name
     */
    private static function findClosestColor($hexCode)
    {
        if (strlen($hexCode) !== 6) {
            return null;
        }

        // Convert hex to RGB
        $r = hexdec(substr($hexCode, 0, 2));
        $g = hexdec(substr($hexCode, 2, 2));
        $b = hexdec(substr($hexCode, 4, 2));

        $minDistance = PHP_INT_MAX;
        $closestColor = null;

        foreach (self::$colorMap as $hex => $name) {
            $colorHex = str_replace('#', '', $hex);
            $colorR = hexdec(substr($colorHex, 0, 2));
            $colorG = hexdec(substr($colorHex, 2, 2));
            $colorB = hexdec(substr($colorHex, 4, 2));

            // Calculate Euclidean distance in RGB space
            $distance = sqrt(
                pow($r - $colorR, 2) +
                pow($g - $colorG, 2) +
                pow($b - $colorB, 2)
            );

            if ($distance < $minDistance) {
                $minDistance = $distance;
                $closestColor = $name;
            }
        }

        // Only return if reasonably close (distance < 100)
        return $minDistance < 100 ? $closestColor : null;
    }

    /**
     * Get all available colors
     * @return array - Array of hex codes and color names
     */
    public static function getAllColors()
    {
        return self::$colorMap;
    }
}