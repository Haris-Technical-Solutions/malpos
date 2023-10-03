<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use App\Models\MdUomsConversion;
use App\Models\MdProductUnit;

class MdUOMConversionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = MdProductUnit::where("type","conversion")
        ->with(["product:md_product_id,product_name","conversion"])
        ->paginate(10);

        // $data = MdUomsConversion::paginate(10);
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
            // "cd_brand_id" => ['required',"numeric"],
            // "cd_branch_id" => ['required',"numeric"],
            
            "md_product_id" => ["required" , "numeric"],
            // "md_uom_id" => ["required" , "numeric"],
            "uom_to_name" => ["required" , "string"],
            "multiply_rate" => ["required" , "numeric"],
            "divide_rate" => ["required" , "numeric"],

            "created_by" => ['required',"string"],
            "updated_by" => ['nullable',"string"],
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }

        $taken = MdUomsConversion::where("md_uoms_conversions.cd_client_id",$request->cd_client_id)
        ->where("md_product_units.is_deleted",0)
        ->where("md_uoms_conversions.uom_to_name",$request->uom_to_name)
        ->join("md_product_units","md_uoms_conversions.md_uoms_conversions_id","md_product_units.md_uom_conversion_id")
        ->where("md_product_units.md_product_id",$request->md_product_id)->count();
        if($taken > 0){
            return response()->json(['error' => ["uom_to_name"=>"Sorry uom to name has already been taken for this product"]], 401);
        }

        $data = $validator->validated();

        // dd($data);
        $product_id = $data["md_product_id"];
        $base_unit = MdProductUnit::base_unit($product_id);
        if(!$base_unit){
            return response()->json(['error' => "Sorry no base unit found for this product!"], 401);
        }

        unset($data["md_product_id"]);
        $data["is_active"] = "1";
        // $data["md_uom_id"] = $base_unit->md_uom_id;
        $uomc = MdUomsConversion::create($data);

        $product_unit = MdProductUnit::create([
            "cd_client_id"=> $request->input('cd_client_id'),
            // "cd_brand_id"=> $request->input('cd_brand_id'),
            // "cd_branch_id"=> $request->input('cd_branch_id'),

            "md_product_id" => $product_id,
            "md_uom_conversion_id" => $uomc->id,
            "is_active" => 1,
            "type" => "conversion",
            
            "created_by" => $request->input('created_by'),
            "updated_by" => $request->input('updated_by'),
        ]);
        return response()->json(['message' => 'UOM Conversion Created Successfully For Selected Product',"data"=>MdProductUnit::unit_conversion($product_unit->id)],200);

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
        $data = MdUomsConversion::where("md_uoms_conversions_id",$id)->first();
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
    public function update(Request $request, $id){
        $product_unit = MdProductUnit::where("md_product_units_id",$id)->where("is_deleted",0)
        ->where("type","conversion")
        ->with("conversion:md_uoms_conversions_id,uom_to_name,multiply_rate,divide_rate")
        ->first();
        if(!$product_unit){
            return response()->json(['error' => 'Sorry no record Found!'],200);
        }

        $validator = Validator::make($request->all(), [
            "cd_client_id" => ['required',"numeric"],
            // "cd_brand_id" => ['required',"numeric"],
            // "cd_branch_id" => ['required',"numeric"],
            
            "md_product_id" => ["required" , "numeric"],
            // "md_uom_id" => ["required" , "numeric"],
            "uom_to_name" => ["required" , "string"],
            "multiply_rate" => ["required" , "numeric"],
            "divide_rate" => ["required" , "numeric"],

            "updated_by" => ['required',"string"],
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }

        $taken = MdUomsConversion::where("md_uoms_conversions.cd_client_id",$request->cd_client_id)
        ->whereNot("md_product_units.md_product_units_id",$id)
        ->where("md_product_units.is_deleted",0)
        ->where("md_uoms_conversions.uom_to_name",$request->uom_to_name)
        ->join("md_product_units","md_uoms_conversions.md_uoms_conversions_id","md_product_units.md_uom_conversion_id")
        ->where("md_product_units.md_product_id",$request->md_product_id)->count();

        if($taken > 0){
            return response()->json(['error' => ["uom_to_name"=>"Sorry uom to name has already been taken for this product"]], 401);
        }

        $data = $validator->validated();

        // dd($data);
        $product_id = $data["md_product_id"];
        $base_unit = MdProductUnit::base_unit($product_id);
        if(!$base_unit){
            return response()->json(['error' => "Sorry no base unit found for this product!"], 401);
        }

        unset($data["cd_client_id"]);
        unset($data["md_product_id"]);
        $data["is_active"] = "1";
        // $data["md_uom_id"] = $base_unit->md_uom_id;
        // dd($product_unit->md_uom_conversion_id,$data);
        MdUomsConversion::where("md_uoms_conversions_id",$product_unit->md_uom_conversion_id)->update($data);
        
        MdProductUnit::where("md_product_units_id",$id)->update([
            // "cd_client_id"=> $request->input('cd_client_id'),
            // "cd_brand_id"=> $request->input('cd_brand_id'),
            // "cd_branch_id"=> $request->input('cd_branch_id'),

            "md_product_id" => $product_id,
            "is_active" => 1,
            "updated_by" => $request->input('updated_by'),
        ]);
        return response()->json(['message' => 'UOM Conversion Updated Successfully For Selected Product',"data"=>MdProductUnit::unit_conversion($id)],200);
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
