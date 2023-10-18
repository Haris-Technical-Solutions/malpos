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
        Schema::create('md_product_details', function (Blueprint $table) {
            $table->id('md_product_detail_id');
            $table->foreignId('md_product_id')->on('md_products');
            $table->enum("detail_type",[
                "ingredient",
                "preparation",
            ])->default("dish");
            $table->bigInteger('md_detail_id');
            $table->foreignId('md_uom_id')->on('md_uoms');
            // $table->string('product_type')->nullable();
            $table->double('qty');
            $table->double('cost')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('md_product_details');
    }
};
