<?php

namespace App\Console\Commands;

use App\Models\Design;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use Imagick;
use ImagickException;

class GenerateDesignThumbnails extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'designs:generate-thumbnails {--chunk=100 : Number of designs to process per chunk}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate PNG thumbnails from SVG designs and save to public storage';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $chunkSize = $this->option('chunk');

        $this->info('Starting thumbnail generation...');

        $totalDesigns = Design::whereNotNull('svg')->count();
        $this->info("Total designs to process: {$totalDesigns}");

        $bar = $this->output->createProgressBar($totalDesigns);
        $bar->start();

        $processed = 0;
        $failed = 0;
        $skipped = 0;

        Design::whereNotNull('svg')
            ->chunk($chunkSize, function ($designs) use (&$processed, &$failed, &$skipped, $bar) {
                foreach ($designs as $design) {
                    try {
                        // Skip if SVG is empty
                        if (empty($design->svg)) {
                            $skipped++;
                            $bar->advance();
                            continue;
                        }

                        // Convert SVG to PNG
                        $pngPath = $this->convertSvgToPng($design);

                        if ($pngPath) {
                            // Update design with thumbnail path
                            $design->update(['thumb' => $pngPath]);
                            $processed++;
                        } else {
                            $failed++;
                        }
                    } catch (\Exception $e) {
                        $this->error("\nFailed to process design ID {$design->id}: " . $e->getMessage());
                        $failed++;
                    }

                    $bar->advance();
                }
            });

        $bar->finish();
        $this->newLine(2);

        $this->info("Thumbnail generation completed!");
        $this->table(
            ['Status', 'Count'],
            [
                ['Processed', $processed],
                ['Failed', $failed],
                ['Skipped', $skipped],
                ['Total', $totalDesigns]
            ]
        );

        return Command::SUCCESS;
    }

    /**
     * Convert SVG to PNG and save to public storage
     *
     * @param Design $design
     * @return string|null
     */
    private function convertSvgToPng(Design $design): ?string
    {
        try {
            // Create Imagick instance
            $imagick = new Imagick();

            // Set background color to transparent
            $imagick->setBackgroundColor(new \ImagickPixel('transparent'));

            // Read SVG data
            $imagick->readImageBlob($design->svg);

            // Set format to PNG
            $imagick->setImageFormat('png');

            // Set resolution for better quality
            $imagick->setImageResolution(300, 300);
            $imagick->resampleImage(300, 300, Imagick::FILTER_LANCZOS, 1);

            // Resize to thumbnail size (maintain aspect ratio)
            $imagick->thumbnailImage(800, 800, true);

            // Generate filename
            $filename = 'thumbnails/' . $design->id . '_' . time() . '.png';

            // Get PNG data
            $pngData = $imagick->getImageBlob();

            // Save to public storage
            Storage::disk('public')->put($filename, $pngData);

            // Clean up
            $imagick->clear();
            $imagick->destroy();

            return $filename;

        } catch (ImagickException $e) {
            $this->error("Imagick error for design ID {$design->id}: " . $e->getMessage());
            return null;
        } catch (\Exception $e) {
            $this->error("General error for design ID {$design->id}: " . $e->getMessage());
            return null;
        }
    }
}
