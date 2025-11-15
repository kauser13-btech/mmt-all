# Product Mockup Generation

This document explains how to generate product mockups by overlaying SVG designs and sneakers on t-shirt images.

## Prerequisites

1. **Imagick Extension** for PHP (for SVG to PNG conversion):
   ```bash
   # Check if Imagick is enabled
   php -m | grep imagick

   # If not installed, install it in your Docker container
   # (usually pre-installed in most PHP Docker images)
   ```

2. **GD Extension** for PHP (for image manipulation):
   ```bash
   # Check if GD is enabled
   php -m | grep gd
   ```

Both extensions are typically pre-installed in PHP Docker containers.

## Database Setup

Run the migration to add the `mockup_url` column to the product table:

```bash
php artisan migrate
```

## Commands

### 1. Generate Single Product Mockup

Generate a mockup for a single product by providing the t-shirt image, design SVG, and optional sneaker image.

```bash
php artisan product:generate-image \
    {product_image} \
    {design_svg} \
    {sneaker_image?} \
    [options]
```

#### Arguments:
- `product_image` - URL or path to the t-shirt/product base image
- `design_svg` - SVG content or path to SVG file
- `sneaker_image` - (Optional) URL or path to sneaker image

#### Options:
- `--output=filename.png` - Custom output filename (auto-generated if not provided)
- `--design-scale=0.6` - Scale factor for design (0.0 to 1.0, default: 0.6)
- `--design-y-offset=0` - Y offset for design positioning (positive moves down)
- `--sneaker-scale=0.4` - Scale factor for sneaker (0.0 to 1.0, default: 0.4)
- `--disk=public` - Storage disk (default: public)
- `--folder=generated-products` - Output folder (default: generated-products)

#### Examples:

**Using URLs:**
```bash
php artisan product:generate-image \
    "https://example.com/tshirt.png" \
    "https://example.com/design.svg" \
    "https://example.com/sneaker.png" \
    --output=my-mockup.png
```

**Using local files:**
```bash
php artisan product:generate-image \
    storage/app/public/tshirts/white-tshirt.png \
    storage/app/public/designs/basketball-mom.svg \
    storage/app/public/sneakers/jordan.png
```

**SVG content directly:**
```bash
php artisan product:generate-image \
    "https://example.com/tshirt.png" \
    '<?xml version="1.0"?><svg>...</svg>' \
    --design-scale=0.7
```

### 2. Batch Generate Product Mockups

Process multiple products in chunks by pulling data from the database.

```bash
php artisan product:generate-mockups [options]
```

#### How it works:
1. Queries products from the database (with `primary_img_url` and `design_id`)
2. Loads the design SVG from the `designs` table
3. Uses `sneaker_image_url` if available
4. Generates mockup and saves it to storage
5. Updates the product record with the `mockup_url`

#### Options:
- `--product-id=123` - Generate for a specific product ID only
- `--chunk-size=20` - Number of products to process per chunk (default: 20)
- `--design-scale=0.6` - Scale factor for design (default: 0.6)
- `--design-y-offset=0` - Y offset for design positioning
- `--sneaker-scale=0.4` - Scale factor for sneaker (default: 0.4)
- `--disk=public` - Storage disk (default: public)
- `--folder=generated-products` - Output folder (default: generated-products)
- `--skip-existing` - Skip products that already have a mockup_url

#### Examples:

**Process all products:**
```bash
php artisan product:generate-mockups
```

**Process specific product:**
```bash
php artisan product:generate-mockups --product-id=42
```

**Custom chunk size and skip existing:**
```bash
php artisan product:generate-mockups \
    --chunk-size=50 \
    --skip-existing
```

**Custom positioning and scaling:**
```bash
php artisan product:generate-mockups \
    --design-scale=0.7 \
    --design-y-offset=50 \
    --sneaker-scale=0.35
```

## Output

Generated mockups are saved to:
- **Storage Path:** `storage/app/public/generated-products/`
- **Public URL:** Accessible via `Storage::disk('public')->url($path)`

The batch command updates each product's `mockup_url` field with the generated image URL.

## Progress Tracking

The batch command shows:
- Progress bar during processing
- Summary table with:
  - Total products found
  - Successfully processed
  - Skipped (missing data or --skip-existing)
  - Failed (errors during generation)

## Troubleshooting

### SVG conversion fails
```
Error: SVG conversion failed. Neither ImageMagick nor rsvg-convert is available.
```
**Solution:** Install ImageMagick or librsvg (see Prerequisites)

### Product has no design
```
Product #123: No design SVG found, skipping...
```
**Solution:** Ensure the product has a valid `design_id` linked to the designs table

### Missing primary image
```
Product #123: Missing primary_img_url, skipping...
```
**Solution:** Ensure the product has a `primary_img_url` set

### GD extension not loaded
```
Error: GD extension is not loaded
```
**Solution:** Enable the GD extension in your php.ini

## Database Schema

The commands expect:

**Products table:**
- `id` - Product ID
- `primary_img_url` - T-shirt/product base image URL
- `sneaker_image_url` - (Optional) Sneaker image URL
- `design_id` - Foreign key to designs table
- `mockup_url` - (Generated) Final mockup image URL

**Designs table:**
- `id` - Design ID
- `svg` - SVG content/markup
