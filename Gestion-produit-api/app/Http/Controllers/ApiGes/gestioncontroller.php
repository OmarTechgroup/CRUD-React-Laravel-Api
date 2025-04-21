<?php

namespace App\Http\Controllers\ApiGes;

use App\Http\Controllers\Controller;
use App\Models\gestion;
use App\Models\products;
use DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class gestioncontroller extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //liste des produits

        $produit = products::all();

        return response()->json([ 
            'status'=>true,
            'message'=> 'Liste produits recuperé',
            'data'=>$produit
            
            
        ],200);

       

        //return response()->json(gestion::all());

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //AJouter un nouveau produits

        $validator = Validator($request->all(), [
            'name'=> 'required|string|max:255',    
            'description'=> 'required|string',
            'price'=> 'required|int',
            'quantity'=> 'required|int',

        ]);

        if ($validator->fails()) { 
            //Encas d'echec de validation on return les erreur et le status 
            return response()->json([ 
                'status'=>false,
                'message'=> 'validation error',
                'errors'=>$validator->errors()
            ],422);
        }

        //creation du produits


       

        products::create([
            "name" => $request -> name,
            "description"=> $request -> description,
            "price"=> $request -> price,
            "quantity"=> $request ->quantity

        ]);
       
       return response()->json(["message" => 'produits created successfully'],status:201); // 201 = created

}

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //rechercher le produits par id ou echoue si non trouve

        $products = products::findOrFail( $id );
        return response()->json([
            'status'=>true,
            'message'=>"products found successfully",
            'data'=>$products
        ],200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //mise a jour du produits 

        $validator = Validator($request->all(), [
            'name'=> 'sometimes|string|max:255',    
            'description'=> 'sometimes|string',
            'price'=> 'sometimes|numeric',
            'quantity'=> 'sometimes|integer',

        ]);

        if ($validator->fails()) { 
            //Encas d'echec de validation on return les erreur et le status 
            return response()->json([ 
                'status'=>false,
                'message'=> 'validation error',
                'errors'=>$validator->errors()
            ],422);
        }
        //rechercher du produits 
        $product = products::findOrFail( $id );
        //mise a jour du produits dasn le stock
        $product->update($request->all());
        return response()->json([
            'status'=>true,
            'message'=> 'products updated successfully'],200);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //Supprimer un produits du stock 
        $product = products::findOrFail( $id );
        $product->delete();

        return response()->json([  
            'status'=>true,
            'message'=> ' products Deleted successfully'
            ],204);
    }



    public function totalStockValue(){//calcul la somme total du stock

        //avec la methode [DB] && [RAW] permet de multiplier le prix par la quantite dans chque ligne

        $tottalValue = products::sum(DB::raw('price * quantity'));

        //return le resultat 

        return response()->json([
            'total_stock_value' => $tottalValue]);
    }

    public function countproducts(){//calcul ala somme total des produits

        //la methode count() du model products permet ontenir le nombre total d'enregistrements dans la table
        $total = products::count();

        //return le resultat
        return response()->json([
            'total_products'=> $total]);

    }


    public function average(){

        //la methode Average() du permet calculer la moyenne de la colone [price]

        $average = products::average('price');
        //return le resultat arrondi a 2 decimale
        return response()->json([
            'average_price'=> round($average,2)]);

    
}
}
