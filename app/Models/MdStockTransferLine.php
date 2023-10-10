<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MdStockTransferLine extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function product(){
        return $this->hasOne(MdProduct::class, 'md_product_id',"md_product_id");
    }
    public function unit(){
        return $this->hasOne(MdUom::class, 'md_uom_id',"md_uom_id");
    }
}
