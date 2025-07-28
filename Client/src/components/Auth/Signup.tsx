import React, { useState } from "react";
import "./Auth.css";
import { Link, useNavigate } from "react-router-dom";
import leftLogin from "../../Assets/leftLogin.jpg";
import { GoogleLogin } from "@react-oauth/google";

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [passwordValid, setPasswordValid] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "password") {
      validatePassword(value);
    }
  };

  const validatePassword = (password: string) => {
    const regex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    setPasswordValid(regex.test(password));
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!formData.email || !formData.password || !formData.confirmPassword) {
    setError("Please fill in all fields.");
    return;
  }

  validatePassword(formData.password);
  if (!passwordValid) {
    setError("Password does not meet the requirements.");
    return;
  }

  if (formData.password !== formData.confirmPassword) {
    setError("Passwords do not match.");
    return;
  }

  setLoading(true);
  setError("");

  try {
    const response = await fetch("http://localhost:5000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Signup failed");
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    
    navigate("/login");
  } catch (error) {
    if (error instanceof Error) {
      setError(error.message);
    } else {
      setError("An unexpected error occurred");
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
          <img
            src={leftLogin}
            alt="Signup Visual"
            className="auth-side-image"
          />
        </div>
        <div className="auth-form-col">
          <h2>Sign Up</h2>
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
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
              />
              {passwordFocused && (
                <div className="password-hint">
                  Password must be at least 8 characters, include a capital
                  letter, a number, and a special character.
                </div>
              )}
              {!passwordValid && formData.password && (
                <div className="error-message">
                  Password does not meet the requirements.
                </div>
              )}
            </div>
            <div className="form-group">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                required
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>
          <div style={{ margin: "16px 0" }}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => {
                setError("Google sign up failed");
              }}
              text="signup_with"
              shape="rectangular"
              width="100%"
            />
          </div>
          <p className="toggle-text">
            Already have an account?{" "}
            <Link to="/login" className="toggle-link">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;