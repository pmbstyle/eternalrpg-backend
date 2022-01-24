<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateServerStatusManagersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('server_status_managers', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('server_id');
            $table->foreign('server_id')->references('id')->on('server_managers')->onDelete('cascade');
            $table->integer('players');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('server_status_managers');
    }
}
