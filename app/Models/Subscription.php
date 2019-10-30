<?php

namespace App\Models;

class Subscription extends BaseModel
{
    protected $fillable = [
        
        'project_id',
        'institution_id',
        'library_id',
        //'bi_en'
        'invoice',
        'payment',
        'price',
        'contract_date',
        'invoice_date',        
        'payment_date',        
        'invoice_header', //st_intestazione_fattura=li prendo dl profilo di biblio/ente/progetto all'atto della sottoscrizione
        //'st_data_opzione_fattura',
        'contract_year',
        'contract_type', //0=pvt,1=singola, 2=aderente,3=ente,4=prog
        'contract_name',
        'isnew',
        'new_dd_supply_conditions', //bi_condforni
        'new_dd_imbalance', //bi_scompenso
        'new_dd_cost',//bi_costo_dd
        'new_dd_user_cost',//bi_costo_ute                            
        'invoice_nr',
        'invoice_note',
        //st_fatt_referente    
        //st_fatt_referente_mail 
        //st_fatt_referente_tel
        
        'order_nr',
        'order_date',
        'cig_nr',
        'invoice_paper',
        'invoice_electronic',        
        //st_fatt_cuu
        'split_payment',
    ];
}
