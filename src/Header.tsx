import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"; // New CSS file for header styles

const Header: React.FC = () => {
  return (
    <header className="main-header">
      <div className="logo">
        <Link to="/">
          {/* Logo image next to text */}
          <img src="/images/logo.png" alt="Green Melb Logo" className="logo-image" />
          
        </Link>
      </div>
      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/IdentifyWaste">Identify waste</Link>
          </li>
          <li>
            <Link to="/MapPage">Recycling centers</Link>
          </li>
          <li>
            <Link to="/PreventWaste">Prevent Waste</Link>
          </li>
          <li>
            <Link to="/CompostingTips">Composting Tips</Link>
          </li>
          <li>
            <Link to="/PlantRecommendation">Plant Recommendation</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
