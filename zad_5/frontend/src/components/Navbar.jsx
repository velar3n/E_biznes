import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/">Products</Link>
        <Link to="/cart">Cart</Link>
      </div>
    </nav>
  );
}; 

export default Navbar;