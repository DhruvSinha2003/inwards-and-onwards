const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const generateToken = (userId) => {
  console.log("JWT_SECRET: ", process.env.JWT_SECRET); // Log the value of JWT_SECRET
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is required but not defined.");
  }
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

exports.register = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    const token = generateToken(user._id);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  console.log("Login request received:", {
    email: req.body.email,
    hasPassword: !!req.body.password,
  });

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log("User found, verifying password");
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("Password mismatch for user:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);
    console.log("Login successful, sending response");

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Server error during login:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};
