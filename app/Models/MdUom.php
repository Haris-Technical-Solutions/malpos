<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MdUom extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function conversions(){
        return $this->hasMany(MdUomsConversion::class,'uom_to' ,'md_uom_id');
    }
    public function conversion(){
        return $this->belongsTo(MdUomsConversion::class ,'md_uom_id','uom_to');
    }
    
}
