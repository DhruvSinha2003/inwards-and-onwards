import { useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import JournalInput from "../components/JournalInput";
import SuccessMessage from "../components/SuccessMessage";
import { useTheme } from "../contexts/ThemeContext";
import api from "../utils/api";

const PromptWriting = () => {
  const { colors } = useTheme();
  const location = useLocation();
  const [content, setContent] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const prompt = location.state?.prompt;

  const handleContentChange = (e) => {
    setContent(e.target.value);
    setWordCount(e.target.value.trim().split(/\s+/).filter(Boolean).length);
  };

  const handleSubmit = async () => {
    try {
      await api.post("/api/journal", {
        isPromptBased: true,
        promptText: prompt,
        content,
        heading: "",
      });

      setShowSuccess(true);
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
        <div
          className="mb-8 p-6 rounded-lg"
          style={{ backgroundColor: colors.surfaceSecondary }}
        >
          <h2
            className="text-xl font-serif mb-2"
            style={{ color: colors.textSecondary }}
          >
            Writing Prompt:
          </h2>
          <p className="text-2xl" style={{ color: colors.textPrimary }}>
            {prompt}
          </p>
        </div>

        <JournalInput
          value={content}
          onChange={handleContentChange}
          placeholder="Start writing your response..."
        />

        <div className="mt-4 flex justify-between items-center">
          <span className="text-lg" style={{ color: colors.textSecondary }}>
            Words: {wordCount}
          </span>

          <button
            onClick={handleSubmit}
            disabled={!content}
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

export default PromptWriting;
