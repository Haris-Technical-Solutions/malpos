<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use App\Models\MdStock;

class MdStockController extends Controller
{
    public function index(){
        $data = MdStock::groupBy("cd_client_id")
        ->groupBy("cd_brand_id")
        ->groupBy("cd_branch_id")
        ->groupBy("md_product_id")
        ->groupBy("md_storage_id")

        // ->groupBy("md_supply_id")
        // ->groupBy("stock_type")
        // ->groupBy("type")
        // ->groupBy("category")
        // ->groupBy("unit")
        // ->groupBy("qty")
        // ->groupBy("cost")

        // ->groupBy("id")
        ->selectRaw("sum(cost) as total_cost,md_product_id,cd_brand_id,cd_branch_id,cd_client_id,md_storage_id")
        ->with([
            "storage:id,name,is_active",
            "product:md_product_id,product_name"
        ])
        ->simplePaginate(10);
        // ->get();
        return response()->json($data, 200);
    }
    
    public function product_stock($product_id,$storage_id){
        dd(auth()->user());
        $data = MdStock::groupBy("cd_client_id")
        ->where("md_product_id",$product_id)

        // ->where("cd_brand_id",$id)
        // ->where("cd_branch_id",$id)
        // ->where("md_product_id",$id)
        ->where("md_storage_id",$storage_id)

        ->groupBy("cd_brand_id")
        ->groupBy("cd_branch_id")
        ->groupBy("md_product_id")
        ->groupBy("md_storage_id")
        ->selectRaw("sum(cost) as total_cost,md_product_id,cd_brand_id,cd_branch_id,cd_client_id,md_storage_id")
        ->with([
            "storage:id,name,is_active",
            "product:md_product_id,product_name"
        ])
        ->first();
        return response()->json($data, 200);
    }
}
