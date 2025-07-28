import React, { useState } from "react";
import "./Auth.css";
import { Link, useNavigate } from "react-router-dom";
import leftLogin from "../../Assets/leftLogin.jpg";
import { GoogleLogin } from "@react-oauth/google";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!formData.email || !formData.password) {
    setError("Please fill in all fields.");
    return;
  }

  setLoading(true);
  setError("");

  try {
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Login failed");
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    
    navigate("/");
  } catch (error) {
    if (error instanceof Error) {
      setError(error.message);
    } else {
      setError("Login failed. Please try again.");
    }
  } finally {
    setLoading(false);
  }
};

const handleGoogleSuccess = async (credentialResponse: any) => {
  try {
    const response = await fetch("http://localhost:5000/api/google-auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ credential: credentialResponse.credential }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Google authentication failed");
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    
    navigate("/");
  } catch (error) {
    if (error instanceof Error) {
      setError(error.message);
    } else {
      setError("Google authentication failed");
    }
  }
};

  return (
    <div className="auth-container">
      <h1 className="welcome-text floating-welcome">WELCOME TO YUMMY TUMMY</h1>
      <div className="auth-box auth-box-split">
        <div className="auth-image-col">
          <img src={leftLogin} alt="Login Visual" className="auth-side-image" />
        </div>
        <div className="auth-form-col">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <div style={{ margin: "16px 0" }}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => {
                setError("Google login failed");
              }}
              text="signin_with"
              shape="rectangular"
              width="100%"
            />
          </div>
          <p className="toggle-text">
            Don't have an account?{" "}
            <Link to="/register" className="toggle-link">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;