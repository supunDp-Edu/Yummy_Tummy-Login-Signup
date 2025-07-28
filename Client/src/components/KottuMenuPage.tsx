import React from "react";
import "../Assets/Menu.css";
import chickenKottuImage from "../Assets/chicken kottu.jpg";
import eggKottuImage from "../Assets/egg kottu.jpg";
import cheeseKottuImage from "../Assets/cheese kottu.jpg";
import vegetableKottuImage from "../Assets/vege kottu.jpg";
import { Link } from "react-router-dom";

const KottuMenuPage: React.FC = () => {
  return (
    <div className="menu-page">
      <h1 className="menu-title">YUMMY TUMMY MENU - Kottu</h1>
      <div className="menu-grid">
        <div className="menu-card">
          <img
            src={chickenKottuImage}
            alt="Chicken Kottu"
            className="menu-card-image"
          />
          <h2 className="menu-name">Chicken Kottu</h2>
          <p className="menu-description">
            Spicy and flavorful chicken kottu made with roti, eggs, vegetables,
            and tender chicken.
          </p>
          <p className="price">$4</p>
          <Link to="/customize/kottu/chicken" className="customize-btn">
            Customize
          </Link>
        </div>

        <div className="menu-card">
          <img
            src={eggKottuImage}
            alt="Egg Kottu"
            className="menu-card-image"
          />
          <h2 className="menu-name">Egg Kottu</h2>
          <p className="menu-description">
            A delicious and flavorful egg kottu made with roti, eggs,
            vegetables, and tender chicken.
          </p>
          <p className="price">$3</p>
          <Link to="/customize/kottu/egg" className="customize-btn">
            Customize
          </Link>
        </div>

        <div className="menu-card">
          <img
            src={cheeseKottuImage}
            alt="Cheese Kottu"
            className="menu-card-image"
          />
          <h2 className="menu-name">Cheese Kottu</h2>
          <p className="menu-description">
            A delicious and flavorful cheese kottu made with roti, eggs,
            vegetables, and tender chicken.
          </p>
          <p className="price">$4</p>
          <Link to="/customize/kottu/cheese" className="customize-btn">
            Customize
          </Link>
        </div>

        <div className="menu-card">
          <img
            src={vegetableKottuImage}
            alt="Vegetable Kottu"
            className="menu-card-image"
          />
          <h2 className="menu-name">Vegetable Kottu</h2>
          <p className="menu-description">
            A delicious and flavorful vegetable kottu made with roti and
            vegetables.
          </p>
          <p className="price">$3.50</p>
          <Link to="/customize/kottu/vegetable" className="customize-btn">
            Customize
          </Link>
        </div>
      </div>
    </div>
  );
};

export default KottuMenuPage;
