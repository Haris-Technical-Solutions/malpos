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
        Schema::create('cd_client_group_customs', function (Blueprint $table) {
            $table->id();
            $table->string("group_name");
            $table->double("discount");
            $table->enum("type",["fixed","percentage"])->default("percentage")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cd_client_group_customs');
    }
};
