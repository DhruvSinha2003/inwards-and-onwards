// routes/journal.js
const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const auth = require("../middleware/auth"); // Assuming you have auth middleware

const {
  createEntry,
  getEntries,
  getEntry,
  updateEntry,
  deleteEntry,
} = require("../controllers/journalController");

router.post(
  "/",
  auth,
  [
    body("isPromptBased").isBoolean(),
    body("promptText").if(body("isPromptBased").equals(true)).notEmpty(),
    body("heading").if(body("isPromptBased").equals(false)).notEmpty(),
    body("content").notEmpty().trim(),
  ],
  createEntry
);

router.get("/", auth, getEntries);

router.get("/:id", auth, getEntry);

router.put("/:id", auth, [body("content").notEmpty().trim()], updateEntry);

router.delete("/:id", auth, deleteEntry);

module.exports = router;
