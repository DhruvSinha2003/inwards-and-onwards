const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { sendEmail } = require("../config/emailConfig");

const generateToken = (userId) => {
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
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);
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

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    const emailHtml = `
  <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; background-color: #fff5eb; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
    <h1 style="color: #2d3748; text-align: center; font-size: 36px; margin-bottom: 20px;">
      <span style="display: block;">INWARDS</span>
      <span style="font-style: italic; margin: 0 16px;">&</span>
      <span style="display: block;">ONWARDS</span>
    </h1>
    <h2 style="color: #2d3748; text-align: center; font-size: 24px; margin-bottom: 16px;">Password Reset Request</h2>
    <p style="color: #4a5568; text-align: center; font-size: 16px; margin-bottom: 30px;">
      Click the link below to reset your password. This link will expire in 1 hour.
    </p>
    <div style="text-align: center; margin-top: 30px;">
      <a href="${resetLink}" 
         style="background-color: #ed8936; color: white; padding: 12px 24px; 
                text-decoration: none; border-radius: 5px; font-size: 16px; 
                transition: background-color 0.3s;">
        Reset Password
      </a>
    </div>
  </div>
`;

    await sendEmail(email, "Password Reset Request", emailHtml);
    res.json({ message: "Password reset link sent to your email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({
      _id: decoded.userId,
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired reset token" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.json({ message: "Password successfully reset" });
  } catch (error) {
    console.error(error);
    if (error.name === "JsonWebTokenError") {
      return res.status(400).json({ message: "Invalid reset token" });
    }
    res.status(500).json({ message: "Server error" });
  }
};
