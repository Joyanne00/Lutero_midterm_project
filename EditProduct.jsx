import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditProduct = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const navigate = useNavigate(); // To navigate after editing
  const [product, setProduct] = useState({
    product_code: '',
    name: '',
    description: '', // Add description field
    price: '',
    qty: '',
    date_added: new Date(), // Initialize with the current date
  });

  // Fetch the product data when the component mounts
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!response.ok) throw new Error('Failed to fetch product');
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

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
      if (!response.ok) throw new Error('Failed to update product');
      alert('Product updated successfully!');
      navigate('/'); // Redirect to the product list after updating
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Error saving product. Please try again.');
    }
  };

  // CSS styles
  const styles = {
    container: {
      margin: '0 auto',
      maxWidth: '600px',
      backgroundColor: '#F7DCB9', // Match background color with ProductList
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
    header: {
      marginBottom: '20px',
      textAlign: 'center',
      color: '#914F1E', // Match header color with ProductList
    },
    input: {
      borderRadius: '4px',
      border: '1px solid #ced4da',
      padding: '10px',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#007bff',
      borderColor: '#007bff',
      borderRadius: '4px',
    },
  };

  return (
    <form onSubmit={handleSubmit} style={styles.container}>
      <h3 style={styles.header}>Edit Product</h3>

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
            style={styles.input}
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
            style={styles.input}
          />
        </div>
      </div>

      <div className="row mb-3">
        <label htmlFor="productDescription" className="col-sm-2 col-form-label">Description</label>
        <div className="col-sm-10">
          <textarea
            className="form-control"
            id="productDescription"
            name="description" // Add name for description
            value={product.description}
            onChange={handleChange}
            required
            style={styles.input}
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
            style={styles.input}
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
            style={styles.input}
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
            value={new Date(product.date_added).toISOString().split('T')[0]} // Format date as YYYY-MM-DD
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-sm-10 offset-sm-2">
          <button
            type="submit"
            className="btn btn-primary"
            style={styles.button}
          >
            Update Product
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditProduct;
