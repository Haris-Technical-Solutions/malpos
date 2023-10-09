<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MdProductUnit extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function conversion(){
        return $this->hasOne(MdUomsConversion::class,"md_uoms_conversions_id" , 'md_uom_conversion_id');
    }
    public function product(){
        return $this->hasOne(MdProduct::class, "md_product_id" , 'md_product_id');
    }
    public function unit(){
        return $this->hasOne(MdUom::class, 'md_uoms_id',"md_uom_id");
    }
    public static function unit_conversion($id){
        return MdProductUnit::where("type","conversion")
        ->where("cd_client_id", request()->cd_client_id)
        // ->where("cd_brand_id", request()->cd_brand_id)
        // // apply ->when on branch
        // ->where("cd_branch_id", request()->cd_branch_id)
        
        ->where("md_product_units_id",$id)
        ->with("conversion:md_uoms_conversions_id,uom_to_name,multiply_rate,divide_rate")
        ->whereHas("conversion" , function($query){
            $query->where("is_active",1);
        })
        ->first();
    }
    public static function base_unit($product_id){
        return MdProductUnit::where("md_product_id",$product_id)
        ->with("unit")
        ->where("cd_client_id", request()->cd_client_id)
        // ->where("cd_brand_id", request()->cd_brand_id)
        // // apply ->when on branch
        // ->where("cd_branch_id", request()->cd_branch_id)

        ->where("type","unit")
        ->where("is_deleted",0)->first();
    }
    public static function get_unit($id,$product_id,$client_id){
        return MdProductUnit::
        where("md_product_id",$product_id)->
        where("cd_client_id",$client_id)
        ->where("is_deleted",0)
        ->where("md_product_units_id",$id)
        ->with(["conversion:md_uoms_conversions_id,uom_to_name,multiply_rate,divide_rate","unit"])
        ->first();
    }
    public static function qty_conversion($lines,$cd_client_id){
        $rows = [];
        foreach($lines as $key=>$line){
            $base_unit = MdProductUnit::where("md_product_id",$line["md_product_id"])
            ->where("is_deleted",0)
            ->where('type',"unit")->first();
            if(!$base_unit)
            {
                print(json_encode(["error"=>"no base unit found for this product!","product"=>$key+1]));
                exit;
            }

            $unit = MdProductUnit::get_unit($line["md_product_units_id"],$line["md_product_id"],$cd_client_id);
            if(!$unit)
            {
                print(json_encode(["error"=>"no selected unit found for this product!","product"=>$key+1]));
                exit;
            }
            if($unit->type == "conversion"){
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
