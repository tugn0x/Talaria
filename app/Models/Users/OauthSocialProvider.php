<?php

namespace App\Models\Users;

use App\Models\BaseModel;
use App\Models\Reference;
use Illuminate\Database\Eloquent\Model;

class OauthSocialProvider extends Model
{
    protected $fillable=[
        'provider_name',
        'provider_id',
        'user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
