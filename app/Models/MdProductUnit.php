<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MdProductUnit extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function conversion(){
        return $this->hasOne(MdUomsConversion::class, 'md_uoms_conversions_id','md_uom_conversion_id');
    }
    public function unit(){
        return $this->hasOne(MdUom::class, 'md_uoms_id',"md_uom_id");
    }
}
