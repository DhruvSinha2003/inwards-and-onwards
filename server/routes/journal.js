// routes/journal.js
const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const auth = require("../middleware/auth"); // Assuming you have auth middleware

// Import controller (to be created)
const {
  createEntry,
  getEntries,
  getEntry,
  updateEntry,
  deleteEntry,
} = require("../controllers/journalController");

// Create new journal entry
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

// Get all entries for a user
router.get("/", auth, getEntries);

// Get specific entry
router.get("/:id", auth, getEntry);

// Update entry
router.put("/:id", auth, [body("content").notEmpty().trim()], updateEntry);

// Delete entry
router.delete("/:id", auth, deleteEntry);

module.exports = router;
