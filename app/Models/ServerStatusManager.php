<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\UsesUuid;
use Carbon\Carbon;


class ServerStatusManager extends Model
{
    use UsesUuid;
    use HasFactory;

}
