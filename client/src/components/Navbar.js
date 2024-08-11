import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../css/Navbar.css'; // Import custom CSS file

const NavBar = ({ isAuthenticated, isAdmin, handleLogout, username }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="navbar-custom">
      <Navbar.Brand as={Link} to="/" className="navbar-brand">
        AAVAS VIKAS
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/" className="nav-link">Home</Nav.Link>
          <Nav.Link as={Link} to="/property" className="nav-link">Your Property</Nav.Link>
          {isAuthenticated && (
            <>
              <Nav.Link as={Link} to="/cart" className="nav-link">Cart</Nav.Link>
              {isAdmin && (
                <>
            <Nav.Link as={Link} to="/properties" className="nav-link">Submissions</Nav.Link>
                <Nav.Link as={Link} to="/admin" className="nav-link">Admin</Nav.Link>
                </>
              )}
            </>
          )}
          <Nav.Link as={Link} to="/about" className="nav-link">About</Nav.Link>

          {!isAuthenticated && (
            <>
              <Nav.Link as={Link} to="/signup" className="nav-link">Signup</Nav.Link>
              <Nav.Link as={Link} to="/login" className="nav-link">Login</Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
      {isAuthenticated && (
        <div className="d-flex align-items-center ml-auto">
          <Navbar.Text className="text-light mr-3">
            Welcome, {username}
          </Navbar.Text>
          <Button variant="outline-light" onClick={handleLogout} className="button-logout">Logout</Button>
        </div>
      )}
    </Navbar>
  );
};

export default NavBar;
