import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useTheme } from "../contexts/ThemeContext";

const Home = () => {
  const { colors } = useTheme();
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col pt-20"
      style={{ backgroundColor: colors.bgPrimary }}
    >
      <Header />
      <main className="flex-1">
        <div className="text-center mb-16">
          <h1
            className="text-5xl md:text-6xl font-serif tracking-wider"
            style={{ color: colors.textPrimary }}
          >
            <span className="block md:inline">INWARDS</span>
            <span className="mx-4 italic">&</span>
            <span className="block md:inline">ONWARDS</span>
          </h1>
        </div>

        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-8">
          {/* Free Writing Card */}
          <div
            className="p-6 rounded-lg cursor-pointer hover:transform hover:scale-105 transition-all"
            style={{ backgroundColor: colors.surfaceSecondary }}
            onClick={() => navigate("/free-writing")}
          >
            <h2
              className="text-2xl font-serif mb-4"
              style={{ color: colors.textPrimary }}
            >
              Freeform Reflection
            </h2>
            <p className="text-lg" style={{ color: colors.textSecondary }}>
              Express your thoughts freely without constraints. Let your mind
              wander and your words flow naturally in this unstructured writing
              space.
            </p>
          </div>

          {/* Prompted Writing Card */}
          <div
            className="p-6 rounded-lg cursor-pointer hover:transform hover:scale-105 transition-all"
            style={{ backgroundColor: colors.surfaceSecondary }}
            onClick={() => navigate("/prompt-categories")}
          >
            <h2
              className="text-2xl font-serif mb-4"
              style={{ color: colors.textPrimary }}
            >
              Guided Journaling
            </h2>
            <p className="text-lg" style={{ color: colors.textSecondary }}>
              Explore thought-provoking prompts designed to inspire deeper
              reflection and personal growth through structured writing
              exercises.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
