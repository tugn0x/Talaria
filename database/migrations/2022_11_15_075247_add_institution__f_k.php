<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddInstitutionFK extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('institutions', function (Blueprint $table) {
            $table->bigInteger('institution_type_id')->unsigned()->change();
            $table->bigInteger('country_id')->unsigned()->change();            
            $table->foreign('institution_type_id')
                ->references('id')->on('institution_types')->change();                                
            $table->foreign('country_id')
            ->references('id')->on('countries')->change();            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('institutions', function (Blueprint $table) {
            $table->dropForeign('institutions_institution_type_id_foreign');
            $table->dropForeign('institutions_country_id_foreign');
        });
    }
}
