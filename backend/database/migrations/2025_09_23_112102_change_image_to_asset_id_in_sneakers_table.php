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
        // Check if the column exists before renaming
        if (Schema::hasColumn('sneakers', 'image')) {
            Schema::table('sneakers', function (Blueprint $table) {
                $table->renameColumn('image', 'asset_id');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Check if the column exists before renaming back
        if (Schema::hasColumn('sneakers', 'asset_id')) {
            Schema::table('sneakers', function (Blueprint $table) {
                $table->renameColumn('asset_id', 'image');
            });
        }
    }
};
