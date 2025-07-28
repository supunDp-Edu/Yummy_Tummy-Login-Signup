import React, { useState } from "react";
import "./Auth.css";

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the authentication logic
    console.log("Form submitted:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    // Reset form data when switching modes
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
              />
            </div>
          )}
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
          {!isLogin && (
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
          )}
          <button type="submit" className="submit-btn">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <p className="toggle-text">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span onClick={toggleMode} className="toggle-link">
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;
