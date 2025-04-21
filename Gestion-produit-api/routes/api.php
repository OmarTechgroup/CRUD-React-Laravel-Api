<?php

use App\Http\Controllers\ApiGes\gestioncontroller;
use App\Models\products;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/products',[gestioncontroller::class,'index']);//lister tous produits
Route::get('/products/{id}',[gestioncontroller::class,'show']);//Afficher un produits précis par ID
Route::post('/products',[gestioncontroller::class,'store']);//Ajouter un nouveau produits
Route::put('/products/{id}',[gestioncontroller::class,'update']);//Modifier un produits existante
Route::delete('/products/{id}',[gestioncontroller::class,'destroy']);//Supprimer un produits existante


//calcul ROUTE

Route::get('/products/total/value',[gestioncontroller::class,'totalStockValue']);//la valeur total du stock
Route::get('/products-count',[gestioncontroller::class,'countproducts']);//le nombre total de produits
Route::get('/products/average/price',[gestioncontroller::class,'average']);//la moyenne des prix des produits

