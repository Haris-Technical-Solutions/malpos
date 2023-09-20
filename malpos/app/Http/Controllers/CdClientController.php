<?php

namespace App\Http\Controllers;

use App\Models\CdClient;
use Illuminate\Http\Request;

class CdClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $data =  CdClient::all();
        return response()->json($data);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return 'create';

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $data = new CdClient();
        $data->name = $request['name'];
        $data->email = $request['email'];
        $data->address = $request['address'];
        $data->phone_no = $request['phone_no'];
        $data->client_role = $request['client_role'];
        $data->is_active = $request['is_active'];
        $data->country_id = $request['country_id'];
        $data->city_id = $request['city_id'];
        $data->created_by = $request['created_by'];
        $data->updated_by = $request['updated_by'];
        $data->save();
        
        return response()->json($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(CdClient $cdClient)
    {
        //
        return 'show';

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit( $id)
    {
        $data = CdClient::find($id);
        return response()->json($data);



    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
     

        $data = CdClient::find($id);
        $data->name = $request['name'];
        $data->email = $request['email'];
        $data->address = $request['address'];
        $data->phone_no = $request['phone_no'];
        $data->client_role = $request['client_role'];
        $data->is_active = $request['is_active'];
        $data->country_id = $request['country_id'];
        $data->city_id = $request['city_id'];
        $data->created_by = $request['created_by'];
        $data->updated_by = $request['updated_by'];
        $data->save();
        
        return response()->json($data);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //
        $data = CdClient::find($id);
        $data->delete();
        return response()->json($data);
    }
}
