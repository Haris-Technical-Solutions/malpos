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
        Schema::create('md_supply_returns_lines', function (Blueprint $table) {
            $table->id("md_supply_returns_lines_id");
            $table->foreignId('md_supply_id')->on('md_supplies');
            $table->foreignId('md_product_id')->on('md_products');
            $table->foreignId('md_product_units_id')->on('md_product_units');
            $table->double("input_qty");
            $table->double("qty");
            $table->double("cost");
            $table->double("discount_percent")->nullable();
            $table->double("tax")->nullable();
            $table->double("line_amount");
            $table->double("total");
            $table->boolean("is_deleted")->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('md_supply_returns_lines');
    }
};
