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
        Schema::create('md_stocks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cd_client_id')->on('cd_clients');
            $table->foreignId('cd_brand_id')->on('cd_brands');
            $table->foreignId('cd_branch_id')->on('cd_branchs');
            $table->foreignId('md_supply_id')->on('md_supplies')->nullable();
            //cost issue and stock transfer id table update
            $table->foreignId('md_stock_transfer_id')->on('md_stock_transfers')->nullable();
            $table->foreignId('md_product_id')->on('md_products');
            $table->foreignId('md_storage_id')->on('md_storages');
            $table->string("stock_type");
            $table->string("type")->nullable();
            $table->string("category")->nullable();
            $table->string("unit")->nullable();
            $table->double("qty");
            $table->double("cost");
            $table->boolean("is_deleted")->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('md_stocks');
    }
};
