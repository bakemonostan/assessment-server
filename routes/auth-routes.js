const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db");

// Secret key for JWT signing

// Register a new user
const signup = async (req, res) => {
  const { email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  try {
    //check password length
    if (password.length <= 5) {
      return res.status(400).json({ error: "Password must be at least 6 characters long" });
    }

    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: "Email already exists" });
    }
    // Insert the new user into the database
    const newUser = await pool.query(
      "INSERT INTO users (email, hashed_password) VALUES ($1, $2) RETURNING *",
      [email, hashedPassword]
    );
    const token = jwt.sign({ email }, "secret", {
      expiresIn: "1h",
    });
    res
      .status(201)
      .json({ token, email, message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Login a user
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const users = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if(!users.rows.length) return res.json({detail: "User does not exist"});
    const success = await bcrypt.compare(password, users.rows[0].hashed_password);
    const token = jwt.sign({ email }, 'secret', {
      expiresIn: "1h",
    })
    if (success) {
     res.json({'email' : users.rows[0].email, token, message: "Logged in successfully"});
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  signup,
  login,
};
