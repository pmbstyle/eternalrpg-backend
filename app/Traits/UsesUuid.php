<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Model;
use Str;

trait UsesUuid
{
    protected static function bootUsesUuid()
    {
        static::creating(function (Model $model) {
            if (!$model->getKey()) {
                $model->{$model->getKeyName()} = Str::orderedUuid()->toString();
            }
        });
    }

    public function getIncrementing()
    {
        return false;
    }

    public function getKeyType()
    {
        return 'string';
    }
}