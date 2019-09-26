<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateConsortiaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('consortia', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->timestamps();
        });
        Schema::create('entity_consortium', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('consortium');
            $table->morphs('entity'); // QUESTO è un morph to, in modo da permettere l'inserimento di ENTI e BIBLIOTECHE NEI PROGETTI / CONSORZI
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
        Schema::dropIfExists('consortia');
        Schema::dropIfExists('institution_consortium');
    }
}
