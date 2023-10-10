<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use App\Models\MdUom;
use App\Models\MdUomsConversion;
use App\Models\MdProduct;

class MdUOMConversionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = MdUomsConversion::with(["uom_from_details","uom_to_details","product"])
        ->paginate(10);
        return response()->json(["data"=>$data],200);
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
            "cd_branch_id" => ['required',"numeric"],
            
            "md_product_id" => ["required" , "numeric"],

            "uom_from" => ["required" , "numeric"],
            // "uom_to" => ["sometimes" , "numeric", //not possible due to integrity issue
            //     Rule::unique("md_uoms_conversions")
            //     ->where("cd_client_id", $request->cd_client_id)
            //     ->where("cd_brand_id", $request->cd_brand_id)
            //     // apply ->when on branch
            //     ->where("cd_branch_id", $request->cd_branch_id)
            //     // ->where("is_deleted", 0)
            // ],

            "code" => ["required" , "string", Rule::unique('md_uoms')
                ->where("cd_client_id",$request->cd_client_id)
                // ->where("cd_brand_id", $request->cd_brand_id)
                // // apply ->when on branch
                // ->where("cd_branch_id", $request->cd_branch_id)
                // ->where("is_deleted", 0)
            ],

            "symbol" => ["required" , "string"],
            "name" => ["required" , "string"],
            "multiply_rate" => ["required" , "numeric"],
            "divide_rate" => ["required" , "numeric"],

            "created_by" => ['required',"string"],
            "updated_by" => ['nullable',"string"],
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }

        // $taken = MdUomsConversion::where("md_uoms_conversions.cd_client_id",$request->cd_client_id)
        // ->where("md_product_units.is_deleted",0)
        // ->where("md_uoms_conversions.uom_to_name",$request->uom_to_name)
        // ->join("md_product_units","md_uoms_conversions.md_uoms_conversions_id","md_product_units.md_uom_conversion_id")
        // ->where("md_product_units.md_product_id",$request->md_product_id)->count();
        // if($taken > 0){
        //     return response()->json(['error' => ["uom_to_name"=>"Sorry uom to name has already been taken for this product"]], 401);
        // }

        $data = $validator->validated();
        // $product = MdProduct::where( "md_product_id",$data["md_product_id"])->first();
        $product = MdProduct::with([
            "base_unit",
        ])
        ->whereHas("base_unit",function($query) use($data){
            $query->where("md_uom_id",$data["uom_from"]);
        })
        ->find($data["md_product_id"]);
        // MdProductController::edit($data["md_product_id"]);
        if(!$product){
            return response()->json(['error' => "Sorry no Product found for md_product_id with uom_from!"], 401);
        }
        // if($data["uom_from"] == $data["uom_to"]){
        //     return response()->json(['error' => "Sorry uom_from cannot be equal to uom_to!"], 401);
        // }
        if(!isset($data["uom_to"])){
            $uom = MdUom::create([
                "cd_client_id" => $data["cd_client_id"],
                "cd_brand_id" => $data["cd_brand_id"],
                "cd_branch_id" => $data["cd_branch_id"],

                "code" => $data["code"],
                "symbol" => $data["symbol"],
                "name" => $data["name"],

                "type" => "user_defined",
                "category" => "conversion",

                "created_by" => $data["created_by"],
                "updated_by" => $data["updated_by"],
            ]);
            $uom_to = $uom->id;
        }else{
            $uom_to = $data["uom_to"];
        }

        // return response()->json($product->base_unit, 200);

        // // dd($data);
        // $product_id = $data["md_product_id"];
        // $base_unit = MdProductUnit::base_unit($product_id);
        // if(!$base_unit){
        //     return response()->json(['error' => "Sorry no base unit found for this product!"], 401);
        // }

        // unset($data["md_product_id"]);
        // $data["is_active"] = "1";
        // $data["md_uom_id"] = $base_unit->md_uom_id;
        $uomc = MdUomsConversion::create([
            "cd_client_id" => $data["cd_client_id"],
            "cd_brand_id" => $data["cd_brand_id"],
            "cd_branch_id" => $data["cd_branch_id"],
            "uom_to" => $uom_to,
            "uom_from" => $data["uom_from"],	
            "multiply_rate" => $data["multiply_rate"],	
            "divide_rate" => $data["divide_rate"],	
            "md_product_id" => $data["md_product_id"],	
            "created_by" => $data["created_by"],
            "updated_by" => $data["updated_by"],
        ]);

        return response()->json(['message' => 'UOM Conversion Created Successfully For Selected Product',"data"=>MdUomsConversion::get_conversion($uomc->id)],200);

    }

    /**
     * Display the specified resource.
     */
    public function show(MdUomsConversion $mdUnitOfMeasurement)
    {
        
    }

    /**
     * Show the form for editing the specified resource.
     */
    
    public function edit($id)
    {
        $data = MdUomsConversion::get_conversion($id);
        if(!$data){
            return response()->json(['error' => 'Sorry no record Found!'],200);
        }
        return response()->json(["data"=>$data],200);
    }

    /**
     * Update the specified resource in storage.
     */
    // public function update(Request $request, $id)
    // {
    //     if(!MdUomsConversion::where("md_uoms_conversions_id",$id)->first()){
    //         return response()->json(['error' => 'Sorry no record Found!'],200);
    //     }
    //     $validator = Validator::make($request->all(), [
    //         "cd_client_id" => ['required',"numeric"],
    //         "cd_brand_id" => ['required',"numeric"],
    //         "cd_branch_id" => ['required',"numeric"],
            
    //         "md_uom_id" => ["required" , "numeric"],
    //         "uom_to_name" => ["required" , "string",Rule::unique('md_uoms_conversions')
    //             ->where("cd_client_id",$request->cd_client_id)
    //             ->whereNot("md_uoms_conversions_id",$id)
    //         ],
    //         "multiply_rate" => ["required" , "numeric"],
    //         "divide_rate" => ["required" , "numeric"],

    //         "updated_by" => ['nullable',"string"],
    //     ]);
    //     if ($validator->fails()) {
    //         return response()->json(['error' => $validator->errors()], 401);
    //     }
    //     $data = $validator->validated();
    //     MdUomsConversion::where("md_uoms_conversions_id",$id)->update($data);
    //     return response()->json(['message' => 'UOM Conversion Updated Successfully',"data"=>MdUomsConversion::where("md_uoms_conversions_id",$id)->first()],200);
    // }
    // public function update(Request $request, $id){
    //     $product_unit = MdProductUnit::where("md_product_units_id",$id)->where("is_deleted",0)
    //     ->where("type","conversion")
    //     ->with("conversion:md_uoms_conversions_id,uom_to_name,multiply_rate,divide_rate")
    //     ->first();
    //     if(!$product_unit){
    //         return response()->json(['error' => 'Sorry no record Found!'],200);
    //     }

    //     $validator = Validator::make($request->all(), [
    //         "cd_client_id" => ['required',"numeric"],
    //         // "cd_brand_id" => ['required',"numeric"],
    //         // "cd_branch_id" => ['required',"numeric"],
            
    //         "md_product_id" => ["required" , "numeric"],
    //         // "md_uom_id" => ["required" , "numeric"],
    //         "uom_to_name" => ["required" , "string"],
    //         "multiply_rate" => ["required" , "numeric"],
    //         "divide_rate" => ["required" , "numeric"],

    //         "updated_by" => ['required',"string"],
    //     ]);
    //     if ($validator->fails()) {
    //         return response()->json(['error' => $validator->errors()], 401);
    //     }

    //     $taken = MdUomsConversion::where("md_uoms_conversions.cd_client_id",$request->cd_client_id)
    //     ->whereNot("md_product_units.md_product_units_id",$id)
    //     ->where("md_product_units.is_deleted",0)
    //     ->where("md_uoms_conversions.uom_to_name",$request->uom_to_name)
    //     ->join("md_product_units","md_uoms_conversions.md_uoms_conversions_id","md_product_units.md_uom_conversion_id")
    //     ->where("md_product_units.md_product_id",$request->md_product_id)->count();

    //     if($taken > 0){
    //         return response()->json(['error' => ["uom_to_name"=>"Sorry uom to name has already been taken for this product"]], 401);
    //     }

    //     $data = $validator->validated();

    //     // dd($data);
    //     $product_id = $data["md_product_id"];
    //     $base_unit = MdProductUnit::base_unit($product_id);
    //     if(!$base_unit){
    //         return response()->json(['error' => "Sorry no base unit found for this product!"], 401);
    //     }

    //     unset($data["cd_client_id"]);
    //     unset($data["md_product_id"]);
    //     $data["is_active"] = "1";
    //     // $data["md_uom_id"] = $base_unit->md_uom_id;
    //     // dd($product_unit->md_uom_conversion_id,$data);
    //     MdUomsConversion::where("md_uoms_conversions_id",$product_unit->md_uom_conversion_id)->update($data);
        
    //     MdProductUnit::where("md_product_units_id",$id)->update([
    //         // "cd_client_id"=> $request->input('cd_client_id'),
    //         // "cd_brand_id"=> $request->input('cd_brand_id'),
    //         // "cd_branch_id"=> $request->input('cd_branch_id'),

    //         "md_product_id" => $product_id,
    //         "is_active" => 1,
    //         "updated_by" => $request->input('updated_by'),
    //     ]);
    //     return response()->json(['message' => 'UOM Conversion Updated Successfully For Selected Product',"data"=>MdProductUnit::unit_conversion($id)],200);
    // }
    
    public function update(Request $request,$id)
    {
        $data = MdUomsConversion::get_conversion($id,true);
        if(!$data or !isset($data->uom_to_details["md_uom_id"])){
            return response()->json(['error' => 'Sorry no record Found!'],200);
        }
        $uom_to = $data->uom_to_details["md_uom_id"];

        $validator = Validator::make($request->all(), [
            "cd_client_id" => ['required',"numeric"],
            "cd_brand_id" => ['required',"numeric"],
            "cd_branch_id" => ['required',"numeric"],
            
            // "md_product_id" => ["required" , "numeric"],

            "uom_from" => ["required" , "numeric"],
            "code" => ["required" , "string", Rule::unique('md_uoms')
                ->where("cd_client_id",$request->cd_client_id)
                ->whereNot("md_uom_id",$uom_to)
                // ->whereNot("",$id)

                // ->where("cd_brand_id", $request->cd_brand_id)
                // // apply ->when on branch
                // ->where("cd_branch_id", $request->cd_branch_id)
                // ->where("is_deleted", 0)
            ],

            "symbol" => ["required" , "string"],
            "name" => ["required" , "string"],

            "multiply_rate" => ["required" , "numeric"],
            "divide_rate" => ["required" , "numeric"],
            // "created_by" => ['required',"string"],
            "updated_by" => ['required',"string"],
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }

        // $taken = MdUomsConversion::where("md_uoms_conversions.cd_client_id",$request->cd_client_id)
        // ->where("md_product_units.is_deleted",0)
        // ->where("md_uoms_conversions.uom_to_name",$request->uom_to_name)
        // ->join("md_product_units","md_uoms_conversions.md_uoms_conversions_id","md_product_units.md_uom_conversion_id")
        // ->where("md_product_units.md_product_id",$request->md_product_id)->count();
        // if($taken > 0){
        //     return response()->json(['error' => ["uom_to_name"=>"Sorry uom to name has already been taken for this product"]], 401);
        // }

        $datav = $validator->validated();
        // return response()->json($data, 200);
        // $product = MdProduct::where( "md_product_id",$data["md_product_id"])->first();
        $product = MdProduct::with([
            "base_unit",
        ])
        ->whereHas("base_unit",function($query) use($data){
            $query->where("md_uom_id",$data["uom_from"]);
        })
        ->find($data->md_product_id);
        // MdProductController::edit($data["md_product_id"]);
        if(!$product){
            return response()->json(['error' => "Sorry no Product found for md_product_id with uom_from!"], 401);
        }
        // if($data["uom_from"] == $data["uom_to"]){
        //     return response()->json(['error' => "Sorry uom_from cannot be equal to uom_to!"], 401);
        // }
        $uom = MdUom::where("md_uom_id",$uom_to)->update([
            // "cd_client_id" => $datav["cd_client_id"],
            // "cd_brand_id" => $datav["cd_brand_id"],
            // "cd_branch_id" => $datav["cd_branch_id"],

            "code" => $datav["code"],
            "symbol" => $datav["symbol"],
            "name" => $datav["name"],

            // "type" => "user_defined",
            // "category" => "conversion",

            // "created_by" => $datav["created_by"],
            "updated_by" => $datav["updated_by"],
        ]);
        // $uom_to = $uom->id;

        // return response()->json($product->base_unit, 200);

        // // dd($data);
        // $product_id = $data["md_product_id"];
        // $base_unit = MdProductUnit::base_unit($product_id);
        // if(!$base_unit){
        //     return response()->json(['error' => "Sorry no base unit found for this product!"], 401);
        // }

        // unset($data["md_product_id"]);
        // $data["is_active"] = "1";
        // $data["md_uom_id"] = $base_unit->md_uom_id;
        $uomc = MdUomsConversion::where("md_uom_conversion_id",$id)->update([
            // "cd_client_id" => $datav["cd_client_id"],
            // "cd_brand_id" => $datav["cd_brand_id"],
            // "cd_branch_id" => $datav["cd_branch_id"],
            "uom_from" => $datav["uom_from"],	
            "multiply_rate" => $datav["multiply_rate"],	
            "divide_rate" => $datav["divide_rate"],	
            // "md_product_id" => $datav["md_product_id"],	
            // "created_by" => $datav["created_by"],
            "updated_by" => $datav["updated_by"],
        ]);

        return response()->json(['message' => 'UOM Conversion Updated Successfully For Selected Product',"data"=>MdUomsConversion::get_conversion($id)],200);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        if(!MdProductUnit::where("md_product_units_id",$id)->where("is_deleted" , 0)->first()){
            return response()->json(['error' => 'Sorry no record Found!'],200);
        }
        MdProductUnit::where("md_product_units_id",$id)->update(["is_deleted" => 1]);
        return response()->json(['message' => 'UOM Conversion Deleted Successfully'],200);
    }
}
