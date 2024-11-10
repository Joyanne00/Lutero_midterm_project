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
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    th: {
      backgroundColor: '#914F1E',
      color: 'white',
      padding: '10px',
    },
    td: {
      padding: '10px',
      borderBottom: '1px solid #ddd',
    },
    clearButton: {
      backgroundColor: '#7f8991',
      borderColor: '#6C757D',
      color: 'white',
      padding: '5px 10px',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    link: {
      marginRight: '10px',
      color: '#007bff',
      textDecoration: 'none',
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
        setProducts(products.filter((product) => product._id !== id));
        alert('Product deleted successfully!');
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Product List</h2>
      <table className="table" style={styles.table}>
        <thead>
          <tr>
            <th scope="col" style={styles.th}>#</th>
            <th scope="col" style={styles.th}>Product Code</th>
            <th scope="col" style={styles.th}>Name</th>
            <th scope="col" style={styles.th}>Description</th>
            <th scope="col" style={styles.th}>Price</th>
            <th scope="col" style={styles.th}>Quantity</th>
            <th scope="col" style={styles.th}>Date Added</th>
            <th scope="col" style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product._id}>
              <th scope="row" style={styles.td}>{index + 1}</th>
              <td style={styles.td}>{product.product_code ? product.product_code : 'N/A'}</td>
              <td style={styles.td}>{product.name}</td>
              <td style={styles.td}>{product.description}</td>
              <td style={styles.td}>{product.price}</td>
              <td style={styles.td}>{product.qty ? product.qty : 'N/A'}</td>
              <td style={styles.td}>
                {product.date_added ? new Date(product.date_added).toLocaleDateString() : 'No Date Available'}
              </td>
              <td style={styles.td}>
                <Link to={`/edit/${product._id}`} style={styles.link}>Edit</Link>
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
