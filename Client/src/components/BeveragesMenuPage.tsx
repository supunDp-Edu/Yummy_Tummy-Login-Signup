import React from "react";
import "../Assets/Menu.css";
import teaImage from "../Assets/bubbleTea.jpg";
import CappuccinoImage from "../Assets/Cappuccino.jpg";
import hotChocolateImage from "../Assets/hot choc.jpg";
import mojitoMilkshakesImage from "../Assets/mojito.jpg";
import juicesImage from "../Assets/juices.jpg";
import { Link } from "react-router-dom";

const BeveragesMenuPage: React.FC = () => {
  return (
    <div className="menu-page">
      <h1 className="menu-title">YUMMY TUMMY MENU - Beverages</h1>
      <div className="menu-grid">
        <div className="menu-card">
          <img src={teaImage} alt="Bubble Tea" className="menu-card-image" />
          <h2 className="menu-name">Bubble Tea</h2>
          <p className="menu-description">
            A delicious and flavorful tea made with tea leaves and water.
          </p>
          <p className="price">$1</p>
          <Link to="/customize/beverages/bubble-tea" className="customize-btn">
            Customize
          </Link>
        </div>

        <div className="menu-card">
          <img
            src={CappuccinoImage}
            alt="Cappuccino"
            className="menu-card-image"
          />
          <h2 className="menu-name">Cappuccino</h2>
          <p className="menu-description">
            A delicious and flavorful coffee made with coffee and water.
          </p>
          <p className="price">$1.50</p>
          <Link to="/customize/beverages/cappuccino" className="customize-btn">
            Customize
          </Link>
        </div>

        <div className="menu-card">
          <img
            src={hotChocolateImage}
            alt="Hot Chocolate"
            className="menu-card-image"
          />
          <h2 className="menu-name">Hot Chocolate</h2>
          <p className="menu-description">
            A delicious and flavorful hot chocolate made with chocolate and
            milk.
          </p>
          <p className="price">$2</p>
          <Link
            to="/customize/beverages/hot-chocolate"
            className="customize-btn"
          >
            Customize
          </Link>
        </div>

        <div className="menu-card">
          <img
            src={mojitoMilkshakesImage}
            alt="Mojito"
            className="menu-card-image"
          />
          <h2 className="menu-name">Mojito</h2>
          <p className="menu-description">
            A delicious and flavorful mojito made with mojito and water.
          </p>
          <p className="price">$2</p>
          <Link to="/customize/beverages/mojito" className="customize-btn">
            Customize
          </Link>
        </div>

        <div className="menu-card">
          <img src={juicesImage} alt="Juices" className="menu-card-image" />
          <h2 className="menu-name">Juices</h2>
          <p className="menu-description">
            A delicious and flavorful juices made with juices and water.
          </p>
          <p className="price">$1</p>
          <Link to="/customize/beverages/juices" className="customize-btn">
            Customize
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BeveragesMenuPage;
