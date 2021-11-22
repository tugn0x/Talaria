<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddBorrowingrequestFields extends Migration
{
   /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('docdel_requests', function (Blueprint $table) {
            $table->dateTime('ready_date')->after('fulfill_date')->nullable(true)->default(null);                                    
            $table->dateTime('forward_date')->after('fulfill_date')->nullable(true)->default(null);                                    
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
            $table->dropColumn('ready_date');            
            $table->dropColumn('forward_date');   
        });
    }
}
