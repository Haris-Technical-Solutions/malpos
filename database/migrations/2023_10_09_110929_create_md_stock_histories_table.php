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
        Schema::create('md_stock_histories', function (Blueprint $table) {
            $table->id("md_stock_histories_id");
            $table->foreignId('cd_client_id')->on('cd_clients');
            $table->foreignId('cd_brand_id')->on('cd_brands')->nullable();
            $table->foreignId('cd_branch_id')->on('cd_branchs')->nullable();

            $table->enum("type",["supplies","supplies_return","sales","sales_return","stock_transfer","order","order_return"]);
            $table->bigInteger('type_id');
            $table->enum("action",["create","update","delete","recycle"]);

            $table->foreignId('md_product_id')->on('md_products');
            $table->foreignId('md_uom_id')->on('md_uoms');
            // $table->foreignId('md_product_units_id')->on('md_product_units');
            $table->foreignId('md_storage_id')->on('md_storages');
            $table->double("input_qty");
            $table->double("qty");

            $table->string('created_by');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('md_stock_histories');
    }
};
