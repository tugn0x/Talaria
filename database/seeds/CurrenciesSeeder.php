<?php

use Illuminate\Database\Seeder;
use App\Models\Currency;

class CurrenciesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Currency::create(['code'=>'EUR','symbol'=>'€']);
        Currency::create(['code'=>'USD','symbol'=>'$']);
        Currency::create(['code'=>'GBP','symbol'=>'£']);

    }
}
