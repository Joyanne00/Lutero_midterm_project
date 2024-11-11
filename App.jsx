import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';
import ProductList from './ProductList';
import Navigation from './Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(null); // Track logged in user

  const handleLogin = (userInfo) => {
    setUser(userInfo);  // Set user data when logged in
  };

  const handleLogout = () => {
    setUser(null);  // Log out by clearing user data
  };

  return (
    <Router>
      <Navigation user={user} onLogout={handleLogout} /> {/* Pass user data and logout function */}
      <div>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/edit/:id" element={<EditProduct />} />
          <Route path="/profile" element={<Profile user={user} />} /> {/* Pass user to Profile */}
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
