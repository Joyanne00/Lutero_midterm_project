import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  // CSS styles
  const styles = {
    container: {
      padding: '20px',
      backgroundColor: '#F7DCB9',
      borderRadius: '10px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
    header: {
      color: '#914F1E',
      marginBottom: '20px',
    },
    button: {
      backgroundColor: '#28A745',
      borderColor: '#28A745',
      marginRight: '10px',
      color: 'white', // Button text color
      padding: '5px 10px', // Add some padding for button appearance
      borderRadius: '5px', // Round the button edges
    },
    clearButton: {
      backgroundColor: '#7f8991',
      borderColor: '#6C757D',
      color: 'white', // Clear button text color
      padding: '5px 10px', // Add some padding for button appearance
      borderRadius: '5px', // Round the button edges
    },
    editLink: {
      color: '#007BFF', // Default link color
      textDecoration: 'none', // Remove underline
      marginRight: '10px', // Add some margin
    },
  };

  // Fetch the list of products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Handle product deletion
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (confirmDelete) {
      try {
        await fetch(`http://localhost:5000/api/products/${id}`, {
          method: 'DELETE',
        });
        setProducts(products.filter((product) => product._id !== id)); // Update the list after deletion
        alert('Product deleted successfully!');
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Product List</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Product Code</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Date Added</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product._id}>
              <th scope="row">{index + 1}</th> {/* Display the index as the row number */}
              <td>{product.product_code}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.qty}</td>
              <td>{new Date(product.date_added).toLocaleDateString()}</td>
              <td>
                <Link to={`/edit/${product._id}`} style={styles.editLink}>Edit</Link>
                <button onClick={() => handleDelete(product._id)} style={styles.clearButton}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;