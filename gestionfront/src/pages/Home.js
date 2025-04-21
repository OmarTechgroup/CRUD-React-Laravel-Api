import { useEffect, useState } from "react";
import axios from "axios"; 
import EditProductModal from "../components/editProductModal";


export default function Home() {

    const [products, setProducts] = useState([]);
    const [productToEdit, setProductToEdit] = useState();




    // Charger les produits 
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/products')
            .then((res) => { return res.json() })
            .then((data) => { (setProducts(data.data)) })
    }, []);
    console.log(products);

    const handleEditClick = (product) => {
      setProductToEdit({ ...product }); // on clone pour modifier sans toucher l'original
    };
    
    const handleEditChange = (e) => {
      const { name, value } = e.target;
      setProductToEdit((prev) => ({ ...prev, [name]: value }));
    };
    
    const handleSave = async (e) => {
      e.preventDefault();
      try {
        await axios.put(`http://127.0.0.1:8000/api/products/${productToEdit.id}`, productToEdit);
        setProducts((prev) =>
          prev.map((p) => (p.id === productToEdit.id ? productToEdit : p))
        );
        setProductToEdit(null);
      } catch (err) {
        console.error("Erreur lors de la modification :", err);
      }
    };
    
    const closeModal = () => setProductToEdit(null);
    



    const handleDelete = async (id) => {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/products/${id}`);
        // Mise à jour en temps réel :
        setProducts(products.filter((product) => product.id !== id));
      } catch (err) {
        console.error("Erreur lors de la suppression :", err);
      }
    };
    
    return(

        <>
              <h1 className="text-2xl font-bold mt-4 mb-4 text-center">Liste des Produits</h1>



<table className='table'>
  <thead>

    <tr>
      <th scope="col">ID</th>
      <th scope="col">Nom produit</th>
      <th scope="col">Description</th>
      <th scope="col">Quantité</th>
      <th scope="col">Prix</th>
      <th scope="col">Action</th>
    </tr>
  </thead>

  <tbody>
    {products.map((product) => (
      <tr key={product.id}>
        <td>{product.id}</td>
        <td>{product.name}</td>
        <td>{product.description}</td>
        <td>{product.price}</td>
        <td>{product.quantity}</td>

        <td>
          <button className="btn btn-primary mx-2" onClick={() => handleEditClick(product)}   >Modifier</button>
          <button className="btn btn-danger mt-1" onClick={() => handleDelete(product.id)} >Supprimer</button>
        </td>

      </tr>

    ))};
  </tbody>
</table>

<EditProductModal
      product={productToEdit}
      onChange={handleEditChange}
      onClose={closeModal}
      onSave={handleSave}
    />
        </>
    )
    
}