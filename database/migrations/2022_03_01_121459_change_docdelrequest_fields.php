<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeDocdelrequestFields extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('docdel_requests', function (Blueprint $table) {
            $table->renameColumn('file_download','download');            
            $table->dateTime('download_date')->nullable(true)->default(null);                                    
            $table->string('url',10000)->nullable(true)->default(null)->after('filename');                                    
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
            $table->renameColumn('download','file_download');            
            $table->dropColumn('url');
            $table->dropColumn('download_date');
        });
    }
}
