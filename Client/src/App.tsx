import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
//import Auth from "./components/Auth";
import MenuPage from "./components/MenuPage";
import RiceMenuPage from "./components/RiceMenuPage";
import NoodlesMenuPage from "./components/NoodlesMenuPage";
import KottuMenuPage from "./components/KottuMenuPage";
import BeveragesMenuPage from "./components/BeveragesMenuPage";
//import ChickenRiceCustomize from "./components/ChickenRiceCustomize";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import MealCustomization from "./components/MealCustomization";
import CartPage from "./components/CartPage";
import ProfilePage from "./components/ProfilePage";
import OrderHistoryPage from "./components/OrderHistoryPage";
import { CartProvider } from "./context/CartContext";
import Sidebar from "./components/Sidebar";
import "./App.css";

const App: React.FC = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <CartProvider>
      <div className="App">
        <Sidebar visible={sidebarVisible} setVisible={setSidebarVisible} />
        <div style={{ marginLeft: sidebarVisible ? 220 : 0, transition: 'margin-left 0.3s cubic-bezier(.4,0,.2,1)' }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/menu/rice" element={<RiceMenuPage />} />
            {/* <Route
            path="/menu/rice/chicken-fried/customize"
            element={<ChickenRiceCustomize />}
          /> */}
            <Route path="/menu/noodles" element={<NoodlesMenuPage />} />
            <Route path="/menu/kottu" element={<KottuMenuPage />} />
            <Route path="/menu/beverages" element={<BeveragesMenuPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/order-history" element={<OrderHistoryPage />} />
            <Route
              path="/customize/:category/:item"
              element={<MealCustomization />}
            />
            <Route
              path="/about"
              element={
                <div className="page-container">About Us Page Coming Soon</div>
              }
            />
          </Routes>
        </div>
      </div>
    </CartProvider>
  );
};

export default App;