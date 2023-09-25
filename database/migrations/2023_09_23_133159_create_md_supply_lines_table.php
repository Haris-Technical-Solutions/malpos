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
        Schema::create('md_supply_lines', function (Blueprint $table) {
            $table->id();
            $table->foreignId('md_supply_id')->on('md_supplies');
            $table->foreignId('md_product_id')->on('md_products');
            $table->double("qty");
            $table->string("unit")->nullable();
            $table->double("cost");
            $table->double("discount_percent")->nullable();
            $table->double("tax_percent")->nullable();
            $table->double("total");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('md_supply_lines');
    }
};
