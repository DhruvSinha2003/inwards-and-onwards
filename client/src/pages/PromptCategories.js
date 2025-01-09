import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useTheme } from "../contexts/ThemeContext";

const PromptCategories = () => {
  const { colors } = useTheme();
  const [expandedCategory, setExpandedCategory] = useState(null);
  const navigate = useNavigate();
  const categories = [
    {
      name: "Self-Discovery",
      prompts: [
        "What values guide your daily decisions?",
        "Describe a moment that changed your perspective on life",
        "What does your ideal future look like?",
      ],
    },
    {
      name: "Gratitude",
      prompts: [
        "List three unexpected blessings from today",
        "Write about someone who positively influenced your life",
        "What simple pleasure brought you joy recently?",
      ],
    },
    {
      name: "Growth & Goals",
      prompts: [
        "What skill would you like to master and why?",
        "Describe a recent challenge and what it taught you",
        "What small step can you take today toward a big goal?",
      ],
    },
    {
      name: "Emotional Awareness",
      prompts: [
        "How do you handle stress differently now compared to the past?",
        "Write about a feeling you find difficult to express",
        "What brings you peace when you feel overwhelmed?",
      ],
    },
  ];

  return (
    <div
      className="min-h-screen pt-20"
      style={{ backgroundColor: colors.bgPrimary }}
    >
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1
          className="text-3xl font-serif mb-8"
          style={{ color: colors.textPrimary }}
        >
          Choose a Writing Prompt
        </h1>

        <div className="space-y-4">
          {categories.map((category) => (
            <div key={category.name}>
              <button
                className="w-full p-4 rounded-lg text-left transition-all"
                style={{
                  backgroundColor: colors.surfaceSecondary,
                  color: colors.textPrimary,
                }}
                onClick={() =>
                  setExpandedCategory(
                    expandedCategory === category.name ? null : category.name
                  )
                }
              >
                <h2 className="text-xl font-serif">{category.name}</h2>
              </button>

              {expandedCategory === category.name && (
                <div className="mt-2 ml-4 space-y-2">
                  {category.prompts.map((prompt) => (
                    <button
                      key={prompt}
                      className="w-full p-4 rounded-lg text-left hover:opacity-90 transition-opacity"
                      style={{
                        backgroundColor: colors.bgAccent,
                        color: colors.textAccent,
                      }}
                      onClick={() =>
                        navigate("/prompt-writing", {
                          state: { prompt },
                        })
                      }
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PromptCategories;
