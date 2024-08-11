import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Admin from './components/Admin';
import Signup from './components/Signup';
import Login from './components/Login';
import About from './components/AboutUs';
import Cart from './components/Cart';
import NavBar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import YourProperty from './components/YourProperty';
import PropertyList from './components/PropertyList';
import {jwtDecode} from 'jwt-decode'; // Import correctly without curly braces
import { fetchUserDetails } from './services/api';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState(''); // Use camelCase for variable names
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          const decoded = jwtDecode(token);
          const currentTime = Date.now() / 1000;

          if (decoded.exp < currentTime) {
            handleLogout();
          } else {
            setIsAuthenticated(true);
            // Fetch user details if the token is valid
            const user = await fetchUserDetails();
            setUsername(user.username); // Set the username
            if (user.role === 'admin') {
              setIsAdmin(true);
            }
          }
        } catch (error) {
          console.error('Error decoding token:', error);
          handleLogout();
        }
      }
      setLoading(false);
    };

    checkToken();
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    window.location.href = '/';
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Router>
        <NavBar 
          isAuthenticated={isAuthenticated} 
          isAdmin={isAdmin} 
          handleLogout={handleLogout} 
          username={username} // Pass the username to NavBar
        />
        <Routes>
          <Route path="/" element={<Home isAdmin={isAdmin} isAuthenticated={isAuthenticated}/>} />
          <Route path="/admin" element={isAuthenticated && isAdmin ? <Admin /> : <Navigate to="/login" />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login setIsAuthenticated={setIsAuthenticated}/>} />
          <Route path="/signup" element={isAuthenticated ? <Navigate to="/" /> : <Signup />} />
          <Route path="/about" element={<About/>} />
          <Route path="/cart" element={isAuthenticated ? <Cart /> : <Navigate to="/login" />} />
          <Route path="/property" element={isAuthenticated ? <YourProperty /> : <Navigate to="/login" />} />
          <Route path="/properties" element={<PropertyList isAdmin={isAdmin}  />}/> 
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
