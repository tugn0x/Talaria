<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateReferencesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('references', function (Blueprint $table) {
            $table->string('first_author',100)->nullable(true)->change();
            $table->string('last_author',100)->nullable(true)->change();
            $table->smallInteger('pubyear')->nullable(true)->change();
            $table->string('volume',15)->nullable(true)->change();
            $table->string('issue',15)->nullable(true)->change();
            $table->string('page_start',15)->nullable(true)->change();
            $table->string('page_end',15)->nullable(true)->change();
            $table->text('abstract')->nullable(true)->change();
            $table->string('doi')->nullable(true)->change();
            $table->string('issn',20)->nullable(true)->change();
            $table->string('publisher')->nullable(true)->change();
            $table->string('publishing_place')->nullable(true)->change();
            $table->string('isbn',20)->nullable(true)->change();
            $table->string('sid',20)->nullable(true)->change();
            $table->string('pmid',20)->nullable(true)->change();
            $table->text('note')->nullable(true)->change();
           
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('references', function (Blueprint $table) {
            $table->string('first_author',100)->nullable(false)->change();
            $table->string('last_author',100)->nullable(false)->change();
            $table->smallInteger('pubyear')->nullable(false)->change();
            $table->string('volume',15)->nullable(false)->change();
            $table->string('issue',15)->nullable(false)->change();
            $table->string('page_start',15)->nullable(false)->change();
            $table->string('page_end',15)->nullable(false)->change();
            $table->text('abstract')->nullable(false)->change();
            $table->string('doi')->nullable(false)->change();
            $table->string('issn',20)->nullable(false)->change();
            $table->string('publisher')->nullable(false)->change();
            $table->string('publishing_place')->nullable(false)->change();
            $table->string('isbn',20)->nullable(false)->change();
            $table->string('sid',20)->nullable(false)->change();
            $table->string('pmid',20)->nullable(false)->change();
            $table->text('note')->nullable(false)->change();
           
        });
    }
}
