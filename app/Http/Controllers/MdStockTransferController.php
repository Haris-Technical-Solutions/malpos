<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Validator;
use App\Models\MdStock;
use App\Models\MdStockTransfer;
use App\Models\MdStorage;
use App\Models\MdStockTransferLine;
use App\Models\MdProductUnit;
use App\Models\MdUomsConversion;
// use App\Models\MdStockTransferLine;
use Illuminate\Validation\Rule;

class MdStockTransferController extends Controller
{
     /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(MdStockTransfer::
        with(["stock_transfer_lines"])
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
            "lines.*.md_product_id" => ['required',"numeric"],
            "lines.*.qty" => ['required',"numeric"],
            "lines.*.uom_id" => ['required',"string"],
            "lines.*.uom_type" => ['required',"string"],
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], 401);
        }
        $data = $validator->validated();

        $lines = $data["lines"];
        unset($data["lines"]);
        // dd($data,$lines);
        $check1 = [];
        $check2 = [];
        $check3 = [];
        $oldstocks = [];
        foreach($lines as $line){
            $product_base_unit = MdProductUnit::where("md_product_id",$line["md_product_id"])
            ->where('type',"unit")->first();
            if(!$product_base_unit){
                // return response()->json("no base unit found");
                array_push($check3,0);
            }else{
                array_push($check3,1);
                $line["total_qty"] = $line["qty"];
                $line["base_unit"] = $product_base_unit->md_uom_id;
                if($line["uom_type"] == "conversion"){
                    $unit=MdUomsConversion::where("md_uoms_conversions_id",$line["uom_id"])->first();
                    if($unit){
                        $line["total_qty"]*=$unit->multiply_rate;
                    }
                }
            }


            $oldstock = MdStock::where("md_storage_id",$data["md_from_storage_id"])
            ->where("md_product_id",$line["md_product_id"])->where("is_deleted",0)->first();

            if($oldstock){
                array_push($check2,1);
                if($oldstock->current_qty >= $line["total_qty"]){
                    $line["stock_id"] = $oldstock->id;
                    $line["stock_qty"] = $oldstock->current_qty;
                    array_push($oldstocks,$line);
                    array_push($check1,1);
                }else{
                    array_push($check1,0);
                }
                // return response()->json([$oldstock,$line["total_qty"]],200);
            }else{
                array_push($check2,0);
            }
        }

        if(array_product($check1) == 1 && array_product($check2) == 1 && array_product($check3) == 1 ){
            $transfer = MdStockTransfer::create($data);
            foreach($oldstocks as $oline){
                //
                MdStock::where("id",$oline["stock_id"])->update([
                    'current_qty' => $oline["stock_qty"] - $oline["total_qty"]
                ]);
                $newstock = MdStock::where("md_storage_id",$data["md_to_storage_id"])
                ->where("md_product_id",$oline["md_product_id"])->where("is_deleted",0)->first();
                if($newstock){
                    MdStock::where("id",$newstock->id)->update([
                        'current_qty' => $newstock->current_qty + $oline["total_qty"]
                    ]);
                }else{
                    $storage = MdStorage::where("id",$data["md_to_storage_id"])->where("is_active",1)->first();
                    MdStock::create([
                        "cd_client_id" =>  $storage->cd_client_id,
                        "cd_brand_id" =>  $storage->cd_brand_id,
                        "cd_branch_id" =>  $storage->cd_branch_id,
                        "md_uom_id" =>  $oline["base_unit"],
                        "md_storage_id" => $data["md_to_storage_id"],
                        "current_qty" => $oline["total_qty"],
                        "md_product_id" => $oline["md_product_id"],
                    ]);
                }
                MdStockTransferLine::create([
                    "md_stock_transfer_id"=>$transfer->id,
                    "md_product_id" => $oline["md_product_id"],
                    "qty" => $oline["total_qty"],
                    "uom_id" => $oline["uom_id"],
                    "uom_type" => $oline["uom_type"]
                ]);
            }
        }elseif(array_product($check1) != 1){
            return response()->json(["error"=>"Sorry no enough stock available for one of the product to transfer!"],401);
        }elseif(array_product($check2) != 1){
            return response()->json(["error"=>"Sorry no stock available for one of the product!"],401);
        }elseif(array_product($check3) != 1){
            return response()->json(["error"=>"Sorry one of the product's base unit not found!"],401);
        }

        return response()->json(['message' => 'Stock Transferd Successfully',"data"=>MdStockTransfer::getTransfer($transfer->id)],200);
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
        if(!MdStockTransfer::getTransfer($id)){
            return response()->json(["error"=>"Sorry no record Found!"], 200);
        }
        return response()->json(MdStockTransfer::getTransfer($id),200);
    }

    /**
     * Update the specified resource in storage.
     */

    public function update(Request $request,$id)
    {
        return response()->json(["error"=>"under construction "], 200);
        $oldTransfer = MdStockTransfer::getTransfer($id);
        if($oldTransfer->is_deleted == 1){
            return response()->json(["error"=>"Sorry Deleted record cannot be updated!"], 200);
        }
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
            "lines.*.md_product_id" => ['required',"numeric"],
            "lines.*.qty" => ['required',"numeric"],
            "lines.*.uom_id" => ['required',"string"],
            "lines.*.uom_type" => ['required',"string"],
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }
        $data = $validator->validated();

        $lines = $data["lines"];
        unset($data["lines"]);
        // --------------------------------------------------------------------------
        $ucheck1 = [];
        $oldtransfer_u = [];
        $oldtransfer = MdStockTransfer::getTransfer($id);
        foreach($oldtransfer->stock_transfer_lines as $osline){
            // $product_base_unit = MdProductUnit::where("md_product_id",$osline["md_product_id"])
            // ->where('type',"unit")->first();

            // $osline["total_qty"] = $osline["qty"];
            // $osline["base_unit"] = $product_base_unit->md_uom_id;

            // if($osline["uom_type"] == "conversion"){
            //     $unit=MdUomsConversion::where("md_uoms_conversions_id",$osline["uom_id"])->first();
            //     if($unit){
            //         $osline["total_qty"]*=$unit->multiply_rate;
            //     }
            // }
            // return  response()->json([$osline["qty"]], 200);

            $fromstock = MdStock::where("md_storage_id",$oldtransfer->md_from_storage_id)
            ->where("md_product_id",$osline["md_product_id"])->where("is_deleted",0)->first();

            $tostock = MdStock::where("md_storage_id",$oldtransfer->md_to_storage_id)
            ->where("md_product_id",$osline["md_product_id"])->where("is_deleted",0)->first();
// -adjustment and also manage its removed items
            $index = array_search($osline["md_product_id"], array_column($lines, 'md_product_id'));
            if ($index !== false) {
                $product = $lines[$index];
            } else {
                $product = null;
            }
            return  response()->json([$tostock->current_qty ,  $osline["qty"],$product], 200);

            if($tostock->current_qty >= $osline["qty"]){
                $osline["fromstockid"] = $fromstock->id;
                $osline["tostockid"] = $tostock->id;
                $osline["fromstock_qty"] = $fromstock->current_qty;
                $osline["tostock_qty"] = $tostock->current_qty;
                array_push($oldtransfer_u,$osline);
                array_push($ucheck1,1);
            }else{
                array_push($ucheck1,0);
            }
        }
        // if(array_product($ucheck1) == 1){
            
            // return  response()->json(array_product($ucheck1), 200);
        // }
        // exit;
        if(array_product($ucheck1) == 1){
            foreach($oldtransfer_u as $oslineu)
            {
                MdStock::where('id',$oslineu["fromstockid"])->update([
                    "current_qty" => $oslineu["fromstock_qty"] + $oslineu["qty"]
                ]);
                MdStock::where('id',$oslineu["tostockid"])->update([
                    "current_qty" => $oslineu["tostock_qty"] - $oslineu["qty"]
                ]);
            }
        }else{
            return response()->json(["error"=>"Sorry no enough stock available for one of the product to transfer!"],401);
        }
        // --------------------------------------------------------------------------
        return response()->json(["error"=>"fsvs"],401);

        // dd($data,$lines);
        $check1 = [];
        $check2 = [];
        $check3 = [];
        $oldstocks = [];

        foreach($lines as $line){
            $product_base_unit = MdProductUnit::where("md_product_id",$line["md_product_id"])
            ->where('type',"unit")->first();
            if(!$product_base_unit){
                array_push($check3,0);
            }else{
                array_push($check3,1);
                $line["total_qty"] = $line["qty"];
                $line["base_unit"] = $product_base_unit->md_uom_id;
                if($line["uom_type"] == "conversion"){
                    $unit=MdUomsConversion::where("md_uoms_conversions_id",$line["uom_id"])->first();
                    if($unit){
                        $line["total_qty"]*=$unit->multiply_rate;
                    }
                }
            }


            $oldstock = MdStock::where("md_storage_id",$data["md_from_storage_id"])
            ->where("md_product_id",$line["md_product_id"])->where("is_deleted",0)->first();
            // 
            // $otl  = MdStockTransferLine::where("md_stock_transfer_id",$id)->where("md_product_id",$line["md_product_id"])->first();
            // $adjustment = $otl?$otl->qty:0;
            // $line["total_qty"] = $line["total_qty"]-$adjustment;
            // 
            if($oldstock){
                // return response()->json($oldstock->current_qty  >= $line["total_qty"]-$adjustment, 200);
                array_push($check2,1);
                if($oldstock->current_qty  >= $line["total_qty"]){
                    $line["stock_id"] = $oldstock->id;
                    $line["stock_qty"] = $oldstock->current_qty;
                    array_push($oldstocks,$line);
                    array_push($check1,1);
                }else{
                    array_push($check1,0);
                }
                // return response()->json([$oldstock,$line["total_qty"]],200);
            }else{
                array_push($check2,0);
            }
        }

        // $removed = MdStockTransferLine::where("md_stock_transfer_id",$id)->whereNotIn('md_product_id',array_column($lines,'md_product_id'))->get();
        // foreach($removed as $rem){

        // }
        // return response()->json($removed,200);


        if(array_product($check1) == 1 && array_product($check2) == 1 && array_product($check3) == 1 ){
            $transfer = MdStockTransfer::create($data);
            foreach($oldstocks as $oline){
                //
                MdStock::where("id",$oline["stock_id"])->update([
                    'current_qty' => $oline["stock_qty"] - $oline["total_qty"]
                ]);
                $newstock = MdStock::where("md_storage_id",$data["md_to_storage_id"])
                ->where("md_product_id",$oline["md_product_id"])->where("is_deleted",0)->first();
                if($newstock){
                    MdStock::where("id",$newstock->id)->update([
                        'current_qty' => $newstock->current_qty + $oline["total_qty"]
                    ]);
                }else{
                    $storage = MdStorage::where("id",$data["md_to_storage_id"])->where("is_active",1)->first();
                    MdStock::create([
                        "cd_client_id" =>  $storage->cd_client_id,
                        "cd_brand_id" =>  $storage->cd_brand_id,
                        "cd_branch_id" =>  $storage->cd_branch_id,
                        "md_uom_id" =>  $oline["base_unit"],
                        "md_storage_id" => $data["md_to_storage_id"],
                        "current_qty" => $oline["total_qty"],
                        "md_product_id" => $oline["md_product_id"],
                    ]);
                }
                MdStockTransferLine::create([
                    "md_stock_transfer_id"=>$transfer->id,
                    "md_product_id" => $oline["md_product_id"],
                    "qty" => $oline["total_qty"],
                    "uom_id" => $oline["uom_id"],
                    "uom_type" => $oline["uom_type"]
                ]);
            }
        }elseif(array_product($check1) != 1){
            return response()->json(["error"=>"Sorry no enough stock available for one of the product to transfer!"],401);
        }elseif(array_product($check2) != 1){
            return response()->json(["error"=>"Sorry no stock available for one of the product!"],401);
        }elseif(array_product($check3) != 1){
            return response()->json(["error"=>"Sorry one of the product's base unit not found!"],401);
        }

        return response()->json(['message' => 'Stock Transferd Successfully',"data"=>MdStockTransfer::getTransfer($transfer->id)],200);
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
