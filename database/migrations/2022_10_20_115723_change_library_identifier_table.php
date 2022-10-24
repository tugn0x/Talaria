<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeLibraryIdentifierTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::rename('library_identifier','identifier_library');
        Schema::table('identifier_library', function (Blueprint $table) {
            $table->bigIncrements('id');            
            $table->timestamps();
        });        
        
        Schema::table('identifiers', function (Blueprint $table) {
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
        Schema::rename('identifier_library','library_identifier');
    }
}
