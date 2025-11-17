<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->onDelete('cascade');

            // Product reference - nullable, no foreign key constraint since products table may not exist
            $table->unsignedBigInteger('product_id')->nullable();

            // Product details (snapshot at time of order)
            $table->string('product_name');
            $table->text('product_description')->nullable();
            $table->string('product_image')->nullable();
            $table->string('product_sku')->nullable();

            // Variant details
            $table->string('size')->nullable();
            $table->string('color')->nullable();

            // Pricing
            $table->decimal('unit_price', 10, 2);
            $table->integer('quantity');
            $table->decimal('total_price', 10, 2);

            // Custom design info (if applicable)
            $table->text('custom_design_url')->nullable();
            $table->json('customization_data')->nullable();

            $table->timestamps();

            // Indexes
            $table->index('order_id');
            $table->index('product_id');
        });

        // Add foreign key constraint only if products table exists
        if (Schema::hasTable('products')) {
            Schema::table('order_items', function (Blueprint $table) {
                $table->foreign('product_id')->references('id')->on('products')->onDelete('set null');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_items');
    }
};
