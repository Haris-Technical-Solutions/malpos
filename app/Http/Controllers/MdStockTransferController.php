<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Validator;
use App\Models\MdStock;
use App\Models\MdStockTransfer;
use App\Models\MdStockTransferLine;
use App\Models\MdStockTransferLine;
use Illuminate\Validation\Rule;

class MdStockTransferController extends Controller
{
     /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(MdSupply::
        with([
            "supplier:id,supplier_name",
            "storage:id,name,is_active",
            // "supply_lines",
            "supply_lines.product:md_product_id,product_name"
        ])
        ->simplePaginate(10),200);
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

            "operation_time" => ['required',"string"],
            "md_from_storage_id" => ['required',"numeric"],
            "md_to_storage_id" => ['required',"numeric"],

            "reason" => ['nullable',"string"],

            "created_by" => ['nullable',"string"],
            "updated_by" => ['nullable',"string"],
            // 
            // "lines.*.md_supply_id" => ['required',"numeric"],
            "lines.*.md_product_id" => ['required',"numeric"],
            "lines.*.qty" => ['required',"numeric"],
            "lines.*.unit" => ['nullable',"string"],
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], 401);
        }
        $data = $validator->validated();
        // $data = array_filter($data, function ($value) {
        //     return $value !== null;
        // });
        // dd($data);
        $lines = $data["lines"];
        unset($data["lines"]);
        // dd($data,$lines);
        $transfer = MdStockTransfer::create($data);
        foreach($lines as $line){
            MdStock::create([
                "cd_client_id" =>  $request->cd_client_id,
                "cd_brand_id" =>  $request->cd_brand_id,
                "cd_branch_id" =>  $request->cd_branch_id,

                "md_stock_transfer_id" => $transfer->id,
                "md_product_id" => $line["md_product_id"],
                "md_storage_id" => $request->md_from_storage_id,
                "stock_type" => "transfer",
                "qty" => ($line["qty"]*-1),
                "unit" => $line["unit"],
                // "cost" => $line["cost"],
            ]);
            MdStock::create([
                "cd_client_id" =>  $request->cd_client_id,
                "cd_brand_id" =>  $request->cd_brand_id,
                "cd_branch_id" =>  $request->cd_branch_id,

                "md_stock_transfer_id" => $transfer->id,
                "md_product_id" => $line["md_product_id"],
                "md_storage_id" => $request->md_to_storage_id,
                "stock_type" => "transfer",
                "qty" => ($line["qty"]),
                "unit" => $line["unit"],
                // "cost" => $line["cost"],
            ]);
            // MdStockTransferLine::create([
            //     "md_product_id" => $line["md_product_id"],
            //     "qty" => $line["qty"],
            //     "unit" => $line["unit"],
            //     // "cost" => $line["cost"],
            // ]);
            // MdSupplyLine::create($line);
        }
        return response()->json(['message' => 'Stock Transferd Successfully',"data"=>""],200);
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
        if(!MdSupply::find($id)){
            return response()->json(["error"=>"Sorry no record Found!"], 200);
        }
        return response()->json(MdSupply::getSupply($id),200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        if(!MdSupply::find($id)){
            return response()->json(["error"=>"Sorry no record Found!"], 200);
        }
        $validator = Validator::make($request->all(), [

            "cd_client_id" => ['required',"numeric"],
            "cd_brand_id" => ['required',"numeric"],
            "cd_branch_id" => ['required',"numeric"],

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
            "lines.*.md_product_id" => ['required',"numeric"],
            "lines.*.qty" => ['required',"numeric"],
            "lines.*.total" => ['required',"numeric"],
            "lines.*.unit" => ['nullable',"string"],
            "lines.*.cost" => ['required',"numeric"],
            "lines.*.discount_percent" => ['nullable',"numeric"],
            "lines.*.tax_percent" => ['nullable',"numeric"],
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }
        $data = $validator->validated();

        $lines = $data["lines"];
        unset($data["lines"]);
        // dd($data,$lines);
        MdSupply::where("id",$id)->update($data);

        MdSupplyLine::where("md_supply_id",$id)->delete();
        MdStock::where("md_supply_id",$id)->delete();
        foreach($lines as $line){
            MdStock::create([
                "cd_client_id" =>  $request->cd_client_id,
                "cd_brand_id" =>  $request->cd_brand_id,
                "cd_branch_id" =>  $request->cd_branch_id,

                "md_supply_id" => $id,
                "md_storage_id" => $request->md_storage_id,
                "md_product_id" => $line["md_product_id"],
                "stock_type" => "supply",
                "qty" => $line["qty"],
                "cost" => $line["cost"],
            ]);
            $line["md_supply_id"] = $id;
            MdSupplyLine::create($line);
        }
        return response()->json(['message' => 'Supply Updated Successfully',"data" => MdSupply::getSupply($id)],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy( $id)
    {
        if(!MdSupply::find($id)){
            return response()->json(["error"=>"Sorry no record Found!"], 200);
        }

        MdSupply::where("id",$id)->update(["status"=>'deleted']);
        // MdSupplyLine::where("md_supply_id",$id)->delete();
        return response()->json(['message' => 'Supply Deleted Successfully'],200);
    }
}