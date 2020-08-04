<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class PatronDocdelRequestChangeStatusField extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('patron_docdel_requests', function (Blueprint $table) {
            $table->string('status',20)->change();
            $table->index('status');
        });

        //Aggiorno il DB migrando i dati esistenti
        App\Models\Requests\PatronDocdelRequest::where('status', '20')
          ->update(['status' => 'requested']);
        App\Models\Requests\PatronDocdelRequest::where('status', '31')
          ->update(['status' => 'userAskCancel']);  
        App\Models\Requests\PatronDocdelRequest::where('status', '32')
          ->update(['status' => 'canceled']);
        App\Models\Requests\PatronDocdelRequest::where('status', '21')
          ->update(['status' => 'waitingForCost']);
        App\Models\Requests\PatronDocdelRequest::where('status', '22')
          ->update(['status' => 'costAccepted']);
        App\Models\Requests\PatronDocdelRequest::where('status', '23')
          ->update(['status' => 'costNotAccepted']);                  
        App\Models\Requests\PatronDocdelRequest::where('status', '39')
          ->update(['status' => 'readyToDelivery']);
        App\Models\Requests\PatronDocdelRequest::where('status', '40')
          ->update(['status' => 'received']);
        App\Models\Requests\PatronDocdelRequest::where('status', '41')
          ->update(['status' => 'fileReceived']);
        App\Models\Requests\PatronDocdelRequest::where('status', '50')
          ->update(['status' => 'notReceived']);    
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('patron_docdel_requests', function (Blueprint $table) {
            $table->smallInteger('status')->change();
            $table->dropIndex('patron_docdel_requests_status_index');
        });
    }
}
