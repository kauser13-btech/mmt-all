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
        Schema::table('cart_items', function (Blueprint $table) {
            // Drop the old foreign key and column
            $table->dropForeign(['collection_item_id']);
            $table->dropColumn('collection_item_id');

            // Add the new product_id column
            $table->unsignedInteger('product_id')->after('session_id');
            $table->foreign('product_id')->references('id')->on('product')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('cart_items', function (Blueprint $table) {
            // Drop the new foreign key and column
            $table->dropForeign(['product_id']);
            $table->dropColumn('product_id');

            // Add back the old collection_item_id column
            $table->unsignedBigInteger('collection_item_id')->after('session_id');
            $table->foreign('collection_item_id')->references('id')->on('collection_items')->onDelete('cascade');
        });
    }
};
