const express = require("express");
const router = express.Router();
const {
  register,
  login,
  forgotPassword,
} = require("../controllers/authController");
const { body } = require("express-validator");

router.post(
  "/register",
  [
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
    body("username").isLength({ min: 3 }),
  ],
  register
);

router.post(
  "/login",
  [body("email").isEmail(), body("password").exists()],
  login
);

router.post("/forgot-password", [body("email").isEmail()], forgotPassword);

module.exports = router;
