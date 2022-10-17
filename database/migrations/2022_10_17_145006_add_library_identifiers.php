<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddLibraryIdentifiers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('identifiers', function (Blueprint $table) {
            $table->bigIncrements('id');            
            $table->string('name',10)->nullable(false);            
        });

        Schema::create('library_identifiers', function (Blueprint $table) {
            $table->bigInteger('library_id');
            $table->bigInteger('identifier_id');          
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('identifiers');
        Schema::dropIfExists('library_identifiers');
    }
}
