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
    public function supplier(){
        return $this->hasOne(MdSupplier::class, 'id',"md_supplier_id");
    }
    public function storage(){
        return $this->hasOne(MdStorage::class, 'id',"md_storage_id");
    }


    static function getSupply($id){
        return MdSupply::where('id',$id)
        ->with([
            "supplier:id,supplier_name",
            "storage:id,name,is_active",
            // "supply_lines",
            "supply_lines.product:md_product_id,product_name"
        ])
        ->first();
    }
}
