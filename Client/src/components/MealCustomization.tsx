import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../Assets/MealCustomization.css";
import juiceImg from "../Assets/juice.jpg";
import menuWallpaper from "../Assets/menu.jpg";
import { riceMenuData } from "../data/riceMenuData";
import { noodlesMenuData } from "../data/noodlesMenuData";
import { kottuMenuData } from "../data/kottuMenuData";
import { beveragesMenuData } from "../data/beveragesMenuData";
import { triggerCartUpdate } from "../context/CartContext";

// Example config for a food item (can be extended for all categories)
const sampleFoodConfig = {
  name: "Customizable Meal",
  image: juiceImg, // Use juice.jpg for the meal image
  basePrice: 5.0,
  options: [
    {
      name: "size",
      label: "Size",
      type: "select",
      choices: [
        { label: "Small", value: "small", price: 0 },
        { label: "Medium", value: "medium", price: 1 }, // +$1 for medium
        { label: "Large", value: "large", price: 1.5 }, // +$1.5 for large
      ],
      default: "small",
    },
    {
      name: "spice",
      label: "Spice Level",
      type: "select",
      choices: [
        { label: "Mild", value: "mild", price: 0 },
        { label: "Medium", value: "medium", price: 0.5 }, // +$0.5 for medium
        { label: "Hot", value: "hot", price: 0.5 }, // +$0.5 for hot
      ],
      default: "mild",
    },
  ],
  addons: [
    { name: "egg", label: "Add Egg", price: 1 },
    { name: "cheese", label: "Add Cheese", price: 1.5 },
    { name: "extra_meat", label: "Extra Meat", price: 2 },
  ],
};

const MealCustomization: React.FC<{ config?: typeof sampleFoodConfig }> = ({
  config,
}) => {
  const { category, item } = useParams();

  // If category is 'rice', try to find the rice item by id
  let food = sampleFoodConfig;
  if (category === "rice" && item) {
    const riceItem = riceMenuData.find((rice) => rice.id === item);
    if (riceItem) {
      food = {
        ...sampleFoodConfig,
        ...riceItem,
        // Optionally, you can customize options/addons per rice item here
      };
    }
  } else if (category === "noodles" && item) {
    const noodleItem = noodlesMenuData.find((noodle) => noodle.id === item);
    if (noodleItem) {
      food = {
        ...sampleFoodConfig,
        ...noodleItem,
      };
    }
  } else if (category === "kottu" && item) {
    const kottuItem = kottuMenuData.find((kottu) => kottu.id === item);
    if (kottuItem) {
      food = {
        ...sampleFoodConfig,
        ...kottuItem,
      };
    }
  } else if (category === "beverages" && item) {
    const beverageItem = beveragesMenuData.find((bev) => bev.id === item);
    if (beverageItem) {
      food = {
        ...sampleFoodConfig,
        ...beverageItem,
      };
    }
  }
  // State for options
  const [selectedOptions, setSelectedOptions] = useState(
    Object.fromEntries(food.options.map((opt) => [opt.name, opt.default]))
  );
  // State for add-ons
  const [selectedAddons, setSelectedAddons] = useState<{
    [key: string]: number;
  }>({});
  // State for special instructions
  const [instructions, setInstructions] = useState("");
  // State for quantity
  const [quantity, setQuantity] = useState(1);
  // State for feedback
  const [actionMsg, setActionMsg] = useState("");

  // Calculate total price
  const base = food.basePrice;
  const optionsPrice = food.options.reduce((sum, opt) => {
    const selected = opt.choices.find(
      (c) => c.value === selectedOptions[opt.name]
    );
    return sum + (selected?.price || 0);
  }, 0);
  const addonsPrice = food.addons.reduce((sum, addon) => {
    return sum + (selectedAddons[addon.name] || 0) * addon.price;
  }, 0);
  const total = ((base + optionsPrice + addonsPrice) * quantity).toFixed(2);

  // Handlers
  const handleOptionChange = (name: string, value: string) => {
    setSelectedOptions((prev) => ({ ...prev, [name]: value }));
  };
  const handleBuyNow = () => {
    setActionMsg("Order placed!");
    setTimeout(() => setActionMsg(""), 2000);
  };
  const handleAddToCart = () => {
    // Build cart item object
    const cartItem = {
      name: food.name,
      image: food.image,
      basePrice: food.basePrice,
      selectedOptions,
      selectedAddons,
      instructions,
      quantity,
      total: Number(total),
    };
    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    // Append new item
    existingCart.push(cartItem);
    // Save back to localStorage
    localStorage.setItem("cart", JSON.stringify(existingCart));
    triggerCartUpdate();
    setActionMsg("Added to cart!");
    setTimeout(() => setActionMsg(""), 2000);
  };

  return (
    <div
      className="meal-customization"
      style={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `url(${menuWallpaper}) center center/cover no-repeat`,
        position: "relative",
      }}
    >
      <div
        className="customization-card"
        style={{
          marginTop: 90,
          marginBottom: 20,
          position: "relative",
          width: "520px",
          maxWidth: "100vw",
          marginLeft: "auto",
          marginRight: "auto",
          borderRadius: 16,
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          background: "rgba(255,255,255,0.75)",
          backdropFilter: "blur(2px)",
          border: "1.5px solid #eee",
        }}
      >
        {/* Back Arrow and Meal Name in the same row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 18,
          }}
        >
          <div style={{ position: "absolute", left: 0 }}>
            <Link
              to={`/menu/${category || ""}`}
              style={{
                textDecoration: "none",
                color: "#333",
                fontSize: 28,
                display: "flex",
                alignItems: "center",
              }}
              title="Back to Menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#333"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </Link>
          </div>
          <h1
            style={{
              textAlign: "center",
              fontWeight: 800,
              fontSize: 32,
              margin: 0,
              letterSpacing: 1,
              color: "#222",
              textShadow: "0 2px 8px rgba(0,0,0,0.08)",
              flex: 1,
            }}
          >
            {food.name}
          </h1>
        </div>
        {/* Show selected category and item for now */}
        <div style={{ marginBottom: 12, color: "#888", fontSize: 15 }}>
          <strong>Category:</strong> {category} <strong>Item:</strong> {item}
        </div>
        <img
          src={food.image}
          alt={food.name}
          style={{
            width: 120,
            borderRadius: 8,
            display: "block",
            margin: "0 auto 1rem",
            boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          }}
        />
        <div
          className="base-price"
          style={{ marginBottom: 8, border: "2px solid rgba(6, 8, 8, 0.75)" }}
        >
          <span>Base Price:</span>
          <span>${food.basePrice.toFixed(2)}</span>
        </div>
        {/* Dynamic Options */}
        {food.options.map((opt) => (
          <div
            className="ingredients-section"
            key={opt.name}
            style={{ marginBottom: 10 }}
          >
            <h3 style={{ marginBottom: 4 }}>{opt.label}</h3>
            <select
              value={selectedOptions[opt.name]}
              onChange={(e) => handleOptionChange(opt.name, e.target.value)}
              style={{
                padding: 6,
                borderRadius: 6,
                border: "1px solid #ddd",
                width: "100%",
              }}
            >
              {opt.choices.map((choice) => (
                <option value={choice.value} key={choice.value}>
                  {choice.label} {choice.price > 0 ? `(+${choice.price})` : ""}
                </option>
              ))}
            </select>
          </div>
        ))}
        {/* Add-ons List - visually separated */}
        <div
          style={{
            margin: "18px 0",
            padding: "14px 16px",
            background: "#f8f8f8",
            borderRadius: 8,
            border: "1px solid #eee",
          }}
        >
          <h3 style={{ marginBottom: 8, fontSize: 17, color: "#444" }}>
            Add-ons
          </h3>
          <div
            style={{
              display: "flex",
              fontWeight: 600,
              fontSize: 15,
              marginBottom: 6,
            }}
          >
            <span style={{ flex: 2 }}>Item</span>
            <span style={{ flex: 1, textAlign: "center" }}>Qty</span>
            <span style={{ flex: 1, textAlign: "right" }}>Price</span>
          </div>
          {food.addons.map((addon) => (
            <div
              className="ingredient-row"
              key={addon.name}
              style={{ display: "flex", alignItems: "center", marginBottom: 8 }}
            >
              <span style={{ flex: 2, color: "#333" }}>{addon.label}</span>
              <input
                type="number"
                min={0}
                value={selectedAddons[addon.name] || 0}
                onChange={(e) => {
                  const qty = Math.max(0, Number(e.target.value));
                  setSelectedAddons((prev) => ({ ...prev, [addon.name]: qty }));
                }}
                style={{
                  width: 48,
                  borderRadius: 6,
                  padding: 4,
                  border: "1px solid #ddd",
                  fontSize: 15,
                  textAlign: "center",
                  margin: "0 8px",
                  flex: 1,
                }}
              />
              <span
                style={{
                  flex: 1,
                  textAlign: "right",
                  color: "#27ae60",
                  fontWeight: 500,
                  fontSize: 15,
                }}
              >
                ${((selectedAddons[addon.name] || 0) * addon.price).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
        {/* Special Instructions */}
        <div className="ingredients-section" style={{ marginBottom: 10 }}>
          <h3 style={{ marginBottom: 4 }}>Special Instructions</h3>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="Any special requests?"
            style={{
              width: "100%",
              minHeight: 60,
              borderRadius: 6,
              padding: 8,
              border: "1px solid #ddd",
              resize: "vertical",
            }}
          />
        </div>
        {/* Qty input moved here */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 16,
            justifyContent: "flex-end",
          }}
        >
          <span style={{ fontWeight: 600, fontSize: 20 }}>Qty</span>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            style={{
              width: 60,
              borderRadius: 6,
              padding: 6,
              border: "3px solid #ddd",
              fontSize: 20,
              textAlign: "center",
            }}
          />
        </div>
        {/* Total */}
        <div
          className="total-section"
          style={{
            marginBottom: 16,
            fontWeight: 700,
            fontSize: 20,
            background: "linear-gradient(90deg, #f8ffec 0%, #e0ffe0 100%)",
            border: "2px solid #27ae60",
            color: "#222",
            borderRadius: 10,
            padding: "12px 0",
            textAlign: "center",
            letterSpacing: 1,
            boxShadow: "0 2px 8px rgba(39,174,96,0.07)",
          }}
        >
          <span style={{ marginLeft: 24, marginRight: 8 }}>Total:</span>
          <span style={{ color: "#27ae60", fontWeight: 800, marginRight: 5 }}>
            ${total}
          </span>
        </div>
        {/* Actions - Add to Cart button on right */}
        <div
          style={{
            display: "flex",
            gap: 12,
            marginBottom: 8,
            justifyContent: "space-between",
          }}
        >
          <div style={{ flex: 1 }} />
          <button
            className="order-button"
            style={{
              background: "#fff",
              color: "#ff6b6b",
              border: "2px solid #ff6b6b",
              width: 160,
              height: 48,
              padding: 0,
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              boxShadow: "0 2px 8px rgba(255,107,107,0.08)",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onClick={handleAddToCart}
            title="Add to Cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              width="28"
              height="28"
              fill="#ff6b6b"
              style={{ display: "block", marginRight: 8 }}
            >
              <path d="M528.12 301.319l47.273-208A16 16 0 0 0 560 80H120l-9.4-47.319A16 16 0 0 0 95 32H16A16 16 0 0 0 0 48v16a16 16 0 0 0 16 16h66.1l61.6 310.319A63.994 63.994 0 1 0 256 464h192a64 64 0 1 0 62.1-80.681zM120 128h400.319l-40.319 176H159.319zM256 416a32 32 0 1 1-32-32 32 32 0 0 1 32 32zm192 0a32 32 0 1 1-32-32 32 32 0 0 1 32 32z" />
            </svg>
            <span style={{ fontSize: 16, fontWeight: 600 }}>Add to Cart</span>
          </button>
        </div>
        {actionMsg && <div className="order-popup">{actionMsg}</div>}
      </div>
    </div>
  );
};

export default MealCustomization;
