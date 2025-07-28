import React from "react";
import "../Assets/Home.css";
import foodImage from "../Assets/food.jpg";
import riceIcon from "../Assets/rice.jpg";
import noodlesIcon from "../Assets/noodles.jpg";
import kottuIcon from "../Assets/kottu.jpg";
import juiceIcon from "../Assets/juice.jpg";

const HomePage: React.FC = () => {
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) {
      return "Good Morning";
    } else if (hour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>{getTimeBasedGreeting()}, Welcome to Yummy Tummy</h1>
          <p>Customize Your Perfect Meal</p>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="categories">
        <h2>Popular Categories</h2>
        <div className="category-grid">
          {/* Rice */}
          <div className="category-card">
            <img src={riceIcon} alt="Rice" className="category-image" />
            <h3>Rice</h3>
          </div>

          {/* Noodles */}
          <div className="category-card">
            <img src={noodlesIcon} alt="Noodles" className="category-image" />
            <h3>Noodles</h3>
          </div>

          {/* Kottu */}
          <div className="category-card">
            <img src={kottuIcon} alt="Kottu" className="category-image" />
            <h3>Kottu</h3>
          </div>

          {/* Beverages */}
          <div className="category-card">
            <img src={juiceIcon} alt="Beverages" className="category-image" />
            <h3>Beverages</h3>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2>How to Customize Your Meal</h2>
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3>Choose Your Base</h3>
            <p>Select from our variety of base dishes</p>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <h3>Pick Ingredients</h3>
            <p>Add or remove ingredients as you like</p>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <h3>Set Quantity</h3>
            <p>Choose your perfect portion size</p>
          </div>
          <div className="step-card">
            <div className="step-number">4</div>
            <h3>Place Order</h3>
            <p>Confirm and wait for your custom meal</p>
          </div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="featured-dishes">
        <h2>Popular Customizable Dishes</h2>
        <div className="dishes-grid">
          <div className="dish-card">
            <img src={foodImage} alt="Delicious Food" />
            <div className="dish-info">
              <h3>Custom Pizza</h3>
              <p>Starting from $8.99</p>
              <button className="customize-btn">Customize Now</button>
            </div>
          </div>
          <div className="dish-card">
            <img src={foodImage} alt="Delicious Food" />
            <div className="dish-info">
              <h3>Build Your Burger</h3>
              <p>Starting from $6.99</p>
              <button className="customize-btn">Customize Now</button>
            </div>
          </div>
          <div className="dish-card">
            <img src={foodImage} alt="Delicious Food" />
            <div className="dish-info">
              <h3>Custom Salad Bowl</h3>
              <p>Starting from $7.99</p>
              <button className="customize-btn">Customize Now</button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <div className="cta-content">
          <h2>Ready to Create Your Perfect Meal?</h2>
          <p>Start customizing your order now!</p>
          <button className="start-order-btn">Start Order</button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
