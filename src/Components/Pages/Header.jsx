import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    
    { label: 'Fashion', to: "/product/Women'sSaree" },
    { label: 'Electronics', to: "/product/AirConditioner" },
    { label: 'Appliances', to: "/product/WashingMachine" },
    { label: 'Books', to: "/product/OpenBook" },
    { label: 'Beauty', to: "/product/Women'sSaree" },
    { label: 'Toy', to: "/product/ToySet" },
    { label: 'MenWears', to:"/product/Men'sJeans" },
    { label: 'Shoes', to: "/product/Men'sShoes" },
  ];

  return (
    <>
      <div className="header-bar">
        <div className="hamburger-icon" onClick={() => setMenuOpen(!menuOpen)}>
          <FaBars /> 
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
