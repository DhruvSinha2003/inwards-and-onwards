const JournalEntry = require("../models/journalEntry");
const { validationResult } = require("express-validator");

exports.createEntry = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { isPromptBased, promptText, heading, content } = req.body;

    const wordCount = content.trim().split(/\s+/).length;
    const charCount = content.length;
    const preview =
      content.substring(0, 150) + (content.length > 150 ? "..." : "");

    const entry = new JournalEntry({
      username: req.user.username,
      userId: req.user._id,
      isPromptBased,
      promptText,
      heading,
      content,
      wordCount,
      charCount,
      preview,
    });

    const savedEntry = await entry.save();

    res.status(201).json({
      success: true,
      data: savedEntry,
    });
  } catch (error) {
    console.error("Journal creation error:", error);
    res.status(500).json({
      success: false,
      message: "Error creating journal entry",
      error: error.message,
    });
  }
};

exports.getEntries = async (req, res) => {
  try {
    const entries = await JournalEntry.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      data: entries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching journal entries",
      error: error.message,
    });
  }
};

exports.getEntry = async (req, res) => {
  try {
    const entry = await JournalEntry.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: "Journal entry not found",
      });
    }

    res.json({
      success: true,
      data: entry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching journal entry",
      error: error.message,
    });
  }
};

exports.updateEntry = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const entry = await JournalEntry.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: "Journal entry not found",
      });
    }

    entry.content = req.body.content;
    entry.isEdited = true;
    entry.lastEditedAt = Date.now();

    await entry.save();

    res.json({
      success: true,
      data: entry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating journal entry",
      error: error.message,
    });
  }
};

exports.deleteEntry = async (req, res) => {
  try {
    const entry = await JournalEntry.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: "Journal entry not found",
      });
    }

    res.json({
      success: true,
      message: "Journal entry deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting journal entry",
      error: error.message,
    });
  }
};
