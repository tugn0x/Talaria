<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddLibrariesFK extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('libraries', function (Blueprint $table) {
            $table->bigInteger('institution_id')->nullable(false)->unsigned()->change();
            $table->bigInteger('subject_id')->unsigned()->change();
            $table->bigInteger('country_id')->unsigned()->change();            
            $table->foreign('institution_id')
                ->references('id')->on('institutions')->change();                                
            $table->foreign('country_id')
            ->references('id')->on('countries')->change();            
            $table->foreign('subject_id')
            ->references('id')->on('subjects')->change();            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('libraries', function (Blueprint $table) {
            $table->dropForeign('libraries_institution_id_foreign');
            $table->dropForeign('libraries_country_id_foreign');
            $table->dropForeign('libraries_subject_id_foreign');
        });
    }
}
