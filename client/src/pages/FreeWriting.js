// Free Writing Page
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import JournalInput from "../components/JournalInput";
import { useTheme } from "../contexts/ThemeContext";

const FreeWriting = () => {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");
  const [wordCount, setWordCount] = useState(0);

  const handleContentChange = (e) => {
    setContent(e.target.value);
    setWordCount(e.target.value.trim().split(/\s+/).filter(Boolean).length);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/journal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          heading,
          content,
          isPromptBased: false,
        }),
      });

      if (response.ok) {
        navigate("/journal"); // Assuming you have a journal view page
      }
    } catch (error) {
      console.error("Error submitting entry:", error);
    }
  };

  return (
    <div
      className="min-h-screen pt-20"
      style={{ backgroundColor: colors.bgPrimary }}
    >
      <Header />
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
            className="px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
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
