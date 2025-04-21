import { useState } from "react"

import axios from "axios"
import { useNavigate } from "react-router";

export default function CreatePost() {

    const [products, setProducts] = useState([]);
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [price, setPrice] = useState();
    const [quantity, setQuantity] = useState();

    const navigate = useNavigate();







   



    const handleAdd = async (e) => {
        e.preventDefault();
        if (!name || !description || !price || !quantity) return;

        try {
            const newProduct = { name, description, price, quantity };
            await axios.post("http://127.0.0.1:8000/api/products", newProduct);
            setName("");
            setPrice("");
            setDescription("");
            setQuantity("");


            // Message de succès
            alert("Produit enregistré avec succès");

            // Recharger la page (option 1)
            window.location.reload();

            navigate('/');

        } catch (err) {
            console.error("Erreur lors de l'ajout :", err.response.data
            );
        }

    };



    return (

        <>


            <div className="container mb-5">

                <h2 className="text-center pt-5">Créez votre Produits</h2>

                <div className="mb-3 pt-5">
                    <label className="form-label">Nom du Produits</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" onChange={e => setName(e.target.value)} />
                </div>

                <div className="mb-3 pt-2">
                    <label className="form-label">Prix du Produits</label>
                    <input type="number" className="form-control" id="exampleFormControlInput1" onChange={e => setPrice(e.target.value)} />
                </div>
                <div className="mb-3 pt-2">
                    <label className="form-label">Quantités du Produits</label>
                    <input type="number" className="form-control" id="exampleFormControlInput1" onChange={e => setQuantity(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Description du Produits</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={e => setDescription(e.target.value)} ></textarea>
                </div>
                <button type="submit" className="btn btn-primary mt-1 w-100" onClick={handleAdd}>Enregistrez Produit</button>


            </div>
        </>
    )

}