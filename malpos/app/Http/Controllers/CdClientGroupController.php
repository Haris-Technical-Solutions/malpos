<?php

namespace App\Http\Controllers;

use App\Models\CdClientGroupCustom;
use Illuminate\Support\Facades\Validator;

//old
use App\Models\CdClientGroup;
//
use Illuminate\Http\Request;

class CdClientGroupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(['client_groups' => CdClientGroupCustom::all()],200);
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
            "group_name" => ['required',"string","unique:cd_client_group_customs"],
            "discount" => ['required',"numeric"],
            "type" => ['nullable',"string"],
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], 401);
        }
        $data = $validator->validated();
        $data = array_filter($data, function ($value) {
            return $value !== null;
        });
        CdClientGroupCustom::create($data);
        return response()->json(['message' => 'Customer Group Created Successfully'],200);
    }

    /**
     * Display the specified resource.
     */
    public function show(CdClientGroup $cdClientGroup)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        return response()->json(['client_group' => CdClientGroupCustom::where('id',$id)->first()],200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // dd($request->get("group_name"));
        $validator = Validator::make($request->all(), [
            "group_name" => ['required',"string"],
            "discount" => ['required',"numeric"],
            "type" => ['nullable',"string"],
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], 401);
        }
        $data = $validator->validated();
        $data = array_filter($data, function ($value) {
            return $value !== null;
        });
        CdClientGroupCustom::where('id',$id)->update($data);
        return response()->json(['message' => 'Customer Group Updated Successfully'],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy( $id)
    {
        CdClientGroupCustom::where('id',$id)->delete();
        return response()->json(['message' => 'Customer Group Deleted Successfully'],200);
    }
}
