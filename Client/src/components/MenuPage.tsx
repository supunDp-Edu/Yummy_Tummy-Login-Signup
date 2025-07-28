import React from "react";
import { Link } from "react-router-dom";
import "../Assets/Menu.css";
import riceIcon from "../Assets/rice.jpg";
import noodlesIcon from "../Assets/noodles.jpg";
import kottuIcon from "../Assets/kottu.jpg";
import juiceIcon from "../Assets/juice.jpg";

const MenuPage: React.FC = () => {
  return (
    <div className="menu-page">
      <h1 className="menu-title">YUMMY TUMMY MENU</h1>

      <div className="category-grid">
        {/* Rice Category Card */}
        <div className="category-card">
          <img src={riceIcon} alt="Rice" className="category-image" />
          <h3>Rice Dishes</h3>
          <Link to="/menu/rice" className="view-menu-btn">
            View Menu
          </Link>
        </div>

        {/* Noodles Category Card */}
        <div className="category-card">
          <img src={noodlesIcon} alt="Noodles" className="category-image" />
          <h3>Noodles</h3>
          <Link to="/menu/noodles" className="view-menu-btn">
            View Menu
          </Link>
        </div>

        {/* Kottu Category Card */}
        <div className="category-card">
          <img src={kottuIcon} alt="Kottu" className="category-image" />
          <h3>Kottu</h3>
          <Link to="/menu/kottu" className="view-menu-btn">
            View Menu
          </Link>
        </div>

        {/* Beverages Category Card */}
        <div className="category-card">
          <img src={juiceIcon} alt="Beverages" className="category-image" />
          <h3>Beverages</h3>
          <Link to="/menu/beverages" className="view-menu-btn">
            View Menu
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
