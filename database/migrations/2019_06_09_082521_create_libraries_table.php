<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLibrariesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('libraries', function (Blueprint $table) {
            $table->bigIncrements('id');            
            $table->timestamps();
            $table->integer('created_by')->unsigned()->nullable();
            $table->integer('updated_by')->unsigned()->nullable();
            $table->softDeletes();
            $table->integer('deleted_by')->unsigned()->nullable();            
            $table->string('name')->nullable(false);
            $table->bigInteger('institution_id')->nullable(false);   
            $table->bigInteger('subject_id')->nullable(false);                           
            $table->string('email')->nullable(false);
            $table->bigInteger('country_id')->nullable(false);   
            $table->string('address')->nullable();
            $table->string('town')->nullable();
            $table->string('district')->nullable();
            $table->string('postcode')->nullable();
            $table->string('state')->nullable();
            $table->string('phone')->nullable();
            $table->string('fax')->nullable();
            $table->string('url')->nullable();
            $table->string('opac')->nullable();
            $table->string('isil_code')->nullable();            
            $table->string('dd_email')->nullable();
            $table->string('ill_email')->nullable();
            $table->string('dd_phone')->nullable();
            $table->string('ill_phone')->nullable();
            $table->string('dd_supply_conditions')->nullable();
            $table->string('dd_imbalance')->nullable();            
            $table->float('dd_cost')->nullable();
            $table->float('dd_user_cost')->nullable();
            $table->date('susp_date_start')->nullable();
            $table->date('susp_date_end')->nullable();
            $table->string('susp_notice_days')->nullable();
            $table->float('ill_cost')->nullable();
            $table->float('ill_user_cost')->nullable();
            $table->smallInteger('status')->nullable();
            $table->smallInteger('nilde')->nullable();
            $table->integer('rank')->nullable();
            $table->dateTime('registration_date')->nullable();
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
        Schema::dropIfExists('libraries');
    }
}
