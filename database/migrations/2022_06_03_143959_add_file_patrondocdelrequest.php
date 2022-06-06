<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddFilePatrondocdelrequest extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('patron_docdel_requests', function (Blueprint $table) {
            $table->string('filename')->nullable(); 
            $table->string('filehash',20)->nullable(true)->default(null)->after('filename');   
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
            $table->dropColumn('filehash');   
            $table->dropColumn('filename');   
        });
    }
}
