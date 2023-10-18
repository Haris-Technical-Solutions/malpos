<?php

namespace App\Http\Controllers;

use App\Models\MdProduct;
use App\Models\MdProductAllergy;
use App\Models\MdProductBrand;
use App\Models\MdProductBranch;
use App\Models\MdProductCategory;
use App\Models\MdProductDetail;
use App\Models\MdProductDiet;
use App\Models\MdProductModifier;
use App\Models\MdProductProductCategory;
use Illuminate\Http\Request;
use App\Models\MdProductUnit;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class MdProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    // public function index(Request $request, $id = null)
    // {
    //  if($id != null){
    //         $query = MdProduct::where('md_product_category_id', $id)->get();
    //     }
    //     else{
    //         $query = MdProduct::with('client','brand', 'branch')->paginate(10);
    //         // $order_detail = OrderDetail::all();
    //     }
    //     return response()->json(['product'=>$query]);
    // }
    function __construct(){
        $this->product_types = [
            "dish"=>"dish",
            "ready_made"=>"ready_made",
            "time_product"=>"time_product",
            "ingredient"=>"ingredient",
            "preparation"=>"preparation",
        ];
        $this->product_dish_types = [
            "ingredient"=>"ingredient",
            "preparation"=>"preparation",
        ];
        $this->product_preparation_types = [
            "ingredient"=>"ingredient",
        ];
        $this->sub_products = [
            "dish"=>"dish",
            "preparation"=>"preparation",
        ];
    }
    public function index(Request $request, $id = null)
    {
        $search_product = $request->input('search_by_product');
        $search = $request->input('search');
        $product_id = $request->input('product_id');
        // $md_station_id = $request->input('md_station_id');
        $md_product_category_id = $request->input('md_product_category_id');
        $gift = $request->input('gift');

        $query = MdProduct::with([
            'client',
            // "unit_conversions.uom_to_details",
            "base_unit",
            "unit_conversions.uom_to_details",
            // "base_unit.conversions",
            'product_branch.branch',
            'product_brand.brand',
            'product_product_category.product_category',
            'product_details',
            'product_modifier.modifier',
            'product_diet.diet',
            'product_allergy.allergy',
        ]);


        if ($id !== null) {
            $query->where('md_product_category_id', $id);
        }

        if ($search_product) {
            $query->where(function ($innerQuery) use ($search, $product_id, $md_product_category_id, $gift) {
                $innerQuery->where('product_name', 'LIKE', "%$search%")
                    ->orWhere('md_product_id', "$product_id")
                    ->orWhere('md_product_category_id', $md_product_category_id)
                    ->orWhere('gift', "$gift");
            });
        }

        $products = $query->paginate(10);

        return response()->json(['products' => $products]);
    }
    public function get_all_prod(Request $request)
    {
        // $search_product = $request->input('search_by_product');
        // $search = $request->input('search');
        // $product_id = $request->input('product_id');
        // // $md_station_id = $request->input('md_station_id');
        // $md_product_category_id = $request->input('md_product_category_id');
        // $gift = $request->input('gift');

        $query = MdProduct::with([
            'client',
            // "unit_conversions.uom_to_details",
            "base_unit",
            "unit_conversions.uom_to_details",
            // "base_unit.conversions",
            'product_branch.branch',
            'product_brand.brand',
            'product_product_category.product_category',
            'product_details',
            'product_modifier.modifier',
            'product_diet.diet',
            'product_allergy.allergy',
        ]);


        // if ($id !== null) {
        //     $query->where('md_product_category_id', $id);
        // }

        // if ($search_product) {
        //     $query->where(function ($innerQuery) use ($search, $product_id, $md_product_category_id, $gift) {
        //         $innerQuery->where('product_name', 'LIKE', "%$search%")
        //             ->orWhere('md_product_id', "$product_id")
        //             ->orWhere('md_product_category_id', $md_product_category_id)
        //             ->orWhere('gift', "$gift");
        //     });
        // }

        $products = $query->get();

        return response()->json(['products' => $products]);
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
        $rule1 = [
            "cd_client_id" => ['required',"numeric"],
            "type" => ["required","string"],
            // "cd_brand_id" => ['required',"numeric"],
            // "cd_branch_id" => ['required',"numeric"],

            "product_code" => ["required" , "string", Rule::unique('md_products')
            ->where("cd_client_id",$request->cd_client_id)],

            "product_name" => ["required" , "string"],
            "product_price" => ["required" , "numeric"],

            "deleting_method" => ["nullable" , "string"],
            "total_weight" => ["nullable" , "numeric"],
            "barcode" => ["required" , "string"],
            "maximun_day_of_product_return" => ["nullable" , "numeric"],
            "cooking_time" => ["nullable" , "numeric"],
            "description" => ["nullable" , "string"],
            "gift" => ["nullable" , "numeric"],
            "portion" => ["nullable" , "numeric"],
            "bundle" => ["nullable" , "numeric"],
            "not_allow_apply_discount" => ["nullable" , "numeric"],
            "sold_by_weight" => ["nullable" , "numeric"],
            "sale_price" => ["nullable" , "numeric"],
            "td_tax_category_id" => ["nullable" , "numeric"],
            "md_uom_id" => ["required" , "numeric"],
            "is_active" => ["required" , "numeric"],

            "created_by" => ['required',"numeric"],
            // "updated_by" => ['nullable',"numeric"],

            "product_image" => ["sometimes"],

            // "time_duration_in_hours" => [ Rule::requiredIf($request->type == "time_product"),"numeric"],
            // "place" => [Rule::requiredIf($request->type == "time_product"),"string"],



        ];
        $rule2 = [
            //
            "product_details" => [ Rule::requiredIf(isset($this->sub_products[$request->type])),"array"],
            "product_details.*.detail_type" => ["required","string"],
            "product_details.*.md_detail_id" => ["required","numeric"],
            "product_details.*.qty" => ["required","numeric"],
            "product_details.*.cost" => ["required","numeric"],
            "product_details.*.md_uom_id" => ["required","numeric"],

            //
            "product_modifiers" => ["sometimes","array"],
            "product_modifiers.*.md_modifier_id" => ["required","numeric"],

            //
            "product_brands" => ["sometimes","array"],
            "product_brands.*.cd_brand_id" => ["required","numeric"],

            //
            "product_branches" => ["sometimes","array"],
            "product_branches.*.cd_branch_id" => ["required","numeric"],

            //
            "product_categories" => ["sometimes","array"],
            "product_categories.*.md_product_category_id" => ["required","numeric"],

            //
            "product_allergies" => ["sometimes","array"],
            "product_allergies.*.md_allergy_id" => ["required","numeric"],

            //
            "product_diets" => ["sometimes","array"],
            "product_diets.*.md_diet_id" => ["required","numeric"],
        ];
        $validator = Validator::make($request->all(), array_merge($rule1,$rule2));
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }
        // Data Filteration ----------------------
        if(!isset($this->product_types[$request->type])){
            return response()->json(['error' => "Only these values are allowed in type field","fields"=>array_values($this->product_types)], 401);
        }
        $product_details = $request->product_details;
        if($product_details){
            // if($request->type == $this->sub_products["dish"]){
                foreach($product_details as $detail){
                    if(!isset($this->product_dish_types[$detail["detail_type"]])){
                        return response()->json(['error' => "Only these values are allowed in Product Recipe type field","fields"=>array_values($this->product_dish_types)], 401);
                    }
                }
            // }else{
            //     foreach($product_details as $detail){
            //         if(!isset($this->product_preparation_types[$detail["detail_type"]])){
            //             return response()->json(['error' => "Only these values are allowed in Preparation type field","fields"=>array_values($this->product_preparation_types)], 401);
            //         }
            //     }
            // }
        }
        $data = $validator->validated();
        foreach(array_keys($rule1) as $field){
            if(!isset($data[$field])){
                $data[$field] = null;
            }
        }

        if(!isset($this->sub_products[$request->type])){
            $data["product_details"] = [];
        }
        if($request->type == $this->sub_products["dish"]){
            $data["product_modifiers"] = $request->product_modifiers?$request->product_modifiers:[];
            $data["product_brands"] = $request->product_brands?$request->product_brands:[];
            $data["product_branches"] = $request->product_branches?$request->product_branches:[];
            $data["product_categories"] = $request->product_categories?$request->product_categories:[];
            $data["product_allergies"] = $request->product_allergies?$request->product_allergies:[];
            $data["product_diets"] = $request->product_diets?$request->product_diets:[];
        }else{
            $data["product_modifiers"] = [];
            // $data["product_brands"] = [];
            // $data["product_branches"] = [];
            // $data["product_categories"] = [];
            $data["product_allergies"] = [];
            $data["product_diets"] = [];
        }
        // Data Filteration ----------------------

        $profileImage = "";
        if ($image = $request->file('product_image')) {
            $destinationPath = public_path('img/product_image/');
            $profileImage = date('YmdHis') . "." . $image->getClientOriginalExtension();
            $image->move($destinationPath, $profileImage);
        }
        $product = MdProduct::create([
            "cd_client_id"=>$data["cd_client_id"],
            "type"=>$data["type"],
            "product_code"=>$data["product_code"],
            "product_name"=>$data["product_name"],
            "product_price"=>$data["product_price"],
            "deleting_method"=>$data["deleting_method"],
            "total_weight"=>$data["total_weight"],
            "barcode"=>$data["barcode"],
            "maximun_day_of_product_return"=>$data["maximun_day_of_product_return"],
            "cooking_time"=>$data["cooking_time"],
            "description"=>$data["description"],
            "gift"=>$data["gift"],
            "portion"=>$data["portion"],
            "bundle"=>$data["bundle"],
            "not_allow_apply_discount"=>$data["not_allow_apply_discount"],
            "sold_by_weight"=>$data["sold_by_weight"],
            "sale_price"=>$data["sale_price"],
            "td_tax_category_id"=>$data["td_tax_category_id"],
            "md_uom_id"=>$data["md_uom_id"],
            "is_active"=>$data["is_active"],
            "created_by"=>$data["created_by"],
            // "updated_by"=>$data["updated_by"],
            "product_image"=>$profileImage,
        ]);
        $md_product_id = $product->md_product_id;




        if ($data["product_details"] != []) {
            foreach($data["product_details"] as $item){
                $item["md_product_id"] = $md_product_id;
                MdProductDetail::create($item);
            }
        }

        if ($data["product_modifiers"] != []) {
            foreach($data["product_modifiers"] as $product_modifier){
                $product_modifier["md_product_id"] = $md_product_id;
                MdProductModifier::create($product_modifier);
            }
        }

        if ($data["product_brands"] != []) {
            foreach($data["product_brands"] as $product_brand){
                $product_brand["md_product_id"] = $md_product_id;
                MdProductBrand::create($product_brand);
            }
        }

        if ($data["product_branches"] != []) {
            foreach($data["product_branches"] as $product_branch){
                $product_branch["md_product_id"] = $md_product_id;
                MdProductBranch::create($product_branch);
            }
        }

        if ($data["product_categories"] != []) {
            foreach($data["product_categories"] as $product_category){
                $product_category["md_product_id"] = $md_product_id;
                MdProductProductCategory::create($product_category);
            }
        }

        if ($data["product_allergies"] != []) {
            foreach($data["product_allergies"] as $product_allergy){
                $product_allergy["md_product_id"] = $md_product_id;
                MdProductAllergy::create($product_allergy);
            }
        }

        if ($data["product_diets"] != []) {
            foreach($data["product_diets"] as $product_diet){
                $product_diet["md_product_id"] = $md_product_id;
                MdProductDiet::create($product_diet);
            }
        }


        $data = MdProduct::with([
            'client',
            "base_unit",
            "unit_conversions.uom_to_details",
            'product_branch.branch',
            'product_brand.brand',
            'product_product_category.product_category',
            'product_details',
            'product_modifier.modifier',
            'product_diet.diet',
            'product_allergy.allergy',
        ])->where('md_product_id', $md_product_id)->get();

        return response()->json(['data' => $data]);

    }

    public function product_types(){
        return response()->json(["product_types"=>array_values($this->product_types)], 200);
    }
    /**
     * Display the specified resource.
     */
    public function show(MdProduct $mdProduct)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public static function edit($id)
    {
        //
        // return 1;
        $data = MdProduct::with([
            'client',
            "base_unit",
            "unit_conversions.uom_to_details",
            'product_brand',
            'product_branch',
            'product_product_category',
            'station_product',
            'product_diet',
            'product_allergy',
            'product_details',
            'product_modifier',
        ])
        ->find($id);
        return response()->json($data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        //
        $data =  MdProduct::find($id);
        $data->product_code = $request->input('product_code');
        $data->product_name = $request->input('product_name');
        $data->product_price = $request->input('product_price');
        $data->deleting_method = $request->input('deleting_method');
        $data->total_weight = $request->input('total_weight');

        $data->barcode = $request->input('barcode');
        $data->maximun_day_of_product_return = $request->input('maximun_day_of_product_return');
        $data->cooking_time = $request->input('cooking_time');
        $data->description = $request->input('description');
        // $data->md_allergy_id = $request->input('md_allergy_id');
        // $data->md_diet_id = $request->input('md_diet_id');
        $data->gift = $request->input('gift');
        $data->portion = $request->input('portion');
        $data->bundle = $request->input('bundle');
        $data->not_allow_apply_discount = $request->input('not_allow_apply_discount');
        $data->sold_by_weight = $request->input('sold_by_weight');
        $data->sale_price = $request->input('sale_price');
        // $data->md_product_category_id = $request->input('md_product_category_id');
        $data->td_tax_category_id = $request->input('td_tax_category_id');
        $data->cd_client_id = $request->input('cd_client_id');
        // $data->cd_brand_id = $request->input('cd_brand_id');
        // $data->cd_branch_id = $request->input('cd_branch_id');
        $data->md_uom_id = $request->input('md_uom_id');
        $data->is_active = $request->input('is_active', '1');
        $data->created_by = $request->input('created_by');
        $data->updated_by = $request->input('updated_by');

        if ($image = $request->file('product_image')) {
            $destinationPath = public_path('img/product_image/');
            $profileImage = date('YmdHis') . "." . $image->getClientOriginalExtension();
            $image->move($destinationPath, $profileImage);
            $data->product_image = $profileImage;
        }
        $data->save();



        $product_details = $request->input('product_details');
        $product_modifiers = $request->input('product_modifiers');
        $product_brands = $request->input('product_brand');
        $product_branches = $request->input('product_branch');
        $product_categories = $request->input('product_category');
        $product_allergies = $request->input('product_allergy');
        $product_diets = $request->input('product_diet');

        $product_details_delete = MdProductDetail::where('md_product_id', $id)->delete();
        $product_modifiers_delete = MdProductModifier::where('md_product_id', $id)->delete();
        $product_brands_delete = MdProductBrand::where('md_product_id', $id)->delete();
        $product_branches_delete = MdProductBranch::where('md_product_id', $id)->delete();
        // $product_categories_delete = MdProductCategory::where('md_product_id', $id)->delete();
        $product_categories_delete = MdProductProductCategory::where('md_product_id', $id)->delete();
        $product_allergies_delete = MdProductAllergy::where('md_product_id', $id)->delete();
        $product_diets_delete = MdProductDiet::where('md_product_id', $id)->delete();


        // MdProductUnit::where("md_product_id", $id)->where("type","unit")->delete();
        // MdProductUnit::create([
        //     "cd_client_id"=> $request->input('cd_client_id'),
        //     // "cd_brand_id"=> $request->input('cd_brand_id'),
        //     // "cd_branch_id"=> $request->input('cd_branch_id'),
        //     "md_product_id"=> $id,
        //     "md_uom_id"=>  $request->input('md_uom_id'),
        //     "is_active" => 1,
        //     "created_by" => $request->input('created_by'),
        //     "updated_by" => $request->input('updated_by'),
        // ]);

        if ($product_details) {
            foreach($product_details as $item){
                $cdata = new MdProductDetail();
                 $cdata->md_product_id = $id;
                 $cdata->md_detail_id = $item['md_detail_id'];
                 $cdata->product_type = $item['product_type'];
                 $cdata->gross = $item['gross'];
                 $cdata->cost = $item['cost'];
                 $cdata->save();
            }
        }

        if ($product_modifiers) {
            foreach($product_modifiers as $product_modifier){
                $modifierData = new MdProductModifier();
                 $modifierData->md_product_id = $id;
                 $modifierData->md_modifier_id = $product_modifier['md_modifier_id'];
                 $modifierData->save();
            }
        }

        if ($product_brands) {
            foreach($product_brands as $product_brand){
                $brandData = new MdProductBrand();
                 $brandData->md_product_id = $id;
                 $brandData->cd_brand_id = $product_brand['cd_brands'];
                 $brandData->save();
            }
        }

        if ($product_branches) {
            foreach($product_branches as $product_branch){
                $branchData = new MdProductBranch();
                 $branchData->md_product_id = $id;
                 $branchData->cd_branch_id = $product_branch['cd_branches'];
                 $branchData->save();
            }
        }

        if ($product_categories) {
            foreach($product_categories as $product_category){
                $productCategoryData = new MdProductProductCategory();
                 $productCategoryData->md_product_id = $id;
                 $productCategoryData->md_product_category_id = $product_category['md_product_categories'];
                 $productCategoryData->save();
            }
        }

        if ($product_allergies) {
            foreach($product_allergies as $product_allergy){
                $allergyData = new MdProductAllergy();
                 $allergyData->md_product_id = $id;
                 $allergyData->md_allergy_id = $product_allergy['md_allergies'];
                 $allergyData->save();
            }
        }

        if ($product_diets) {
            foreach($product_diets as $product_diet){
                $dietData = new MdProductDiet();
                 $dietData->md_product_id = $id;
                 $dietData->md_diet_id = $product_diet['md_diets'];
                 $dietData->save();
            }
        }

        // $data = MdProduct::with('client' , 'product_branch.branch','product_brand.brand','product_product_category.product_category','product_details','product_modifier.modifier','product_diet.diet','product_allergy.allergy')->where('md_product_id',$id)->get();
        // return response()->json(['data'=>$data]);

        $data = MdProduct::with([
            "base_unit.conversion",
            'client',
            'product_branch.branch',
            'product_brand.brand',
            'product_product_category.product_category',
            'product_details',
            'product_modifier.modifier',
            'product_diet.diet',
            'product_allergy.allergy',
        ])->where('md_product_id', $id)->get();

          return response()->json(['data' => $data]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //
        $data = MdProduct::find($id);
        $data->delete();
        return response()->json($data);
    }
}
