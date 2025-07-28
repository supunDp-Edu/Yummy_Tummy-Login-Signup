const express = require("express");
const app = express();
const port = 5000;
const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cors = require('cors');

// Database connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "yummy_tummy",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test database connection
async function testDbConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("Successfully connected to the database");
    connection.release();
  } catch (err) {
    console.error("Database connection failed:", err);
    process.exit(1);
  }
}

// Middleware
app.use(express.json());

// JWT configuration
const JWT_SECRET = process.env.JWT_SECRET || "Supun";

// Generate JWT token
function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
}
// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true 
}));

// Routes
app.post("/api/signup", async (req, res) => {
  const { username, mobile_number, email, password, confirmPassword } = req.body;

  
  if (!username || !mobile_number || !email || !password || !confirmPassword) {
    return res.status(400).json({ error: "Please fill in all fields." });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match." });
  }

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({ 
      error: "Password must be at least 8 characters, include a capital letter, a number, and a special character."
    });
  }

  
  const mobileRegex = /^[0-9]{10,15}$/;
  if (!mobileRegex.test(mobile_number)) {
    return res.status(400).json({ error: "Please enter a valid mobile number." });
  }

  try {
    // Check if email, username or mobile number already exists
    const [existingUsers] = await pool.query(
      `SELECT * FROM users WHERE email = ? OR username = ? OR mobile_number = ?`, 
      [email, username, mobile_number]
    );

    if (existingUsers.length > 0) {
      const existingField = existingUsers[0].email === email ? 'email' : 
                         existingUsers[0].username === username ? 'username' : 'mobile_number';
      return res.status(409).json({ error: `${existingField} already in use.` });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const [result] = await pool.query(
      "INSERT INTO users (username, mobile_number, email, password_hash) VALUES (?, ?, ?, ?)",
      [username, mobile_number, email, hashedPassword]
    );

    const token = generateToken({ 
      id: result.insertId, 
      username,
      email 
    });

    res.status(201).json({ 
      message: "Signup successful",
      token,
      user: { 
        id: result.insertId, 
        username,
        mobile_number,
        email 
      }
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Please fill in all fields." });
  }

  try {
    // Explicitly select the fields we need
    const [users] = await pool.query(
      "SELECT id, username, email, mobile_number, password_hash FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const user = users[0];
    
    const isMatch = await bcrypt.compare(password, user.password_hash);
    
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // Debug log - show exactly what we got from DB
    console.log("User data from DB:", {
      id: user.id,
      username: user.username,
      email: user.email,
      mobile_number: user.mobile_number
    });

    // Generate token
    const token = generateToken({
      id: user.id,
      email: user.email,
      username: user.username
    });

    // Prepare response data
    const responseData = {
      message: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        mobile_number: user.mobile_number
      }
    };

    // Debug log - show what we're sending back
    console.log("Sending response:", responseData);

    res.json(responseData);

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});
// Server status endpoint
app.get("/api/status", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({
      status: "Server is running",
      database: "Connected",
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({
      status: "Server is running",
      database: "Disconnected",
      error: err.message
    });
  }
});

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Yummy Tummy Backend Service",
    status: "Running",
    endpoints: {
      signup: "POST /api/signup",
      login: "POST /api/login",
      status: "GET /api/status"
    }
  });
});

// Start server
app.listen(port, () => {
  console.log(` Server running at http://localhost:${port}`);
  testDbConnection();
});