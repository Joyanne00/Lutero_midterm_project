import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function Navigation() {
  return (
    <nav className="text-center" style={{ backgroundColor: '#DEAC80', padding: '10px' }}>
      <div className="d-grid gap-2 d-md-flex justify-content-md-center">
        <Button as={Link} to="/" variant="light" style={{ color: '#914F1E' }}>
          Product List
        </Button>
        <Button as={Link} to="/add" variant="light" style={{ color: '#914F1E' }}>
          Add Product
        </Button>
        {/* Add an example edit product link (change 'productId' accordingly) */}
        <Button as={Link} to="/edit/:id" variant="light" style={{ color: '#914F1E' }}>
          Edit Product
        </Button>
      </div>
    </nav>
  );
}

export default Navigation;
