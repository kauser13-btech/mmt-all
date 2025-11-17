<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    // public function up(): void
    // {
    //     Schema::create('products', function (Blueprint $table) {
    //         $table->id();
    //         $table->string('identifier', 32)->unique();
    //         $table->string('title');
    //         $table->string('brand')->default('MMT');
    //         $table->string('sku', 12)->unique();
    //         $table->string('main_image')->nullable();
    //         $table->string('slug')->unique();
    //         $table->text('description')->nullable();
    //         $table->decimal('weight', 10, 2)->nullable();
    //         $table->string('material')->nullable();
    //         $table->string('color')->nullable();
    //         $table->enum('status', ['active', 'inactive', 'draft'])->default('draft');
    //         $table->enum('type', ['tees', 'hoodies']);
    //         $table->timestamps();
    //     });
    // }

    // /**
    //  * Reverse the migrations.
    //  */
    // public function down(): void
    // {
    //     Schema::dropIfExists('products');
    // }
};
