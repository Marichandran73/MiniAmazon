import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: 'Mobiles' },
    { label: 'Fashion', to: "/product/Women'sSaree" },
    { label: 'Electronics' },
    { label: 'Home & Kitchen' },
    { label: 'Appliances' },
    { label: 'Books', to: "/product/OpenBook" },
    { label: 'Beauty' },
    { label: 'Toy', to: "/product/ToySet" },
    { label: 'Watches' },
    { label: 'Shoes', to: "/product/Men'sShoes" },
    { label: 'Computers' },
    { label: 'Sports', to: "/product/" },
    { label: 'Gift Ideas' },
    { label: 'Amazon Pay' },
  ];

  return (
    <>
      <div className="header-bar">
        <div className="hamburger-icon" onClick={() => setMenuOpen(!menuOpen)}>
          <FaBars /> All
        </div>
        <div className="header-links">
          {links.map(({ label, to }, index) => (
            to ? (
              <Link key={index} className="sub-link" to={to}>{label}</Link>
            ) : (
              <div key={index} className="sub-link">{label}</div>
            )
          ))}
        </div>
      </div>

      {/* Side Drawer for small screens */}
      {menuOpen && (
        <div className="side-menu">
          <button className="close-btn" onClick={() => setMenuOpen(false)}>✖</button>
          {links.map(({ label, to }, index) => (
            to ? (
              <Link key={index} className="side-link" to={to} onClick={() => setMenuOpen(false)}>{label}</Link>
            ) : (
              <div key={index} className="side-link">{label}</div>
            )
          ))}
        </div>
      )}
    </>
  );
};

export default Header;
