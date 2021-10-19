<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddFieldsReference extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('references', function (Blueprint $table) {
            $table->string('issn_l',20)->nullable(true)->default(null)->after('issn');                                    
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
            $table->dropColumn('issn_l');            
        });
    }
}
