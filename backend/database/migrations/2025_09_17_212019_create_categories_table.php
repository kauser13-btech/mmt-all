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
        // Schema::create('categories', function (Blueprint $table) {
        //     $table->id();
        //     $table->integer('parent_id');
        //     $table->tinyInteger('type');
        //     $table->string('title', 125);
        //     $table->string('slug', 125)->unique()->nullable();
        //     $table->text('description');
        //     $table->unsignedInteger('asset_id')->nullable();
        //     $table->tinyInteger('status')->default(1);
        //     $table->timestamps();

        //     $table->index('title');
        //     $table->index('parent_id');
        //     $table->index('asset_id');
        // });
    }

    /**
     * Reverse the migrations.
     */
    // public function down(): void
    // {
    //     Schema::dropIfExists('categories');
    // }
};
