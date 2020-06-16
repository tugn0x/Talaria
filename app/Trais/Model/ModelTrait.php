<?php namespace App\Traits\Model;

use Auth;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use DateTime;
use Illuminate\Database\Eloquent\SoftDeletes;
use Wildside\Userstamps\Userstamps;


trait ModelTrait
{
    use SoftDeletes,
        Userstamps,
        OwnerTrait,
        TimeZoneTrait;

    protected $forceDeleting = false;
    protected $userstamping = true;
    protected static $observerClass = null;

    protected static $stringIdentifies = 'name';

    protected $internalMessagesAttributes = ['internal_messages_error', 'internal_messages_info'];

    protected $tmp = array();

    /*
     * The attributes that should override default attach, detach, sync.
     *
     * @var array
     */
    protected $custom_relationship_methods = [];


    public static function bootModelTrait()
    {
        if(!is_null(static::$observerClass)) {
            self::observe(new static::$observerClass);
        }
    }

    /*
     * Helpers
     */

    public function getTmp()
    {
        return $this->tmp;
    }

    public function getTmpAttributes()
    {
        $attributes = [];
        foreach($this->getTmp() as $attribute_name)
        {
            $attributes[$attribute_name] = $this->$attribute_name;
        }
        return $attributes;
    }

    public function getFillableAndTmp()
    {
        return array_merge($this->getFillable(), $this->getTmp());
    }

    public function getAttributesAndTmp()
    {
        return array_merge($this->getAttributes(), $this->getTmpAttributes());
    }

    /*
     * UTILS
     */
    public function mb_ucfirst($string, $encoding='UTF-8')
    {
        $strlen = mb_strlen($string, $encoding);
        $firstChar = mb_substr($string, 0, 1, $encoding);
        $then = mb_substr($string, 1, $strlen - 1, $encoding);
        return mb_strtoupper($firstChar, $encoding) . $then;
    }

    //truncate a string only at a whitespace (by nogdog)
    public function truncate_text($text, $length) {
        $length = abs((int)$length);
        if(strlen($text) > $length) {
            $text = preg_replace("/^(.{1,$length})(\s.*|$)/s", '\\1...', $text);
        }
        return($text);
    }


    /**
     * @param array of object on array$mixed
     * @return array
     */
    public function filterIds($mixed)
    {
        if($mixed InstanceOf \Illuminate\Database\Eloquent\Collection)
            return $mixed->modelKeys();

        return array_unique(
            array_merge(
                array_pluck(array_filter($mixed, 'is_array'), 'id'),
                array_pluck(array_filter($mixed, 'is_object'), 'id'),
                array_filter($mixed, 'ctype_digit'),
                array_filter($mixed, 'is_numeric')
            )
        );
    }

    /**
     * This scope Provide to add an internal message that will pass to response
     *
     * @param $query
     * @param string $text
     * @param string $type
     * @return mixed
     */
    public function scopeAddInternalMessage($query, $text, $type)
    {
        $type = ($type) ? $type : 'info';
        $text = (is_array($text)) ? $text : [$text];
        $messages = array_merge($this->getAttribute('internal_messages_'.$type) ?: [], $text);
        $this->setAttribute('internal_messages_'.$type, $messages);
        return $query;
    }

    /*
     * relationships
     */


    /**
     * Manage Relationships with user_id column
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function owner()
    {
//        return $this->belongsTo('App\Models\User\User', 'user_id');
        return $this->belongsTo('App\Models\Users\User', 'created_by');
    }


    public function hasInternalMessages()
    {
        $messages = $this->getInternalMessages();
        if(empty($messages))
            return false;

        return true;
    }

    public function hasInternalErrors()
    {
        $messages = $this->getInternalMessages('error');
        if(empty($messages))
            return false;

        return true;
    }

    public function getInternalErrors()
    {
        $errors = $this->getInternalMessages('error');
        if(isset($errors[0]))
            return $errors[0]['message'];
    }

    public function getInternalMessages($type = null)
    {
        $messages = [];
        $attributes = ($type) ? ['internal_messages_'.$type] : $this->internalMessagesAttributes;
        foreach($attributes as $attribute)
        {
            $message = $this->getAttribute($attribute);
            if(!empty($message))
                $messages[] = ['type' => str_replace('internal_messages_', '', $attribute), 'message' => $message];
        }
        return $messages;
    }

    /**
     * Set a given attribute on the model.
     *
     * @param  string  $key
     * @param  mixed  $value
     * @return $this
     */
    public function setAttribute($key, $value)
    {
//        if (method_exists('getCurrencies', self::class) && $value && (in_array($key, $this->getCurrencies()))) {
//            $value = $this->fromCurrency($value);
//            $this->attributes[$key] = $value;
//        }
//        if ($value && (in_array($key, $this->getDatesWithoutTimezone()))) {
//            $value = $this->fromDateTime($this->asDateWithoutTimezone($value));
//            $this->attributes[$key] = $value;
//        }
        return parent::setAttribute($key, $value);
    }

    /**
     * Get a plain attribute (not a relationship).
     *
     * @param  string  $key
     * @return mixed
     */
    public function getAttributeValue($key)
    {
//        $value = $this->getAttributeFromArray($key);
//        if (in_array($key, $this->getCurrencies())) {
//            if (! is_null($value)) {
//                return $this->asCurrency($value);
//            }
//        }
//        if (in_array($key, $this->getDatesWithoutTimezone())) {
//            if (! is_null($value)) {
//                return $this->asDateWithoutTimezone($value);
//            }
//        }
        return parent::getAttributeValue($key);
    }

    public function getCustomRelationshipMethods()
    {
        if(property_exists($this, 'custom_relationship_methods'))
            return $this->custom_relationship_methods;
        return null;
    }

    public function checkForCastAndCompare($field)
    {
        $original = $this->hasCast($field) ? $this->castAttribute($field, $this->getOriginal($field)) : $this->getOriginal($field);
        return $original === $this->$field;
    }

    protected static function getName($id) {
        return \DB::table(self::$table)->select(self::$stringIdentifies)->where('id', $id)->first();
    }

    public function scopeSimpleSearch($query, $q)
    {
        $q = trim($q);

        return $query->where('name', 'like', '%'. $q .'%');
    }
}
