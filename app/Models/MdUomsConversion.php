<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MdUomsConversion extends Model
{
    use HasFactory;
    protected $guarded = [];
    
    public function uom_from_details(){
        return $this->belongsTo(MdUom::class, 'uom_from',"md_uom_id")->where("is_deleted",0);
    }
    public function uom_to_details(){
        return $this->belongsTo(MdUom::class, 'uom_to',"md_uom_id")->where("is_deleted",0);
    }
    public function product(){
        return $this->hasOne(MdProduct::class, "md_product_id" , 'md_product_id');
    }
    public static function get_conversion($id,$check_deleted = false){
        return MdUomsConversion::where("md_uom_conversion_id",$id)
        ->with(["uom_from_details","uom_to_details","product"])
        ->when($check_deleted,function($query){
            $query->where("is_deleted",0);
        })
        ->first();
    }
    public static function qty_conversion($lines,$cd_client_id){
        $rows = [];
        foreach($lines as $key=>$line){
            $product = MdProduct::with([
                "base_unit",
                "unit_conversions.uom_to_details",
            ])
            ->where("cd_client_id",$cd_client_id)
            ->find($line["md_product_id"]);
            $base_unit = $product->base_unit;

            if(!$base_unit){
                print(json_encode(["error"=>"no base unit found for this product!","product"=>$key+1]));
                exit;
            }

            $unit = MdUom::where("md_uom_id",$line["md_uom_id"])
            ->where("cd_client_id",$cd_client_id)
            ->with(["conversion"])
            ->where("is_deleted",0)->first();
            if(!$unit)
            {
                print(json_encode(["error"=>"no selected unit found for this product!","product"=>$key+1]));
                exit;
            }
            // dd($unit->conversion["multiply_rate"]);

            if($unit->category == "conversion"){
                $line["input_qty"] = $line["qty"];
                $line["qty"] = $line["qty"]*$unit->conversion["multiply_rate"];
            }else{
                $line["input_qty"] = $line["qty"];
            }
            $line["product_base_unit_id"] = $base_unit->md_uom_id;
            array_push($rows,$line);
            
        }
        return $rows;
    }
}
