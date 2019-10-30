<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSubscriptionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('subscriptions', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->timestamps();
            $table->integer('created_by')->unsigned()->nullable();
            $table->integer('updated_by')->unsigned()->nullable();
            $table->softDeletes();
            $table->integer('deleted_by')->unsigned()->nullable();
            $table->bigInteger('project_id')->nullable();
            $table->bigInteger('institution_id')->nullable();
            $table->bigInteger('library_id')->nullable();        
            $table->boolean('invoice')->nullable()->default(false);
            $table->boolean('payment')->nullable()->default(false);            
            $table->float('price')->nullable()->default(0);
            $table->dateTime('contract_date')->nullable();
            $table->dateTime('invoice_date')->nullable();
            $table->dateTime('payment_date')->nullable();               
            $table->text('invoice_header')->nullable();        
            $table->smallInteger('contract_year')->nullable();
            $table->tinyInteger('contract_type')->nullable();
            $table->string('contract_name')->nullable();        
            $table->boolean('isnew')->nullable()->default(false);        
            $table->text('new_dd_supply_conditions')->nullable();
            $table->string('new_dd_imbalance')->nullable();            
            $table->float('new_dd_cost')->nullable();
            $table->float('new_dd_user_cost')->nullable();
            $table->string('invoice_nr')->nullable();     
            $table->text('invoice_note')->nullable();
            $table->string('order_nr')->nullable();     
            $table->dateTime('order_date')->nullable();                
            $table->string('cig_nr')->nullable();    
            $table->boolean('invoice_paper')->nullable()->default(false);                 
            $table->boolean('invoice_electronic')->nullable()->default(false);                                  
            $table->boolean('split_payment')->nullable()->default(false);                                  
        });

        
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('subscriptions');
    }
}
