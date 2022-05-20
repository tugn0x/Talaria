<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDocdelRequestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('docdel_requests', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->timestamps();
            $table->integer('created_by')->unsigned()->nullable();
            $table->integer('updated_by')->unsigned()->nullable();
            $table->softDeletes();
            $table->integer('deleted_by')->unsigned()->nullable();
            $table->bigInteger('docdel_request_parent_id')->nullable();
            $table->bigInteger('reference_id')->nullable(false);
            $table->bigInteger('patron_docdel_request_id')->nullable();
            $table->bigInteger('borrowing_library_id')->nullable(false);
            $table->bigInteger('lending_library_id')->nullable();
            $table->smallInteger('request_type')->nullable(false); //0=DD 1: ILL
            $table->dateTime('request_date')->nullable(); //dd_datarichie
            $table->string('request_protnr')->nullable(); //dd_nprotrichie
            $table->text('request_note')->nullable(); //dd_note_richforni
            $table->text('on_cost')->nullable(); //dd_costofn
            $table->smallInteger('accept_user_status')->nullable(); //Stato accettazione utente dopo richiesta: 1=Biblio richiede accettazione, 2=Ute accetta, 3=Ute non accetta 
            $table->dateTime('fullfill_date')->nullable(); //dd_dataeva
            $table->string('fullfill_protnr')->nullable(); //dd_nproteva
            $table->string('fullfill_location')->nullable(); //dd_collocazione (ricavata da ACNP)
            $table->text('fullfill_note')->nullable(); //dd_note_richforni
            $table->smallInteger('process_status')->nullable(); //dd_stato_borr
            $table->smallInteger('request_status')->nullable(); //dd_stato_dd_ill
            $table->string('filename')->nullable(); 
            $table->smallInteger('file_status')->nullable(); //Stato del file se inviato in NILDE: 0-non disponibile; 1-disponibile; 2-disponibile con HC 
            $table->smallInteger('file_download')->nullable(); // 	Indicatore di avvenuta stampa del file se inviato in NILDE: 0-Non Stampato; 1-Stampato             
            $table->dateTime('cancelrequest_date')->nullable(); //dd_richiesta_annullamento
            $table->string('fullfill_inventorynr')->nullable(); //dd_ninventario_forni
            $table->text('note')->nullable(); //dd_note_interne
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('docdel_requests');
    }
}
