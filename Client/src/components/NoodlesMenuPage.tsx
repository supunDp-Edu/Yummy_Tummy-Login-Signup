import React from "react";
import "../Assets/Menu.css";
import chickenNoodlesImg from "../Assets/chickennoodles .jpg";
import eggNoodlesImg from "../Assets/eggnoodles.jpg";
import vegNoodlesImg from "../Assets/vegenoodles.jpg";
import ramenImg from "../Assets/ramen.jpg";
import { Link } from "react-router-dom";

const NoodlesMenuPage: React.FC = () => {
  return (
    <div className="menu-page">
      <h1 className="menu-title">YUMMY TUMMY MENU - Noodles</h1>
      <div className="menu-grid">
        {/* Ramen Card */}
        <div className="menu-card">
          <img src={ramenImg} alt="Ramen" className="menu-card-image" />
          <h3>Ramen</h3>
          <p>
            Japanese-style noodles in rich broth with toppings like egg, meat,
            and vegetables.
          </p>
          <p className="price">$5.00</p>
          <Link to="/customize/noodles/ramen" className="customize-btn">
            Customize
          </Link>
        </div>

        {/* Chicken Noodles Card */}
        <div className="menu-card">
          <img
            src={chickenNoodlesImg}
            alt="Chicken Noodles"
            className="menu-card-image"
          />
          <h3>Chicken Noodles</h3>
          <p>
            Stir-fried noodles with tender chicken pieces, vegetables, and
            savory sauce.
          </p>
          <p className="price">$4.00</p>
          <Link to="/customize/noodles/chicken" className="customize-btn">
            Customize
          </Link>
        </div>

        {/* Egg Noodles Card */}
        <div className="menu-card">
          <img
            src={eggNoodlesImg}
            alt="Egg Noodles"
            className="menu-card-image"
          />
          <h3>Egg Noodles</h3>
          <p>
            Classic stir-fried noodles with scrambled eggs and fresh vegetables.
          </p>
          <p className="price">$3.00</p>
          <Link to="/customize/noodles/egg" className="customize-btn">
            Customize
          </Link>
        </div>

        {/* Vegetable Noodles Card */}
        <div className="menu-card">
          <img
            src={vegNoodlesImg}
            alt="Vegetable Noodles"
            className="menu-card-image"
          />
          <h3>Vegetable Noodles</h3>
          <p>
            Colorful stir-fried noodles with mixed vegetables and light soy
            sauce.
          </p>
          <p className="price">$2.00</p>
          <Link to="/customize/noodles/vegetable" className="customize-btn">
            Customize
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NoodlesMenuPage;
