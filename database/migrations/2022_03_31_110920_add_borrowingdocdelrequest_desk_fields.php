<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddBorrowingdocdelrequestDeskFields extends Migration
{
     /*
        desk_delivery_format
        desk_received_date
        
        */
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('docdel_requests', function (Blueprint $table) {
            $table->smallInteger('desk_delivery_format')->after('user_delivery_date')->nullable(true)->default(null);
            $table->dateTime('desk_delivery_date')->after('user_delivery_date')->nullable(true)->default(null);                                    
            $table->dateTime('desk_received_date')->after('user_delivery_date')->nullable(true)->default(null);                                    

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
            $table->dropColumn('desk_delivery_format');            
            $table->dropColumn('desk_delivery_date'); 
            $table->dropColumn('desk_received_date');            
        });
    }
       
}
