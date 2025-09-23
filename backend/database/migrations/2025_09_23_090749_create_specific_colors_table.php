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
        Schema::create('specific_colors', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('sneaker_id');
            $table->string('color_name', 125);
            $table->string('color_code', 125);
            $table->text('color_sequence');
            $table->timestamps();

            $table->index('sneaker_id');
            $table->index('color_name');

            $table->foreign('sneaker_id')->references('id')->on('sneakers')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('specific_colors');
    }
};
