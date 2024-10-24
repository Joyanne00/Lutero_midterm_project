import { Link } from 'react-router-dom';


function Navigation() {
  return (
    <nav className="text-center" style={{ backgroundColor: '#DEAC80', padding: '10px' }}> {/* Adjust background color as needed */}
      <div className="d-grid gap-2 d-md-flex justify-content-md-center">
        <Link to="/" className="btn btn-light me-md-2" style={{ color: '#914F1E' }}>
          Product List
        </Link>
        <Link to="/add" className="btn btn-light" style={{ color: '#914F1E' }}>
          Add Product
        </Link>
      </div>
    </nav>
  );
}

export default Navigation; // Export the Navigation component