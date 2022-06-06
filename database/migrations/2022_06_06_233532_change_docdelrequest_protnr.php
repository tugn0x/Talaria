<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeDocdelrequestProtnr extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('docdel_requests', function (Blueprint $table) {
            $table->renameColumn('request_protnr','borrowing_protnr');                    
            $table->renameColumn('fulfill_protnr','lending_protnr');                    
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
            $table->renameColumn('borrowing_protnr','request_protnr');                    
            $table->renameColumn('lending_protnr','fulfill_protnr');                    
        });

    }
}
