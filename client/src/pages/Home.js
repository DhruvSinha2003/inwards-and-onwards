import { Book, PenLine } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import JournalCard from "../components/JournalCard";
import { useTheme } from "../contexts/ThemeContext";
import api from "../utils/api";

const Home = () => {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const [recentEntries, setRecentEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const userData = JSON.parse(localStorage.getItem("iao-user") || "{}");

  // Get a random welcome phrase when the component mounts
  const welcomePhrases = [
    "Welcome back",
    "Great to see you",
    "Hello again",
    "Ready to reflect",
    "Time to write",
  ];
  const randomPhrase =
    welcomePhrases[Math.floor(Math.random() * welcomePhrases.length)];

  React.useEffect(() => {
    const fetchEntries = async () => {
      try {
        setLoading(true);
        const response = await api.get("/api/journal");
        setRecentEntries(response.data.data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching entries:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEntries();
  }, []);

  return (
    <div
      className="min-h-screen pt-24 relative"
      style={{
        backgroundColor: colors.bgPrimary,
        backgroundImage: `linear-gradient(to bottom, ${colors.bgPrimary}, ${colors.bgSecondary})`,
      }}
    >
      <Header />
      <div
        className="max-w-5xl mx-auto px-6 py-16 rounded-2xl shadow-xl"
        style={{
          backgroundColor: colors.surfaceSecondary,
          borderLeft: `4px solid ${colors.buttonBg}`,
        }}
      >
        <div className="text-center mb-24">
          <div
            className="inline-block px-8 py-2 rounded-full mb-6"
            style={{ backgroundColor: colors.bgAccent }}
          >
            <h2
              className="text-2xl font-serif"
              style={{ color: colors.textAccent }}
            >
              {randomPhrase}, {userData.username}
            </h2>
          </div>
          <h1
            className="text-6xl md:text-7xl font-serif tracking-wider mb-4"
            style={{ color: colors.textPrimary }}
          >
            <span className="block md:inline">INWARDS</span>
            <span className="mx-4 italic">&</span>
            <span className="block md:inline">ONWARDS</span>
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <button
            className="group p-8 rounded-xl shadow-lg transform hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
            style={{
              backgroundColor: colors.surfaceAccent,
              border: `2px solid ${colors.borderPrimary}`,
            }}
            onClick={() => navigate("/free-writing")}
          >
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <PenLine size={28} style={{ color: colors.textAccent }} />
                <h2
                  className="text-3xl font-serif"
                  style={{ color: colors.textPrimary }}
                >
                  Free Writing
                </h2>
              </div>
              <p className="mb-4" style={{ color: colors.textSecondary }}>
                Express yourself freely in an open space for reflection and
                growth.
              </p>
              <span
                className="inline-block text-sm font-medium"
                style={{ color: colors.textAccent }}
              >
                Start Writing →
              </span>
            </div>
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
              style={{ backgroundColor: colors.textAccent }}
            />
          </button>

          <button
            className="group p-8 rounded-xl shadow-lg transform hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
            style={{
              backgroundColor: colors.surfaceAccent,
              border: `2px solid ${colors.borderPrimary}`,
            }}
            onClick={() => navigate("/prompt-categories")}
          >
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <Book size={28} style={{ color: colors.textAccent }} />
                <h2
                  className="text-3xl font-serif"
                  style={{ color: colors.textPrimary }}
                >
                  Guided Writing
                </h2>
              </div>
              <p className="mb-4" style={{ color: colors.textSecondary }}>
                Follow thoughtful prompts designed to deepen your
                self-reflection.
              </p>
              <span
                className="inline-block text-sm font-medium"
                style={{ color: colors.textAccent }}
              >
                Explore Prompts →
              </span>
            </div>
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
              style={{ backgroundColor: colors.textAccent }}
            />
          </button>
        </div>

        <section>
          <h2
            className="text-3xl font-serif mb-8"
            style={{ color: colors.textPrimary }}
          >
            Recent Entries
          </h2>
          <div className="grid gap-6">
            {!loading &&
              recentEntries.map((entry) => (
                <JournalCard
                  key={entry._id}
                  title={entry.heading || entry.promptText}
                  date={new Date(entry.createdAt).toLocaleDateString()}
                  preview={entry.preview}
                  content={entry.content}
                />
              ))}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
