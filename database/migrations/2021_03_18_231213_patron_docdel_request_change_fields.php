<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class PatronDocdelRequestChangeFields extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('patron_docdel_requests', function (Blueprint $table) {
            $table->smallInteger('delivery_format')->nullable();      
            $table->dateTime('notfulfill_date')->nullable(); 
            $table->smallInteger('notfulfill_type')->nullable(); 
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('patron_docdel_requests', function (Blueprint $table) {
            $table->dropColumn('delivery_format');  
            $table->dropColumn('notfulfill_date');  
            $table->dropColumn('notfulfill_type'); 
        });
        
    }
}
