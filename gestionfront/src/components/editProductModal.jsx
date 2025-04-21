import React from "react";

export default function EditProductModal({ product, onChange, onClose, onSave }) {
  if (!product) return null;

  return (
    
    <div className="mb-5">
      <div className="container ">
        <h2 className="text-center pt-5">Modifier le produit</h2>
        <form onSubmit={onSave}>
          <div className="pt-5">
          <label className="">Nom du Produits</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={onChange}
            placeholder="Nom"
            className="form-control mt-4"
          />
          </div> 

          <div className="pt-3"> 
          <label >Prix</label>

          <input
            type="number"
            name="price"
            value={product.price}
            onChange={onChange}
            placeholder="Prix"
            className="form-control mt-2"
          />
          </div>
          
          <div className="pt-3">
          <label >Quantité du produits</label>

          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={onChange}
            placeholder="Quantité"
            className="form-control mt-2"
          />
          </div>


          <div className="pt-3">
          <label className="">Description du produits</label>

          <textarea
            name="description"
            value={product.description}
            onChange={onChange}
            placeholder="Description"
            className="form-control mt-2"
          />
          </div>
          
          <div className="d-flex justify-content-center  mt-5">
            <button type="button" onClick={onClose} className="btn btn-secondary mx-5 btn-lg">
              Annuler
            </button>
            <button type="submit" className="btn btn-primary mx-5 btn-lg ">
              Enregistrer
            </button>
          </div>
        </form>
      </div>
      </div>
  
  );
}
