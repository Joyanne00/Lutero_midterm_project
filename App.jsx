import './App.css'; // Import CSS styles
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import routing components
import AddProduct from './AddProduct'; // Import AddProduct component
import EditProduct from './EditProduct'; // Import EditProduct component
import ProductList from './ProductList'; // Import ProductList component
import Navigation from './Navigation'; // Import Navigation component

function App() {
  return (
    <Router>
      <div>
        <Navigation /> {/* Add the Navigation component here */}
        <Routes>
          <Route path="/" element={<ProductList />} /> {/* Route for listing products */}
          <Route path="/add" element={<AddProduct />} /> {/* Route for adding a product */}
          <Route path="/edit/:id" element={<EditProduct />} /> {/* Route for editing a product */}
        </Routes>
      </div>
    </Router>
  );
}

export default App; // Export the main App component
