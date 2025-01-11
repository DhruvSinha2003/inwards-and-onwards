import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AlertDialog from "../components/AlertDialog";
import Footer from "../components/Footer";
import Header from "../components/Header";
import JournalInput from "../components/JournalInput";
import SuccessMessage from "../components/SuccessMessage";
import { useTheme } from "../contexts/ThemeContext";
import api from "../utils/api";

const EditJournal = () => {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();
  const [entry, setEntry] = useState(null);
  const [content, setContent] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showExitWarning, setShowExitWarning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const response = await api.get(`/api/journal/${id}`);
        const entryData = response.data.data;
        setEntry(entryData);
        setContent(entryData.content);
        setWordCount(
          entryData.content.trim().split(/\s+/).filter(Boolean).length
        );
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch journal entry");
        navigate("/");
      }
    };

    fetchEntry();
  }, [id, navigate]);

  useEffect(() => {
    // Handle browser back button
    window.onbeforeunload = content !== entry?.content ? () => true : null;
    return () => {
      window.onbeforeunload = null;
    };
  }, [content, entry]);

  const handleContentChange = (e) => {
    setContent(e.target.value);
    setWordCount(e.target.value.trim().split(/\s+/).filter(Boolean).length);
  };

  const handleBack = () => {
    if (content !== entry?.content) {
      setShowExitWarning(true);
    } else {
      navigate("/");
    }
  };

  const handleSubmit = async () => {
    try {
      await api.put(`/api/journal/${id}`, {
        content,
      });

      setShowSuccess(true);

      // Navigate to homepage after successful save
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Failed to update journal entry");
    }
  };

  if (isLoading) {
    return (
      <div
        className="min-h-screen pt-20 flex items-center justify-center"
        style={{ backgroundColor: colors.bgPrimary }}
      >
        <div className="text-xl" style={{ color: colors.textPrimary }}>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen pt-20"
      style={{ backgroundColor: colors.bgPrimary }}
    >
      <Header />
      {showSuccess && (
        <SuccessMessage
          message="Journal entry updated successfully! Redirecting..."
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
        onConfirm={() => navigate("/")}
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

        {entry?.isPromptBased ? (
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
              {entry.promptText}
            </p>
          </div>
        ) : (
          <h1
            className="text-2xl font-serif mb-6"
            style={{ color: colors.textPrimary }}
          >
            {entry.heading}
          </h1>
        )}

        <JournalInput
          value={content}
          onChange={handleContentChange}
          placeholder="Start writing..."
        />

        <div className="mt-4 flex justify-between items-center">
          <span className="text-lg" style={{ color: colors.textSecondary }}>
            Words: {wordCount}
          </span>

          <button
            onClick={handleSubmit}
            disabled={!content || content === entry?.content}
            className="px-6 py-3 rounded-lg font-medium transition-opacity disabled:opacity-50"
            style={{
              backgroundColor: colors.buttonBg,
              color: colors.buttonText,
            }}
          >
            Save Changes
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EditJournal;
