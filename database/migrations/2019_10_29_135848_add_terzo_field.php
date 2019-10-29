<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddTerzoField extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('libraries', function (Blueprint $table) {
            $table->string('terzo_code',20)->nullable(true);
        });
        Schema::table('institutions', function (Blueprint $table) {
            $table->string('terzo_code',20)->nullable(true);
        });

        Schema::table('projects', function (Blueprint $table) {
            $table->string('terzo_code',20)->nullable(true);
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
            $table->dropColumn('terzo_code');
        });

        Schema::table('institutions', function (Blueprint $table) {
            $table->dropColumn('terzo_code');
        });

        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn('terzo_code');
        });
    }
}
