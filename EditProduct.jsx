import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditProduct = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const navigate = useNavigate(); // To navigate after editing
  const [product, setProduct] = useState({
    product_code: '',
    name: '',
    price: '',
    qty: '',
    date_added: new Date().toISOString().split('T')[0], // Default to today's date
  });
  const [loading, setLoading] = useState(true); // Add loading state

  // Fetch the product data when the component mounts
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();
        
        setProduct({
          product_code: data.product_code || '',
          name: data.name || '',
          price: data.price || '',
          qty: data.qty || '',
          date_added: data.date_added
            ? new Date(data.date_added).toISOString().split('T')[0]
            : new Date().toISOString().split('T')[0], // Default to today if date is missing
        });
      } catch (error) {
        console.error('Error fetching product:', error);
        alert('Error fetching product');
        navigate('/'); // Redirect back to product list if error occurs
      } finally {
        setLoading(false); // Stop loading when done
      }
    };

    fetchProduct();
  }, [id, navigate]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

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

      if (!response.ok) {
        throw new Error('Error updating product');
      }

      alert('Product updated successfully!');
      navigate('/'); // Redirect to the product list after updating
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Error updating product');
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading message while data is being fetched
  }

  return (
    <div>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <label htmlFor="productCode" className="col-sm-2 col-form-label">Product Code</label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="productCode"
              name="product_code"
              value={product.product_code}
              onChange={handleChange}
              required
              placeholder="Product Code"
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="productName" className="col-sm-2 col-form-label">Name</label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="productName"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
              placeholder="Name"
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="productPrice" className="col-sm-2 col-form-label">Price</label>
          <div className="col-sm-10">
            <input
              type="number"
              className="form-control"
              id="productPrice"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
              placeholder="Price"
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="productQty" className="col-sm-2 col-form-label">Quantity</label>
          <div className="col-sm-10">
            <input
              type="number"
              className="form-control"
              id="productQty"
              name="qty"
              value={product.qty}
              onChange={handleChange}
              required
              placeholder="Quantity"
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="dateAdded" className="col-sm-2 col-form-label">Date Added</label>
          <div className="col-sm-10">
            <input
              type="date"
              className="form-control"
              id="dateAdded"
              name="date_added"
              value={product.date_added}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-10 offset-sm-2">
            <button type="submit" className="btn btn-primary">Update Product</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
