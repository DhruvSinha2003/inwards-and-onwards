import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AlertDialog from "../components/AlertDialog";
import Footer from "../components/Footer";
import Header from "../components/Header";
import JournalInput from "../components/JournalInput";
import SuccessMessage from "../components/SuccessMessage";
import { useTheme } from "../contexts/ThemeContext";
import api from "../utils/api";

const PromptWriting = () => {
  const { colors } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showExitWarning, setShowExitWarning] = useState(false);
  const prompt = location.state?.prompt;
  const fromPrompts = location.state?.fromPrompts;

  useEffect(() => {
    if (!prompt) {
      navigate("/");
      return;
    }

    // Handle browser back button
    window.onbeforeunload = content ? () => true : null;
    return () => {
      window.onbeforeunload = null;
    };
  }, [content, prompt, navigate]);

  const handleContentChange = (e) => {
    setContent(e.target.value);
    setWordCount(e.target.value.trim().split(/\s+/).filter(Boolean).length);
  };

  const handleBack = () => {
    if (content) {
      setShowExitWarning(true);
    } else {
      navigate(fromPrompts ? "/prompt-categories" : "/");
    }
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

      // Navigate to homepage after successful save
      setTimeout(() => {
        navigate("/");
      }, 2000);
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
          message="Journal entry saved successfully! Redirecting..."
          onClose={() => setShowSuccess(false)}
        />
      )}

      <AlertDialog
        open={showExitWarning}
        onClose={() => setShowExitWarning(false)}
        title="Discard changes?"
        description="You have unsaved changes. Are you sure you want to leave? Your progress will be lost."
        cancelText="Stay"
        confirmText="Discard"
        onConfirm={() => navigate(fromPrompts ? "/prompt-categories" : "/")}
      />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handleBack}
            className="px-4 py-2 rounded-lg font-medium transition-opacity"
            style={{ color: colors.textSecondary }}
          >
            ← Back
          </button>
        </div>

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
