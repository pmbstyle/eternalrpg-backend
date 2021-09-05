<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWikiPostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('wiki_posts', function (Blueprint $table) {
            $table->id();
            $table->string('name_en');
            $table->string('name_ru');
            $table->string('slug')->unique();
            $table->foreignId('wiki_category_id')->constrained('wiki_categories');
            $table->longText('description_en');
            $table->longText('description_ru');
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
        Schema::dropIfExists('wiki_posts');
    }
}
