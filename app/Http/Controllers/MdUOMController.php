<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use App\Models\MdUom;
use App\Models\MdUomsConversion;
// use App\Models\MdProductUnit;
use App\Models\MdProduct;

class MdUOMController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = MdUom::where("category","base")->paginate(10);
        return response()->json(["data"=>$data],200);
    }
    
    public function get_units_by_product(Request $request,$product_id)
    {
        
        $validator = Validator::make($request->all(), [
            "cd_client_id" => ['required',"numeric"],
            // "cd_brand_id" => ['required',"numeric"],
            // "cd_branch_id" => ['required',"numeric"],
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }
        $product = MdProduct::where("md_product_id",$product_id)
        ->where("cd_client_id",$request->cd_client_id)
        ->with(["base_unit","unit_conversions.uom_to_details"])
        ->first();
        if(!$product){
            return response()->json(['error' => "Sorry no record found!"], 401);
        }
        $units = [];
        $units[0]["md_uom_id"] = $product->base_unit["md_uom_id"];
        $units[0]["code"] = $product->base_unit["code"];
        $units[0]["name"] = $product->base_unit["name"];
        $units[0]["symbol"] = $product->base_unit["symbol"];
        $units[0]["multiply_rate"] = 1;
        $units[0]["divide_rate"] = 1;
        $i = 1;
        foreach($product->unit_conversions as $conversion){
            $units[$i]["md_uom_id"] = $conversion["uom_to_details"]["md_uom_id"];
            $units[$i]["code"] = $conversion["uom_to_details"]["code"];
            $units[$i]["name"] = $conversion["uom_to_details"]["name"];
            $units[$i]["symbol"] = $conversion["symbol"];
            $units[$i]["multiply_rate"] = $conversion["multiply_rate"];
            $units[$i]["divide_rate"] = $conversion["divide_rate"];
            $i++;
        }

        return response()->json($units, 200);
        
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "cd_client_id" => ['required',"numeric"],
            "cd_brand_id" => ['required',"numeric"],
            // "cd_branch_id" => ['required',"numeric"],
            
            "code" => ["required" , "string", Rule::unique('md_uoms')
            ->where("cd_client_id",$request->cd_client_id)],

            "symbol" => ["required" , "string"],
            "name" => ["required" , "string"],

            "created_by" => ['nullable',"string"],
            "updated_by" => ['nullable',"string"],
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }
        $data = $validator->validated();
        $data["type"] = "user_defined";
        $data["category"] = "base";
        // $data["is_active"] = "1";
        $uom = MdUom::create($data);
        return response()->json(['message' => 'UOM Created Successfully',"data"=>MdUom::where("md_uom_id",$uom->id)->first()],200);
    }

    /**
     * Display the specified resource.
     */
    public function show(MdUom $mdUnitOfMeasurement)
    {
        
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $data = MdUom::where("md_uom_id",$id)->where("category","base")->first();
        if(!$data){
            return response()->json(['error' => 'Sorry no record Found!'],200);
        }
        return response()->json(["data"=>$data],200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        if(!MdUom::where("md_uom_id",$id)->first()){
            return response()->json(['error' => 'Sorry no record Found!'],200);
        }
        $validator = Validator::make($request->all(), [
            "cd_client_id" => ['required',"numeric"],
            "cd_brand_id" => ['required',"numeric"],
            // "cd_branch_id" => ['required',"numeric"],
            
            "code" => ["required" , "string",
                Rule::unique('md_uoms')
                ->where("cd_client_id",$request->cd_client_id)
                ->whereNot("md_uom_id",$id)
            ],
            "symbol" => ["required" , "string",],
            "name" => ["required" , "string"],

            "updated_by" => ['nullable',"string"],
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }
        $data = $validator->validated();
        MdUom::where("md_uom_id",$id)->update($data);
        return response()->json(['message' => 'UOM Updated Successfully',"data"=>MdUom::where("md_uom_id",$id)->first()],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $data = MdUom::where("md_uom_id",$id)->where("is_deleted",0)->first();
        if(!$data){
            return response()->json(['error' => 'Sorry no record Found!'],200);
        }
        if(MdUomsConversion::
            where("cd_client_id",$data->cd_client_id)->
            where("is_deleted",0)
            ->where("md_uom_id",$id)->first()){
            return response()->json(['error' => 'UOM Cannot be Deleted, Because it is associated to uom conversions'],200);
        }

        MdUom::where("md_uom_id",$id)->update(["is_deleted" => 1]);
        return response()->json(['message' => 'UOM Deleted Successfully'],200);
    }
}
