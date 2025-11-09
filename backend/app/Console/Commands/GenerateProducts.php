<?php

namespace App\Console\Commands;

use App\Models\Design;
use App\Models\Product;
use App\Models\Sneaker;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

class GenerateProducts extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'products:generate {--force : Regenerate all products even if they exist}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate products from all sneakers and designs for both tees and hoodies. On subsequent runs, only generates products for new sneakers/designs.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $force = $this->option('force');

        $this->info('Starting product generation...');

        // Fetch all sneakers and designs
        $sneakers = Sneaker::all();
        $designs = Design::whereNotNull('thumb')->get();

        if ($sneakers->isEmpty()) {
            $this->error('No sneakers found in database!');
            return Command::FAILURE;
        }

        if ($designs->isEmpty()) {
            $this->error('No designs with thumbnails found in database!');
            return Command::FAILURE;
        }

        $this->info("Found {$sneakers->count()} sneakers and {$designs->count()} designs");

        $types = ['tees', 'hoodies'];
        $totalProducts = $sneakers->count() * $designs->count() * count($types);

        // Get existing product slugs for faster lookup
        $existingSlugs = collect();
        if (!$force) {
            $existingSlugs = Product::pluck('slug')->flip();
        }

        $bar = $this->output->createProgressBar($totalProducts);
        $bar->start();

        $created = 0;
        $skipped = 0;

        foreach ($types as $type) {
            foreach ($sneakers as $sneaker) {
                foreach ($designs as $design) {
                    try {
                        // Generate unique slug
                        $slug = $this->generateSlug($sneaker, $design, $type);

                        // Check if product already exists (using collection for faster lookup)
                        if (!$force && $existingSlugs->has($slug)) {
                            $skipped++;
                            $bar->advance();
                            continue;
                        }

                        // Create product
                        Product::create([
                            'title' => $sneaker->title . ' - ' . $design->title,
                            'brand' => 'MMT',
                            'main_image' => $design->thumb,
                            'slug' => $slug,
                            'description' => $this->generateDescription($sneaker, $design, $type),
                            'weight' => 0,
                            'material' => 'MMT',
                            'color' => $sneaker->preferred_color ?? $sneaker->sneaker_color ?? 'default',
                            'status' => 'active',
                            'type' => $type,
                        ]);

                        $created++;
                    } catch (\Exception $e) {
                        $this->error("\nFailed to create product: " . $e->getMessage());
                    }

                    $bar->advance();
                }
            }
        }

        $bar->finish();
        $this->newLine(2);

        $this->info("Product generation completed!");
        $this->table(
            ['Status', 'Count'],
            [
                ['Created', $created],
                ['Skipped (already exist)', $skipped],
                ['Total', $totalProducts]
            ]
        );

        return Command::SUCCESS;
    }

    /**
     * Generate slug from sneaker and design
     *
     * @param Sneaker $sneaker
     * @param Design $design
     * @param string $type
     * @return string
     */
    private function generateSlug(Sneaker $sneaker, Design $design, string $type): string
    {
        return Str::slug($sneaker->slug . '-' . $design->slug . '-' . $type);
    }

    /**
     * Generate product description
     *
     * @param Sneaker $sneaker
     * @param Design $design
     * @param string $type
     * @return string
     */
    private function generateDescription(Sneaker $sneaker, Design $design, string $type): string
    {
        $typeLabel = ucfirst($type);
        return "Premium {$typeLabel} featuring {$sneaker->title} design with {$design->title} graphics. " .
               "High-quality MMT material for comfort and durability.";
    }
}
