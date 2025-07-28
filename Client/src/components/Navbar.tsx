import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../Assets/navbar.css";
import logo from "../Assets/logo1.png";
import { useCart } from "../context/CartContext";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";
  const { cartCount } = useCart();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setUserEmail(user.email);
    }
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUserEmail(null);
    setShowDropdown(false);
    navigate("/");
  };

  const handleAuthClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className={`navbar ${isAuthPage ? "auth-page" : ""}`}>
      <div className="navbar-brand">
        <Link to="/" className="logo">
          <img src={logo} alt="Yummy Tummy Logo" className="logo-image" />
        </Link>
        {!isAuthPage && (
          <button className="menu-toggle" onClick={toggleMenu}>
            <span className="menu-icon"></span>
          </button>
        )}
      </div>
      {!isAuthPage && (
        <div className={`navbar-menu ${isMenuOpen ? "active" : ""}`}>
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/menu" className="nav-link">
            Menu
          </Link>
          <Link to="/about" className="nav-link">
            About Us
          </Link>
          <div className="navbar-cart">
            <Link
              to="/cart"
              style={{ position: "relative", display: "inline-block" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                width="32"
                height="32"
                fill="#222"
              >
                <path d="M528.12 301.319l47.273-208A16 16 0 0 0 560 80H120l-9.4-47.319A16 16 0 0 0 95 32H16A16 16 0 0 0 0 48v16a16 16 0 0 0 16 16h66.1l61.6 310.319A63.994 63.994 0 1 0 256 464h192a64 64 0 1 0 62.1-80.681zM120 128h400.319l-40.319 176H159.319zM256 416a32 32 0 1 1-32-32 32 32 0 0 1 32 32zm192 0a32 32 0 1 1-32-32 32 32 0 0 1 32 32z" />
              </svg>
              {cartCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: -6,
                    right: -6,
                    background: "#ff6b6b",
                    color: "#fff",
                    borderRadius: "50%",
                    padding: "2px 7px",
                    fontSize: 13,
                    fontWeight: 700,
                    minWidth: 22,
                    textAlign: "center",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
                  }}
                >
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
          <div className="auth-buttons">
            {userEmail ? (
              <div style={{ position: "relative", display: "inline-block" }}>
                <button
                  onClick={toggleDropdown}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#333",
                    fontWeight: 600,
                    cursor: "pointer",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    transition: "all 0.3s ease",
                    fontSize: "inherit",
                    fontFamily: "inherit",
                  }}
                  onMouseEnter={() => setShowDropdown(true)}
                >
                  Hi, {userEmail.split("@")[0]}
                </button>
                {showDropdown && (
                  <div
                    style={{
                      position: "absolute",
                      right: 0,
                      backgroundColor: "white",
                      minWidth: "160px",
                      boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
                      zIndex: 1,
                      borderRadius: "4px",
                      overflow: "hidden",
                    }}
                    onMouseLeave={() => setShowDropdown(false)}
                  >
                    <button
                      onClick={handleLogout}
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        textAlign: "left",
                        border: "none",
                        background: "none",
                        cursor: "pointer",
                        color: "#333",
                        fontSize: "14px",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#f8f8f8";
                        (e.currentTarget as HTMLButtonElement).style.color = "#e74c3c";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.backgroundColor = "white";
                        (e.currentTarget as HTMLButtonElement).style.color = "#333";
                      }}
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="nav-btn login"
                onClick={handleAuthClick}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;