// Navigation.jsx
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <Link to="/">Product List</Link>
      <Link to="/add">Add Product</Link>
      <Link to="/edit">Edit Product</Link>
    </nav>
  );
}

export default Navigation; // Export the Navigation component
