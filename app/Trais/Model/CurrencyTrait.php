<?php namespace App\Traits\Model;

trait CurrencyTrait
{
    /**
     * The attributes that should be mutated to currencies.
     *
     * @var array
     */
    protected $currencies = [];


    /**
     * Get the attributes that should be converted to currencies.
     *
     * @return array
     */
    public function getCurrencies()
    {
        return $this->currencies;
    }

    protected function asCurrency($value)
    {
        /*
         * TODO: to fix better.
         * WHY (ctype_digit($value)) ???
         * Because PHP 5 doesnt directly casts integer FROM database
         * AND php 7 doesnt match ctype_digit on INTEGER..
         */
        if(is_int($value) || ctype_digit($value)){
            $value = $value/$this->getPrecision();
        }
        return (float) $this->formatCurrency($value);
    }

    protected function fromCurrency($value)
    {
        if(!is_int($value) && !ctype_digit($value))
            $value = $this->formatCurrency($value);
        return $value*$this->getPrecision();
    }

    protected function formatCurrency($value){
        if(!is_numeric($value))
            $value = str_replace(',','',$value);
        return (float) number_format($value, config('apiclu.currency_precision'), '.', '');
    }

    protected function getPrecision()
    {
//        return pow(10,config('apiclu.currency_precision'));
        return pow(10,config('app.currency_precision'));
    }
}
