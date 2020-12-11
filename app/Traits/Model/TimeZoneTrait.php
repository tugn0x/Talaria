<?php namespace App\Traits\Model;

use Auth;
use Carbon\Carbon;
use DateTime;

trait TimeZoneTrait
{
    /**
     * The attributes that should be mutated to dates without timezone.
     *
     * @var array
     */
    protected $ignore_tz = [];

    protected function asDateTime($value)
    {
        if (is_string($value) && preg_match('/^(\d{4})-(\d{1,2})-(\d{1,2})$/', $value)) {
            return Carbon::createFromFormat('Y-m-d', $value)->startOfDay();
        }
        // If the value is in ISO8601 format ( "Y-m-d\TH:i:sO" ) we will instantiate the
        // Carbon instances from that format and we will set default timezone
        if(is_string($value) && preg_match('/^'.
                '(\d{4})-(\d{2})-(\d{2})T'. // YYYY-MM-DDT ex: 2014-01-01T
                '(\d{2}):(\d{2}):(\d{2})'.  // HH-MM-SS  ex: 17:00:00
                '(Z|((-|\+)\d{2}:\d{2})|((-|\+)\d{4})|(\.\d{3}Z)|(\.\d{6}\+\d{4}))'.  // Z or +01:00 or -01:00 or +0100 or -0100 or .000Z or .000000+0000
                '$/', $value, $parts) == true){
            return Carbon::parse($value)->timezone(config('app.timezone'));
        }

        if($value instanceof \DateTime) {
            return Carbon::instance($value)->timezone(config('app.timezone'));
        }
        return parent::asDateTime($value);
    }

    /**
     * Get the attributes that should be converted to currencies.
     *
     * @return array
     */
    public function getDatesWithoutTimezone()
    {
        return $this->ignore_tz;
    }

    public function asDateWithoutTimezone($value)
    {
        if(!$value instanceof Carbon) {
            if($value instanceof \DateTime)
                $value = Carbon::instance($value);
            else
            {
                if(is_string($value) && strlen($value)>19)
                {
                    $value = str_replace("T", " ", substr($value, 0, 19));
                }
                $value = Carbon::parse($value);
            }
        }
        return $value;
    }
}
