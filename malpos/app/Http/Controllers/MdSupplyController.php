<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use App\Models\MdSupply;
use App\Models\MdSupplyLine;

class MdSupplyController extends Controller
{
     /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(MdSupply::all(),200);
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

            "invoice_no" => ['nullable',"string",Rule::unique('md_supplies')],
            "operation_time" => ['required',"string"],
            "md_supplier_id" => ['required',"numeric"],
            "md_storage_id" => ['required',"numeric"],
            "status" => ['required',"string"],
            "balance" => ['nullable',"string"],
            "category" => ['nullable',"string"],
            "description" => ['nullable',"string"],

            "created_by" => ['nullable',"string"],
            "updated_by" => ['nullable',"string"],
            // 
            // "lines.*.md_supply_id" => ['required',"numeric"],
            "lines.*.md_product_id" => ['required',"numeric"],
            "lines.*.qty" => ['required',"numeric"],
            "lines.*.total" => ['required',"numeric"],
            "lines.*.unit" => ['nullable',"string"],
            "lines.*.cost" => ['required',"numeric"],
            "lines.*.discount_percent" => ['nullable',"numeric"],
            "lines.*.tax_percent" => ['nullable',"numeric"],
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], 401);
        }
        $data = $validator->validated();
        // $data = array_filter($data, function ($value) {
        //     return $value !== null;
        // });
        if(!$data["invoice_no"]){
            $old = MdSupply::max("invoice_no");
            $data["invoice_no"] = "1";
            if($old){
                $data["invoice_no"] = intval($old);
                $data["invoice_no"]++;
                $data["invoice_no"] = strval($data["invoice_no"]);
            }
        }
        // dd($data);
        $lines = $data["lines"];
        unset($data["lines"]);
        $supply = MdSupply::create($data);
        foreach($lines as $line){
            $line["md_supply_id"] = $supply->id;
            MdSupplyLine::create($line);
        }
        return response()->json(['message' => 'Supply Created Successfully'],200);
    }

    /**
     * Display the specified resource.
     */
    public function show(MdSupplier $MdSupplier)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        return response()->json(MdSupplier::where('id',$id)->first(),200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        if(!MdSupplier::find($id)){
            return response()->json(["error"=>"Sorry no record Found!"], 200);
        }
        $validator = Validator::make($request->all(), [
            "supplier_name" => ['required',"string"],
            "cd_client_id" => ['required',"numeric"],
            "cd_brand_id" => ['required',"numeric"],
            "cd_branch_id" => ['required',"numeric"],
            "phone" => ['required',"string",Rule::unique('md_suppliers')
            ->where("cd_client_id",$request->cd_client_id)
            ->where("cd_brand_id",$request->cd_brand_id)
            ->where("cd_branch_id",$request->cd_branch_id)->ignore($id)],

            "tin" => ['nullable',"string"],
            "description" => ['nullable',"string"],
            "is_active" => ['nullable',"string"],
            "created_by" => ['nullable',"string"],
            "updated_by" => ['nullable',"string"],
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }
        $data = $validator->validated();
        $data = array_filter($data, function ($value) {
            return $value !== null;
        });
        $updated = MdSupplier::where('id',$id)->update($data);
        return response()->json(['message' => 'Supplier Updated Successfully',"data" => MdSupplier::where('id',$id)->first()],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy( $id)
    {
        if(!MdSupplier::find($id)){
            return response()->json(["error"=>"Sorry no record Found!"], 200);
        }
        MdSupplier::where('id',$id)->delete();
        return response()->json(['message' => 'Supplier Deleted Successfully'],200);
    }
}
