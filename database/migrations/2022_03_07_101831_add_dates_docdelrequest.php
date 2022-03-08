<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddDatesDocdelrequest extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('docdel_requests', function (Blueprint $table) {
            $table->dateTime('archived_date')->after('archived')->nullable(true)->default(null);                        
            $table->dateTime('lending_archived_date')->after('lending_archived')->nullable(true)->default(null);                                    
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
            $table->dropColumn('archived_date');
            $table->dropColumn('lending_archived_date');
        });
    }
}
