<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddLendingrequestFields extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('docdel_requests', function (Blueprint $table) {
            $table->smallInteger('lending_archived')->nullable(true)->default(null);                                    
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('docdel_requests', function (Blueprint $table) {
            $table->dropColumn('lending_archived');            
        });
    }
}
