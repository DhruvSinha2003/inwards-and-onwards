const mongoose = require("mongoose");

const journalEntrySchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isEdited: {
    type: Boolean,
    default: false,
  },
  lastEditedAt: {
    type: Date,
  },
  isPromptBased: {
    type: Boolean,
    required: true,
  },
  promptText: {
    type: String,
    required: function () {
      return this.isPromptBased;
    },
  },
  heading: {
    type: String,
    required: function () {
      return !this.isPromptBased;
    },
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  wordCount: {
    type: Number,
    required: true,
  },
  charCount: {
    type: Number,
    required: true,
  },
  preview: {
    type: String,
    required: true,
  },
});

// Generate preview before saving
journalEntrySchema.pre("save", function (next) {
  // Generate preview from first 150 characters
  this.preview =
    this.content.substring(0, 150) + (this.content.length > 150 ? "..." : "");

  // Calculate word and character counts
  this.charCount = this.content.length;
  this.wordCount = this.content.trim().split(/\s+/).length;

  next();
});

module.exports = mongoose.model("JournalEntry", journalEntrySchema);
