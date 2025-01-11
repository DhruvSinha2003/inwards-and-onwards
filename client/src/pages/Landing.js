import { BookHeart, Feather, Sparkles } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import ThemeSelector from "../components/ThemeSelector";
import { useTheme } from "../contexts/ThemeContext";

const LandingPage = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundColor: theme.colors.bgPrimary,
        backgroundImage: `linear-gradient(to bottom, ${theme.colors.bgPrimary}, ${theme.colors.bgSecondary})`,
      }}
    >
      <nav className="fixed w-full top-0 z-10 flex justify-between items-center px-4 py-3">
        <div
          className="w-8 h-8 rounded-full cursor-pointer flex items-center justify-center"
          style={{ backgroundColor: theme.colors.surfaceAccent }}
        >
          <ThemeSelector />
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-16">
            <div
              className="inline-block px-6 py-1.5 rounded-full mb-12"
              style={{ backgroundColor: theme.colors.bgAccent }}
            >
              <h2
                className="text-lg font-serif"
                style={{ color: theme.colors.textAccent }}
              >
                Your Digital Space for Self-Discovery
              </h2>
            </div>

            <h1
              className="text-5xl md:text-6xl font-serif tracking-wider mb-12"
              style={{ color: theme.colors.textPrimary }}
            >
              <span className="block md:inline">INWARDS</span>
              <span className="mx-4 italic">&</span>
              <span className="block md:inline">ONWARDS</span>
            </h1>

            <p
              className="text-xl mb-16 max-w-2xl mx-auto"
              style={{ color: theme.colors.textSecondary }}
            >
              A mindful journaling companion that helps you reflect, grow, and
              discover deeper insights about yourself.
            </p>

            <button
              className="font-serif tracking-wide text-xl px-12 py-4 rounded-lg transition-all duration-300 transform hover:-translate-y-1"
              style={{
                backgroundColor: theme.colors.buttonBg,
                color: theme.colors.buttonText,
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
              onClick={() => navigate("/Login")}
            >
              BEGIN YOUR JOURNEY
            </button>
          </div>

          <div
            className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto px-4"
            style={{ color: theme.colors.textPrimary }}
          >
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Feather size={32} style={{ color: theme.colors.textAccent }} />
              </div>
              <h3 className="font-serif text-lg mb-2">Free Writing</h3>
              <p
                className="text-sm"
                style={{ color: theme.colors.textSecondary }}
              >
                Express yourself freely without constraints
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <BookHeart
                  size={32}
                  style={{ color: theme.colors.textAccent }}
                />
              </div>
              <h3 className="font-serif text-lg mb-2">Guided Prompts</h3>
              <p
                className="text-sm"
                style={{ color: theme.colors.textSecondary }}
              >
                Thoughtfully crafted prompts for deeper reflection
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Sparkles
                  size={32}
                  style={{ color: theme.colors.textAccent }}
                />
              </div>
              <h3 className="font-serif text-lg mb-2">Personal Growth</h3>
              <p
                className="text-sm"
                style={{ color: theme.colors.textSecondary }}
              >
                Track your journey of self-discovery
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
