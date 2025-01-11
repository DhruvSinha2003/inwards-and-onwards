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
      icon: "✨",
      prompts: [
        "What values guide your daily decisions?",
        "Describe a moment that changed your perspective on life",
        "What does your ideal future look like?",
        "What childhood dream still influences you today?",
        "How has your definition of success evolved over time?",
        "What would you tell your younger self if you could?",
      ],
    },
    {
      name: "Gratitude",
      icon: "🙏",
      prompts: [
        "List three unexpected blessings from today",
        "Write about someone who positively influenced your life",
        "What simple pleasure brought you joy recently?",
        "Describe a challenge that turned into a blessing",
        "What aspects of your daily routine are you grateful for?",
        "Write about a small act of kindness you witnessed today",
      ],
    },
    {
      name: "Growth & Goals",
      icon: "🌱",
      prompts: [
        "What skill would you like to master and why?",
        "Describe a recent challenge and what it taught you",
        "What small step can you take today toward a big goal?",
        "How do you plan to grow in the next six months?",
        "What fear would you like to overcome this year?",
        "Describe a habit you'd like to build and why",
      ],
    },
    {
      name: "Emotional Awareness",
      icon: "💭",
      prompts: [
        "How do you handle stress differently now compared to the past?",
        "Write about a feeling you find difficult to express",
        "What brings you peace when you feel overwhelmed?",
        "Describe your emotional landscape over the past week",
        "What triggers your strongest emotional responses?",
        "How do you practice self-compassion?",
      ],
    },
    {
      name: "Relationships",
      icon: "💝",
      prompts: [
        "How has your definition of friendship evolved?",
        "Write about a relationship that shaped who you are",
        "What boundaries have you learned to set?",
        "Describe your ideal support system",
        "How do you show love to others?",
        "What relationship pattern would you like to change?",
      ],
    },
    {
      name: "Creativity",
      icon: "🎨",
      prompts: [
        "What inspires your creative spirit?",
        "Describe your perfect creative space",
        "How do you overcome creative blocks?",
        "What form of expression calls to you most?",
        "Write about a creative project you dream of starting",
        "How has your creativity evolved over time?",
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
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 rounded-full text-sm hover:opacity-90 transition-opacity flex items-center gap-2"
          style={{
            backgroundColor: colors.surfaceAccent,
            color: colors.textPrimary,
          }}
        >
          ← Back to Home
        </button>
        <h1
          className="text-3xl font-serif mb-8 mt-8"
          style={{ color: colors.textPrimary }}
        >
          Choose a Writing Prompt
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((category) => (
            <div key={category.name} className="transition-all duration-300">
              <button
                className="w-full p-6 rounded-lg text-left transition-all hover:shadow-lg"
                style={{
                  backgroundColor:
                    expandedCategory === category.name
                      ? colors.bgAccent
                      : colors.surfaceAccent,
                  color:
                    expandedCategory === category.name
                      ? colors.textAccent
                      : colors.textPrimary,
                  transform:
                    expandedCategory === category.name
                      ? "scale(1.02)"
                      : "scale(1)",
                }}
                onClick={() =>
                  setExpandedCategory(
                    expandedCategory === category.name ? null : category.name
                  )
                }
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{category.icon}</span>
                  <h2 className="text-xl font-serif">{category.name}</h2>
                </div>
              </button>

              {expandedCategory === category.name && (
                <div className="mt-2 space-y-2 transition-all duration-300">
                  {category.prompts.map((prompt) => (
                    <button
                      key={prompt}
                      className="w-full p-4 rounded-lg text-left hover:opacity-90 transition-all duration-200 hover:translate-x-1"
                      style={{
                        backgroundColor: colors.surfaceAccent,
                        color: colors.textPrimary,
                      }}
                      onClick={() =>
                        navigate("/prompt-writing", {
                          state: {
                            prompt,
                            fromPrompts: true,
                          },
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
