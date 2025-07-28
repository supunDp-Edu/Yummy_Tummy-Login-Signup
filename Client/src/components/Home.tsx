import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../Assets/Home.css";
import foodImage from "../Assets/food.jpg";
import riceIcon from "../Assets/rice.jpg";
import noodlesIcon from "../Assets/noodles.jpg";
import kottuIcon from "../Assets/kottu.jpg";
import juiceIcon from "../Assets/juice.jpg";

import riceSlide from "../Assets/rice.jpg";
import kottuSlide from "../Assets/kottu.jpg";
import juicesSlide from "../Assets/juices.jpg";
import foodSlide from "../Assets/food.jpg";

const Home: React.FC = () => {
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return "Good Morning";
    } else if (hour >= 12 && hour < 17) {
      return "Good Afternoon";
    } else {
      return "Good Evening"; // Covers 17–24 and 0–5
    }
  };

  const greeting = getTimeBasedGreeting();

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="home">
      <section className="hero-section">
        <div className="slider-background">
          <Slider {...sliderSettings}>
            <div className="slide-with-caption">
              <img
                src={foodSlide}
                alt="Chef's Specials"
                className="slide-image"
              />
            </div>
            <div className="slide-with-caption">
              <img
                src={riceSlide}
                alt="Rice Specials"
                className="slide-image"
              />
            </div>
            <div className="slide-with-caption">
              <img
                src={kottuSlide}
                alt="Kottu Offers"
                className="slide-image"
              />
            </div>
            <div className="slide-with-caption">
              <img
                src={juicesSlide}
                alt="Juices & Beverages"
                className="slide-image"
              />
            </div>
          </Slider>
        </div>
        <div className="hero-content">
          <h1>{greeting}, Welcome to Yummy Tummy</h1>
          <p>Customize your favorite dishes just the way you like them!</p>
        </div>
      </section>

      <section className="categories">
        <h2>Popular Categories</h2>
        <div className="category-grid">
          <Link to="/menu/rice" className="category-card">
            <img src={riceIcon} alt="Rice" className="category-image" />
            <h3>Rice</h3>
          </Link>
          <Link to="/menu/noodles" className="category-card">
            <img src={noodlesIcon} alt="Noodles" className="category-image" />
            <h3>Noodles</h3>
          </Link>
          <Link to="/menu/kottu" className="category-card">
            <img src={kottuIcon} alt="Kottu" className="category-image" />
            <h3>Kottu</h3>
          </Link>
          <Link to="/menu/beverages" className="category-card">
            <img src={juiceIcon} alt="Beverages" className="category-image" />
            <h3>Beverages</h3>
          </Link>
        </div>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <h3>1. Choose</h3>
            <p>Select your favorite dish</p>
          </div>
          <div className="step">
            <h3>2. Customize</h3>
            <p>Make it your own</p>
          </div>
          <div className="step">
            <h3>3. Order</h3>
            <p>Place your order</p>
          </div>
          <div className="step">
            <h3>4. Enjoy</h3>
            <p>Savor your meal</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
