import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function Navigation() {
  return (
    <nav className="text-center" style={{ backgroundColor: '#DEAC80', padding: '10px' }}>
      <div className="d-grid gap-2 d-md-flex justify-content-md-center">
        {/* Add Product Button */}
        <Button as={Link} to="/add" variant="light" style={{ color: '#914F1E' }}>
          Add Product
        </Button>
        
        {/* Product List Button */}
        <Button as={Link} to="/" variant="light" style={{ color: '#914F1E' }}>
          Product List
        </Button>

        {/* Edit Product Button (Note: This is just a placeholder, it doesn't work as is) */}
        <Button as={Link} to="/edit/:id" variant="light" style={{ color: '#914F1E' }}>
          Edit Product
        </Button>

        {/* Profile Button */}
        <Button as={Link} to="/profile" variant="light" style={{ color: '#914F1E' }}>
          Profile
        </Button>

        {/* Login Button */}
        <Button as={Link} to="/login" variant="light" style={{ color: '#914F1E' }}>
          Login
        </Button>

        {/* Signup Button */}
        <Button as={Link} to="/signup" variant="light" style={{ color: '#914F1E' }}>
          Sign Up
        </Button>
      </div>
    </nav>
  );
}

export default Navigation;
