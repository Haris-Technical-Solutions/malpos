<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MdSupply extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function supply_lines(){
        return $this->hasMany(MdSupplyLine::class, 'md_supply_id');
    }
}
