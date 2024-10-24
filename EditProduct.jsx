// EditProduct.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditProduct = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const navigate = useNavigate(); // For navigation after editing
  const [product, setProduct] = useState({
    product_code: '',
    name: '',
    description: '',
    price: '',
    qty: '',
    date_added: '',
  });

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        alert('Product updated successfully!');
        navigate('/'); // Redirect to the product list after successful update
      } else {
        alert('Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={product.product_code}
          onChange={(e) => setProduct({ ...product, product_code: e.target.value })}
          placeholder="Product Code"
          required
        />
        <input
          type="text"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          placeholder="Name"
          required
        />
        <input
          type="text"
          value={product.description}
          onChange={(e) => setProduct({ ...product, description: e.target.value })}
          placeholder="Description"
          required
        />
        <input
          type="number"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) })}
          placeholder="Price"
          required
        />
        <input
          type="number"
          value={product.qty}
          onChange={(e) => setProduct({ ...product, qty: parseInt(e.target.value) })}
          placeholder="Quantity"
          required
        />
        <input
          type="date"
          value={product.date_added.split('T')[0]} // Extract date part
          onChange={(e) => setProduct({ ...product, date_added: e.target.value })}
          required
        />
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;
