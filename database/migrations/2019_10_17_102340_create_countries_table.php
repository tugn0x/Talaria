<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCountriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('countries', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->timestamps();
            $table->char('code',2);
            $table->string('name');            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('countries');
        Schema::table('institutions', function (Blueprint $table) {
            $table->dropColumn('country_id');
        });
        Schema::table('libraries', function (Blueprint $table) {
            $table->dropColumn('country_id');
        });

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('country_id');
        });
    }
}
