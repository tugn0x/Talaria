<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateInstitutionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('institutions', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->timestamps();                        
            $table->integer('created_by')->unsigned()->nullable();
            $table->integer('updated_by')->unsigned()->nullable();
            $table->softDeletes();
            $table->integer('deleted_by')->unsigned()->nullable();
            $table->string('name');
            $table->bigInteger('institution_type_id')->nullable(false);            
            $table->bigInteger('country_id')->nullable(false);               
            $table->string('vatnumber',50)->nullable();
            $table->string('fiscalcode',50)->nullable();
            $table->text('invoice_note')->nullable();
            $table->string('email_pec')->nullable();
            $table->string('ccu',10)->nullable();
            $table->string('administrative')->nullable();
            $table->string('administrative_email')->nullable();
            $table->string('administrative_phone')->nullable();                    
        });        
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('institutions');
        Schema::table('libraries', function (Blueprint $table) {
            $table->dropColumn('institution_id');
        });
    }
}
