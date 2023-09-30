<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MdCustomer extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function group(){
        return $this->hasOne(MdCustomerGroup::class,'id' ,'md_customer_group_id');

    }
    public static function getCustomer($id){
        return  MdCustomer::with("group")->where("id",$id)->first();
    }
}
