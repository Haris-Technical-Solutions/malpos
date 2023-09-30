<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MdStockTransfer extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function stock_transfer_lines(){
        return $this->hasMany(MdStockTransferLine::class, 'md_stock_transfer_id',"id");
    }
    public static function getTransfer($id){
        return MdStockTransfer::where("id",$id)
        ->with(["stock_transfer_lines"])
        ->first();
    }
    
}
