<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MdStockTransferLine extends Model
{
    use HasFactory;
    protected $guarded = [];
    
    public function unit(){
        return $this->hasOne(MdUom::class, 'md_uom_id',"md_uom_id");
    }
}
