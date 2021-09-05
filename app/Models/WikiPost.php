<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WikiPost extends Model
{
    use HasFactory;

    public function wikicategory(){
        return $this->belongsTo('App\Models\WikiCategory');
    }
}
