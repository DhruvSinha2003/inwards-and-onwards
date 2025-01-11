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
        className="max-w-4xl mx-auto px-5 py-12  rounded-xl shadow-lg mb-4"
        style={{
          backgroundColor: colors.surfaceSecondary,
          borderLeft: `3px solid ${colors.buttonBg}`,
        }}
      >
        <div className="text-center mb-16">
          <div
            className="inline-block px-6 py-1.5 rounded-full mb-4"
            style={{ backgroundColor: colors.bgAccent }}
          >
            <h2
              className="text-lg font-serif"
              style={{ color: colors.textAccent }}
            >
              {randomPhrase}, {userData.username}
            </h2>
          </div>
          <h1
            className="text-4xl md:text-5xl font-serif tracking-wide"
            style={{ color: colors.textPrimary }}
          >
            <span className="block md:inline">INWARDS</span>
            <span className="mx-3 italic">&</span>
            <span className="block md:inline">ONWARDS</span>
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <button
            className="group p-6 rounded-lg shadow-md transform hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
            style={{
              backgroundColor: colors.surfaceAccent,
              border: `1px solid ${colors.borderPrimary}`,
            }}
            onClick={() => navigate("/free-writing")}
          >
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <PenLine size={20} style={{ color: colors.textAccent }} />
                <h2
                  className="text-xl font-serif"
                  style={{ color: colors.textPrimary }}
                >
                  Free Writing
                </h2>
              </div>
              <p
                className="text-sm mb-3"
                style={{ color: colors.textSecondary }}
              >
                Express yourself freely in an open space for reflection and
                growth.
              </p>
              <span
                className="inline-block text-xs font-medium"
                style={{ color: colors.textAccent }}
              >
                Start Writing →
              </span>
            </div>
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300"
              style={{ backgroundColor: colors.textAccent }}
            />
          </button>

          <button
            className="group p-6 rounded-lg shadow-md transform hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
            style={{
              backgroundColor: colors.surfaceAccent,
              border: `1px solid ${colors.borderPrimary}`,
            }}
            onClick={() => navigate("/prompt-categories")}
          >
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <Book size={20} style={{ color: colors.textAccent }} />
                <h2
                  className="text-xl font-serif"
                  style={{ color: colors.textPrimary }}
                >
                  Guided Writing
                </h2>
              </div>
              <p
                className="text-sm mb-3"
                style={{ color: colors.textSecondary }}
              >
                Follow thoughtful prompts designed to deepen your
                self-reflection.
              </p>
              <span
                className="inline-block text-xs font-medium"
                style={{ color: colors.textAccent }}
              >
                Explore Prompts →
              </span>
            </div>
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300"
              style={{ backgroundColor: colors.textAccent }}
            />
          </button>
        </div>

        <section>
          <h2
            className="text-2xl font-serif mb-6"
            style={{ color: colors.textPrimary }}
          >
            Recent Entries
          </h2>
          <div className="grid gap-4">
            {!loading &&
              recentEntries.map((entry) => (
                <JournalCard
                  key={entry._id}
                  entryId={entry._id}
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
