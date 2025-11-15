<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class GenerateProductImage extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'product:generate-image
                            {product_image : URL or path to product base image}
                            {design_svg : SVG content or path to SVG file}
                            {sneaker_image? : Optional URL or path to sneaker image}
                            {--output= : Output filename (optional, generates unique name if not provided)}
                            {--design-scale=0.6 : Scale factor for design (0.0 to 1.0)}
                            {--design-y-offset=0 : Y offset for design positioning (positive moves down)}
                            {--sneaker-scale=0.4 : Scale factor for sneaker (0.0 to 1.0)}
                            {--disk=public : Storage disk to save the output}
                            {--folder=generated-products : Folder path within storage disk}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate product mockup by overlaying SVG design and sneaker on a product image';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        try {
            $this->info('Starting product image generation...');

            // Check GD extension
            if (!extension_loaded('gd')) {
                $this->error('GD extension is not loaded. Please install/enable GD extension.');
                return Command::FAILURE;
            }

            // Get inputs
            $productImageInput = $this->argument('product_image');
            $designSvgInput = $this->argument('design_svg');
            $sneakerImageInput = $this->argument('sneaker_image');

            // Get options
            $outputFilename = $this->option('output');
            $designScale = (float) $this->option('design-scale');
            $designYOffset = (int) $this->option('design-y-offset');
            $sneakerScale = (float) $this->option('sneaker-scale');
            $disk = $this->option('disk');
            $folder = trim($this->option('folder'), '/');

            // Validate scales
            if ($designScale <= 0 || $designScale > 1) {
                $this->error('Design scale must be between 0 and 1');
                return Command::FAILURE;
            }

            if ($sneakerScale <= 0 || $sneakerScale > 1) {
                $this->error('Sneaker scale must be between 0 and 1');
                return Command::FAILURE;
            }

            // Load product image
            $this->info('Loading product image...');
            $productImage = $this->loadImage($productImageInput);
            if (!$productImage) {
                $this->error('Failed to load product image');
                return Command::FAILURE;
            }

            // Get product dimensions
            $productWidth = imagesx($productImage);
            $productHeight = imagesy($productImage);

            $this->info("Product dimensions: {$productWidth}x{$productHeight}");

            // Load and overlay SVG design
            $this->info('Processing SVG design...');
            $designImage = $this->loadSvgAsImage($designSvgInput, $productWidth, $productHeight, $designScale);

            if ($designImage) {
                $designWidth = imagesx($designImage);
                $designHeight = imagesy($designImage);

                // Center horizontally, position in upper area with offset
                $designX = (int) (($productWidth - $designWidth) / 2);
                $designY = (int) ($productHeight * 0.15) + $designYOffset; // 15% from top + offset

                $this->info("Placing design ({$designWidth}x{$designHeight}) at position: ({$designX}, {$designY})");

                // Enable alpha blending on product image
                imagealphablending($productImage, true);

                // Copy design onto product
                imagecopy(
                    $productImage,
                    $designImage,
                    $designX,
                    $designY,
                    0,
                    0,
                    $designWidth,
                    $designHeight
                );

                imagedestroy($designImage);
            } else {
                $this->warn('Failed to load SVG design, continuing without it...');
            }

            // Load and overlay sneaker if provided
            if ($sneakerImageInput) {
                $this->info('Loading sneaker image...');
                $sneakerImage = $this->loadImage($sneakerImageInput);

                if ($sneakerImage) {
                    $sneakerOrigWidth = imagesx($sneakerImage);
                    $sneakerOrigHeight = imagesy($sneakerImage);

                    // Calculate sneaker dimensions based on scale
                    $sneakerWidth = (int) ($productWidth * $sneakerScale);
                    $sneakerHeight = (int) ($productHeight * $sneakerScale);

                    $this->info("Resizing sneaker from {$sneakerOrigWidth}x{$sneakerOrigHeight} to: {$sneakerWidth}x{$sneakerHeight}");

                    // Resize sneaker
                    $resizedSneaker = imagecreatetruecolor($sneakerWidth, $sneakerHeight);

                    // Enable alpha blending for transparency
                    imagealphablending($resizedSneaker, false);
                    imagesavealpha($resizedSneaker, true);

                    // Create transparent background
                    $transparent = imagecolorallocatealpha($resizedSneaker, 0, 0, 0, 127);
                    imagefill($resizedSneaker, 0, 0, $transparent);

                    // Copy and resize sneaker with transparency
                    imagealphablending($resizedSneaker, true);
                    imagecopyresampled(
                        $resizedSneaker,
                        $sneakerImage,
                        0, 0, 0, 0,
                        $sneakerWidth,
                        $sneakerHeight,
                        $sneakerOrigWidth,
                        $sneakerOrigHeight
                    );

                    // Position sneaker at bottom left
                    $sneakerX = 10;
                    $sneakerY = $productHeight - $sneakerHeight - 10;

                    $this->info("Placing sneaker at bottom left position: ({$sneakerX}, {$sneakerY})");

                    // Enable alpha blending on product image
                    imagealphablending($productImage, true);

                    // Copy sneaker onto product
                    imagecopy(
                        $productImage,
                        $resizedSneaker,
                        $sneakerX,
                        $sneakerY,
                        0,
                        0,
                        $sneakerWidth,
                        $sneakerHeight
                    );

                    imagedestroy($sneakerImage);
                    imagedestroy($resizedSneaker);
                } else {
                    $this->warn('Failed to load sneaker image, continuing without it...');
                }
            }

            // Generate output filename if not provided
            if (!$outputFilename) {
                $timestamp = time();
                $random = substr(md5(uniqid()), 0, 8);
                $outputFilename = "{$timestamp}-{$random}.png";
            }

            // Ensure filename has .png extension
            if (!str_ends_with(strtolower($outputFilename), '.png')) {
                $outputFilename .= '.png';
            }

            // Build full path
            $fullPath = $folder ? "{$folder}/{$outputFilename}" : $outputFilename;

            // Create temporary file to save image
            $tempFile = tempnam(sys_get_temp_dir(), 'product_');

            // Save as PNG
            imagesavealpha($productImage, true);
            imagepng($productImage, $tempFile, 9);

            // Read file contents
            $imageData = file_get_contents($tempFile);

            // Clean up temp file
            unlink($tempFile);

            // Save to storage
            $this->info("Saving to storage disk '{$disk}' at path: {$fullPath}");
            Storage::disk($disk)->put($fullPath, $imageData);

            // Get full URL if possible
            if (method_exists(Storage::disk($disk), 'url')) {
                $url = Storage::disk($disk)->url($fullPath);
                $this->info("Generated image URL: {$url}");
            }

            // Clean up
            imagedestroy($productImage);

            $this->newLine();
            $this->info('✓ Product image generated successfully!');
            $this->table(
                ['Property', 'Value'],
                [
                    ['Storage Disk', $disk],
                    ['File Path', $fullPath],
                    ['Design Scale', $designScale],
                    ['Sneaker Scale', $sneakerImageInput ? $sneakerScale : 'N/A'],
                ]
            );

            return Command::SUCCESS;

        } catch (\Exception $e) {
            $this->error('Error: ' . $e->getMessage());
            $this->error('Stack trace: ' . $e->getTraceAsString());
            return Command::FAILURE;
        }
    }

    /**
     * Load SVG and convert to PNG image
     *
     * @param string $input SVG content or path to SVG file
     * @param int $productWidth Product width for scaling
     * @param int $productHeight Product height for scaling
     * @param float $scale Scale factor
     * @return \GdImage|resource|null
     */
    private function loadSvgAsImage(string $input, int $productWidth, int $productHeight, float $scale)
    {
        try {
            $svgContent = null;

            // Check if input is SVG content (starts with <?xml or <svg)
            if (str_starts_with(trim($input), '<?xml') || str_starts_with(trim($input), '<svg')) {
                $svgContent = $input;
            } elseif (filter_var($input, FILTER_VALIDATE_URL)) {
                // Download SVG from URL
                $svgContent = @file_get_contents($input);
                if ($svgContent === false) {
                    $this->error("Failed to download SVG from URL: {$input}");
                    return null;
                }
            } elseif (file_exists($input)) {
                // Load from local file
                $svgContent = file_get_contents($input);
            } else {
                // Try to load from storage
                $storagePath = storage_path('app/public/' . $input);
                if (file_exists($storagePath)) {
                    $svgContent = file_get_contents($storagePath);
                } else {
                    $this->error("SVG file not found: {$input}");
                    return null;
                }
            }

            if (!$svgContent) {
                $this->error("No SVG content loaded");
                return null;
            }

            // Calculate target dimensions
            $targetWidth = (int) ($productWidth * $scale);
            $targetHeight = (int) ($productHeight * $scale);

            // Check if Imagick extension is available
            if (!extension_loaded('imagick')) {
                $this->error("Imagick extension is not loaded. Please install/enable Imagick extension for SVG support.");
                return null;
            }

            // Use Imagick to convert SVG to PNG
            $imagick = new \Imagick();

            // Set background to transparent BEFORE reading SVG
            $imagick->setBackgroundColor(new \ImagickPixel('transparent'));

            // Set resolution for better quality
            $imagick->setResolution(300, 300);

            // Read SVG from string
            $imagick->readImageBlob($svgContent);

            // Set format to PNG with alpha channel
            $imagick->setImageFormat('png32');

            // Flatten image with transparent background
            $imagick->setImageAlphaChannel(\Imagick::ALPHACHANNEL_SET);

            // Resize while maintaining aspect ratio
            $imagick->resizeImage($targetWidth, $targetHeight, \Imagick::FILTER_LANCZOS, 1, true);

            // Get PNG blob
            $pngBlob = $imagick->getImageBlob();

            // Create GD image from PNG blob
            $image = imagecreatefromstring($pngBlob);

            // Clean up Imagick object
            $imagick->clear();
            $imagick->destroy();

            if (!$image) {
                $this->error("Failed to create GD image from Imagick PNG");
                return null;
            }

            // Enable alpha blending and save alpha channel
            imagealphablending($image, true);
            imagesavealpha($image, true);

            return $image;

        } catch (\ImagickException $e) {
            $this->error("Imagick error while converting SVG: " . $e->getMessage());
            return null;
        } catch (\Exception $e) {
            $this->error("Failed to load SVG: " . $e->getMessage());
            return null;
        }
    }

    /**
     * Load an image from URL or local path using GD
     *
     * @param string $input URL or file path
     * @return \GdImage|resource|null
     */
    private function loadImage(string $input)
    {
        try {
            $imageData = null;

            // Check if input is a URL
            if (filter_var($input, FILTER_VALIDATE_URL)) {
                // Download image from URL
                $imageData = @file_get_contents($input);
                if ($imageData === false) {
                    $this->error("Failed to download image from URL: {$input}");
                    return null;
                }
            } elseif (file_exists($input)) {
                // Load from local file
                $imageData = file_get_contents($input);
            } else {
                // Try to load from storage
                $storagePath = storage_path('app/public/' . $input);
                if (file_exists($storagePath)) {
                    $imageData = file_get_contents($storagePath);
                } else {
                    $this->error("Image not found: {$input}");
                    return null;
                }
            }

            if (!$imageData) {
                $this->error("No image data loaded from: {$input}");
                return null;
            }

            // Create image from string
            $image = imagecreatefromstring($imageData);

            if (!$image) {
                $this->error("Failed to create image from data: {$input}");
                return null;
            }

            // Enable alpha blending and save alpha channel
            imagealphablending($image, true);
            imagesavealpha($image, true);

            return $image;

        } catch (\Exception $e) {
            $this->error("Failed to load image '{$input}': " . $e->getMessage());
            return null;
        }
    }
}
