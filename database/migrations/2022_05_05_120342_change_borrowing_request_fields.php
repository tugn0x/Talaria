<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeBorrowingRequestFields extends Migration
{
    public function up()
    {
        Schema::table('docdel_requests', function (Blueprint $table) {
            $table->renameColumn('special_delivery','request_special_delivery');            
            $table->renameColumn('pdf_editorial','request_pdf_editorial');            
            
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
            $table->renameColumn('request_special_delivery','special_delivery');            
            $table->renameColumn('request_pdf_editorial','pdf_editorial');            
        });
    }
}
