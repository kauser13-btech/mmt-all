<?php

namespace App\Console\Commands;

use App\Models\Product;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Storage;

class GenerateProductMockups extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'product:generate-mockups
                            {--product-id= : Generate for specific product ID only}
                            {--chunk-size=20 : Number of products to process per chunk}
                            {--design-scale=0.6 : Scale factor for design (0.0 to 1.0)}
                            {--design-y-offset=0 : Y offset for design positioning}
                            {--sneaker-scale=0.4 : Scale factor for sneaker (0.0 to 1.0)}
                            {--disk=public : Storage disk to save the output}
                            {--folder=generated-products : Folder path within storage disk}
                            {--skip-existing : Skip products that already have generated mockups}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate product mockups in batches by combining t-shirt, design SVG, and sneaker';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Starting batch product mockup generation...');
        $this->newLine();

        $productId = $this->option('product-id');
        $chunkSize = (int) $this->option('chunk-size');
        $designScale = (float) $this->option('design-scale');
        $designYOffset = (int) $this->option('design-y-offset');
        $sneakerScale = (float) $this->option('sneaker-scale');
        $disk = $this->option('disk');
        $folder = trim($this->option('folder'), '/');
        $skipExisting = $this->option('skip-existing');

        // Build query
        $query = Product::query()
            ->whereNotNull('primary_img_url')
            ->with(['design']);

        // Filter by specific product ID if provided
        if ($productId) {
            $query->where('id', $productId);
            $this->info("Processing single product ID: {$productId}");
        }

        $totalProducts = $query->count();

        if ($totalProducts === 0) {
            $this->warn('No products found to process.');
            return Command::SUCCESS;
        }

        $this->info("Found {$totalProducts} product(s) to process.");
        $this->newLine();

        $processedCount = 0;
        $successCount = 0;
        $skippedCount = 0;
        $failedCount = 0;

        // Create progress bar
        $progressBar = $this->output->createProgressBar($totalProducts);
        $progressBar->start();

        // Process products in chunks
        $query->chunk($chunkSize, function ($products) use (
            &$processedCount,
            &$successCount,
            &$skippedCount,
            &$failedCount,
            $designScale,
            $designYOffset,
            $sneakerScale,
            $disk,
            $folder,
            $skipExisting,
            $progressBar
        ) {
            foreach ($products as $product) {
                $processedCount++;

                try {
                    // Check if mockup already exists
                    if ($skipExisting && $product->mockup_url) {
                        $skippedCount++;
                        $progressBar->advance();
                        continue;
                    }

                    // Validate required fields
                    if (!$product->primary_img_url) {
                        $this->newLine();
                        $this->warn("Product #{$product->id}: Missing primary_img_url, skipping...");
                        $skippedCount++;
                        $progressBar->advance();
                        continue;
                    }

                    // Get design SVG
                    $designSvg = null;
                    if ($product->design_id && $product->design) {
                        $designSvg = $product->design->svg;
                    }

                    if (!$designSvg) {
                        $this->newLine();
                        $this->warn("Product #{$product->id}: No design SVG found, skipping...");
                        $skippedCount++;
                        $progressBar->advance();
                        continue;
                    }

                    // Generate unique output filename
                    $outputFilename = "product-{$product->id}-mockup-" . time() . ".png";

                    // Prepare command arguments
                    $arguments = [
                        'product_image' => $product->primary_img_url,
                        'design_svg' => $designSvg,
                        'sneaker_image' => $product->sneaker_image_url,
                        '--output' => $outputFilename,
                        '--design-scale' => $designScale,
                        '--design-y-offset' => $designYOffset,
                        '--sneaker-scale' => $sneakerScale,
                        '--disk' => $disk,
                        '--folder' => $folder,
                    ];

                    // Call the generate-image command
                    $exitCode = Artisan::call('product:generate-image', $arguments);

                    if ($exitCode === Command::SUCCESS) {
                        // Update product with mockup URL
                        $mockupPath = $folder ? "{$folder}/{$outputFilename}" : $outputFilename;

                        // Generate URL if possible
                        if (method_exists(Storage::disk($disk), 'url')) {
                            $mockupUrl = Storage::disk($disk)->url($mockupPath);
                            $product->mockup_url = $mockupUrl;
                            $product->save();
                        }

                        $successCount++;
                    } else {
                        $this->newLine();
                        $this->error("Product #{$product->id}: Mockup generation failed");
                        $failedCount++;
                    }
                } catch (\Exception $e) {
                    $this->newLine();
                    $this->error("Product #{$product->id}: Error - " . $e->getMessage());
                    $failedCount++;
                }

                $progressBar->advance();
            }
        });

        $progressBar->finish();
        $this->newLine(2);

        // Display summary
        $this->info('✓ Batch processing completed!');
        $this->newLine();

        $this->table(
            ['Metric', 'Count'],
            [
                ['Total Products', $totalProducts],
                ['Processed', $processedCount],
                ['Successful', $successCount],
                ['Skipped', $skippedCount],
                ['Failed', $failedCount],
            ]
        );

        return Command::SUCCESS;
    }
}
