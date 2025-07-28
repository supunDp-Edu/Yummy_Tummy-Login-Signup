import React from "react";
import { Link } from "react-router-dom";
import "../Assets/Menu.css";
import chickenFriedImg from "../Assets/chicken fried.jpg";
import eggFriedImg from "../Assets/egg fried.jpg";
import vegFriedImg from "../Assets/veg fried.jpg";
import chickenRiceImg from "../Assets/chicken rice.jpg";
import eggRiceImg from "../Assets/egg rice.jpg";
import vegRiceImg from "../Assets/veg rice.jpg";
import fishRiceImg from "../Assets/fish rice.jpg";
import nasiGorengImg from "../Assets/nasigoreng.jpg";
import biriyaniImg from "../Assets/biriyani.jpg";
import mixRiceImg from "../Assets/mix.jpg";

const RiceMenuPage: React.FC = () => {
  return (
    <div className="menu-page">
      <h1 className="menu-title">YUMMY TUMMY MENU - Rice</h1>
      <div className="menu-grid">
        {/* Chicken Fried Rice Card */}
        <div className="menu-card">
          <img
            src={chickenFriedImg}
            alt="Chicken Fried Rice"
            className="menu-card-image"
          />
          <h3>Chicken Fried Rice</h3>
          <p>
            Delicious long-grain rice stir-fried with juicy chicken, vegetables,
            soy sauce, and scrambled eggs.
          </p>
          <p className="price">$5.00</p>
          <Link to="/customize/rice/chicken-fried" className="customize-btn">
            Customize
          </Link>
        </div>

        {/* Egg Fried Rice Card */}
        <div className="menu-card">
          <img
            src={eggFriedImg}
            alt="Egg Fried Rice"
            className="menu-card-image"
          />
          <h3>Egg Fried Rice</h3>
          <p>
            Classic stir-fried rice with fluffy scrambled eggs and fresh spring
            onions.
          </p>
          <p className="price">$4.00</p>
          <Link to="/customize/rice/egg-fried" className="customize-btn">
            Customize
          </Link>
        </div>

        {/* Vegetable Fried Rice Card */}
        <div className="menu-card">
          <img
            src={vegFriedImg}
            alt="Vegetable Fried Rice"
            className="menu-card-image"
          />
          <h3>Vegetable Fried Rice</h3>
          <p>
            Wholesome fried rice with colorful mixed veggies, light soy sauce,
            and herbs.
          </p>
          <p className="price">$4.00</p>
          <Link to="/customize/rice/vegetable-fried" className="customize-btn">
            Customize
          </Link>
        </div>
        {/* Rice & Curry (Chicken) */}
        <div className="menu-card">
          <img
            src={chickenRiceImg}
            alt="Rice & Curry (Chicken)"
            className="menu-card-image"
          />
          <h3>Rice & Curry (Chicken)</h3>
          <p>
            Steamed rice served with spicy chicken curry, dhal, and seasonal
            veggies.
          </p>
          <p className="price">$4.33</p>
          <Link
            to="/customize/rice/rice-and-curry-chicken"
            className="customize-btn"
          >
            Customize
          </Link>
        </div>

        {/* Rice & Curry (Egg) Card */}
        <div className="menu-card">
          <img
            src={eggRiceImg}
            alt="Rice & Curry (Egg)"
            className="menu-card-image"
          />
          <h3>Rice & Curry (Egg)</h3>
          <p>
            Fluffy steamed rice served with perfectly spiced egg curry and
            seasonal vegetables.
          </p>
          <p className="price">$4.67</p>
          <Link
            to="/customize/rice/rice-and-curry-egg"
            className="customize-btn"
          >
            Customize
          </Link>
        </div>

        {/* Rice & Curry (Vegetable) Card */}
        <div className="menu-card">
          <img
            src={vegRiceImg}
            alt="Rice & Curry (Vegetable)"
            className="menu-card-image"
          />
          <h3>Rice & Curry (Vegetable)</h3>
          <p>
            A wholesome Sri Lankan-style rice plate served with a variety of
            flavorful vegetable curries.
          </p>
          <p className="price">$4.00</p>
          <Link
            to="/customize/rice/rice-and-curry-vegetable"
            className="customize-btn"
          >
            Customize
          </Link>
        </div>

        {/* Rice & Curry (Fish) Card */}
        <div className="menu-card">
          <img
            src={fishRiceImg}
            alt="Rice & Curry Fish"
            className="menu-card-image"
          />
          <h3>Rice & Curry (Fish)</h3>
          <p>
            Steamed rice served with spicy Sri Lankan fish curry, dhal, and
            vegetables.
          </p>
          <p className="price">$4.00</p>
          <Link
            to="/customize/rice/rice-and-curry-fish"
            className="customize-btn"
          >
            Customize
          </Link>
        </div>

        {/* Nasi Goreng Card */}
        <div className="menu-card">
          <img
            src={nasiGorengImg}
            alt="Nasi Goreng"
            className="menu-card-image"
          />
          <h3>Nasi Goreng</h3>
          <p>
            Indonesian-style fried rice with prawns, chicken, vegetables, and a
            fried egg on top.
          </p>
          <p className="price">$3.00</p>
          <Link to="/customize/rice/nasi-goreng" className="customize-btn">
            Customize
          </Link>
        </div>

        {/* Biriyani Card */}
        <div className="menu-card">
          <img src={biriyaniImg} alt="Biriyani" className="menu-card-image" />
          <h3>Biriyani</h3>
          <p>
            Fragrant basmati rice layered with spicy chicken, caramelized
            onions, and boiled egg. A festive delight!
          </p>
          <p className="price">$4.56</p>
          <Link to="/customize/rice/biriyani" className="customize-btn">
            Customize
          </Link>
        </div>

        {/* Mix Rice Card */}
        <div className="menu-card">
          <img src={mixRiceImg} alt="Mix Rice" className="menu-card-image" />
          <h3>Mix Rice</h3>
          <p>
            A flavorful combination of fried rice, devilled chicken,
            cuttlefish,sausages and fried egg.
          </p>
          <p className="price">$3.00</p>
          <Link to="/customize/rice/mix-rice" className="customize-btn">
            Customize
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RiceMenuPage;
