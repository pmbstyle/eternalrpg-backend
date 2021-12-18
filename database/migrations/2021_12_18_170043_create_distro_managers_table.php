<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDistroManagersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('distro_managers', function (Blueprint $table) {
            $table->id();
            $table->string('client_version');
            $table->string('client_folder');
            $table->string('java_version');
            $table->string('java_folder_win');
            $table->string('java_folder_mac');
            $table->string('java_folder_lin');
            $table->enum('delivery', ["cdn","web","local"]);
            $table->enum('status', ["test","live"]);
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
        Schema::dropIfExists('distro_managers');
    }
}
