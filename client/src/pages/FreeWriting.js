import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import JournalInput from "../components/JournalInput";
import SuccessMessage from "../components/SuccessMessage";
import { useTheme } from "../contexts/ThemeContext";
import api from "../utils/api";

const FreeWriting = () => {
  const { colors } = useTheme();
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleContentChange = (e) => {
    setContent(e.target.value);
    setWordCount(e.target.value.trim().split(/\s+/).filter(Boolean).length);
  };

  const handleSubmit = async () => {
    try {
      await api.post("/api/journal", {
        heading,
        content,
        promptText: "",
        isPromptBased: false,
      });

      setShowSuccess(true);
      setHeading("");
      setContent("");
      setWordCount(0);

      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      console.error("Failed to save journal entry");
    }
  };

  return (
    <div
      className="min-h-screen pt-20"
      style={{ backgroundColor: colors.bgPrimary }}
    >
      <Header />
      {showSuccess && (
        <SuccessMessage
          message="Journal entry saved successfully!"
          onClose={() => setShowSuccess(false)}
        />
      )}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <input
          type="text"
          placeholder="Enter your heading..."
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          className="w-full text-2xl font-serif mb-6 p-4 rounded-lg"
          style={{
            backgroundColor: colors.inputBg,
            color: colors.inputText,
            borderColor: colors.borderPrimary,
          }}
        />

        <JournalInput
          value={content}
          onChange={handleContentChange}
          placeholder="Start writing your thoughts..."
        />

        <div className="mt-4 flex justify-between items-center">
          <span className="text-lg" style={{ color: colors.textSecondary }}>
            Words: {wordCount}
          </span>

          <button
            onClick={handleSubmit}
            disabled={!heading || !content}
            className="px-6 py-3 rounded-lg font-medium transition-opacity disabled:opacity-50"
            style={{
              backgroundColor: colors.buttonBg,
              color: colors.buttonText,
            }}
          >
            Save Entry
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FreeWriting;
