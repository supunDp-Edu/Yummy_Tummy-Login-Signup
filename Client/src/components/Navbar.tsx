import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../Assets/navbar.css";
import logo from "../Assets/logo1.png";
import { useCart } from "../context/CartContext";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [userPic, setUserPic] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";
  const { cartCount } = useCart();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setUsername(user.username);
      setUserPic(user.profilePic || `https://ui-avatars.com/api/?name=${user.username || "User"}`);
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
    setUsername(null);
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

  const handleSearch = () => {
    // For now, just log the search value
    console.log("Search:", searchValue);
  };

  return (
    <nav className={`navbar ${isAuthPage ? "auth-page" : ""}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#333', color: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', minHeight: 64 }}>
      {/* Left side: Logo, Home, Menu */}
      <div className="navbar-brand" style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <Link to="/" className="logo" style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="Yummy Tummy Logo" className="logo-image" />
        </Link>
        {!isAuthPage && (
          <>
            <Link to="/" className="nav-btn" style={{ marginLeft: 16 }}>Home</Link>
            <Link to="/menu" className="nav-btn" style={{ marginLeft: 8 }}>Menu</Link>
          </>
        )}
        {!isAuthPage && (
          <button className="menu-toggle" onClick={toggleMenu}>
            <span className="menu-icon"></span>
          </button>
        )}
      </div>
      {/* Centered search bar */}
      {!isAuthPage && (
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <div style={{ position: 'relative', width: 520 }}>
            <input
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleSearch(); }}
              style={{
                width: 520,
                padding: '8px 40px 8px 16px',
                borderRadius: 20,
                border: '1px solid #ddd',
                fontSize: 16,
                outline: 'none',
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
              }}
            />
            <span
              style={{
                position: 'absolute',
                right: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: 20,
                color: '#aaa',
                cursor: 'pointer',
                userSelect: 'none'
              }}
              onClick={handleSearch}
            >
              🔍
            </span>
          </div>
        </div>
      )}
      {/* Right side: About Us, Cart, Profile/Login */}
      {!isAuthPage && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Link to="/about" className="nav-btn">About Us</Link>
          <div className="navbar-cart">
            <Link
              to="/cart"
              style={{
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: '#fff',
                borderRadius: '18px',
                width: 34,
                height: 34,
                border: '1px solid #eee',
                margin: '0 4px',
                transition: 'box-shadow 0.2s',
                outline: 'none',
                cursor: 'pointer',
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                width="20"
                height="20"
                fill="#222"
              >
                <path d="M528.12 301.319l47.273-208A16 16 0 0 0 560 80H120l-9.4-47.319A16 16 0 0 0 95 32H16A16 16 0 0 0 0 48v16a16 16 0 0 0 16 16h66.1l61.6 310.319A63.994 63.994 0 1 0 256 464h192a64 64 0 1 0 62.1-80.681zM120 128h400.319l-40.319 176H159.319zM256 416a32 32 0 1 1-32-32 32 32 0 0 1 32 32zm192 0a32 32 0 1 1-32-32 32 32 0 0 1 32 32z" />
              </svg>
              {cartCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: 2,
                    right: 2,
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
          <div className="auth-buttons" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {username ? (
              <Link to="/profile">
                {userPic && (
                  <img
                    src={userPic}
                    alt="Profile"
                    style={{ width: 40, height: 40, borderRadius: '50%', border: '2px solid #fff', background: '#eee' }}
                  />
                )}
              </Link>
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