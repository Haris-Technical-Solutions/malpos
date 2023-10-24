<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use App\Models\MdStock;

class MdStockController extends Controller
{
    public function index(){
        $data = MdStock::
        with([
            "storage:id,name,is_active",
            "product:md_product_id,product_name,type",
            "base_unit",
        ])->paginate(10);
        return response()->json($data, 200);
    }

    public function product_stock($product_id,$storage_id){
        // dd(auth()->user());// work on it
        $data = MdStock::where("md_product_id",$product_id)
        ->where("md_storage_id",$storage_id)
        ->with([
            "storage:id,name,is_active",
            "product:md_product_id,product_name",
            "base_unit",
        ])
        ->first();
        return response()->json($data, 200);
    }
}
