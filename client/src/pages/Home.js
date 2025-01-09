import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import JournalCard from "../components/JournalCard";
import { useTheme } from "../contexts/ThemeContext";
import api from "../utils/api";

const Home = () => {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const [welcomeIndex, setWelcomeIndex] = useState(0);
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

  useEffect(() => {
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

    const interval = setInterval(() => {
      setWelcomeIndex((prev) => (prev + 1) % welcomePhrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="min-h-screen pt-24"
      style={{ backgroundColor: colors.bgPrimary }}
    >
      <Header />
      <div
        className="max-w-5xl mx-auto px-4 py-12 rounded-lg "
        style={{ backgroundColor: colors.bgSecondary }}
      >
        <div className="text-center mb-20">
          <h1
            className="text-6xl md:text-7xl font-serif tracking-wider mb-8"
            style={{ color: colors.textPrimary }}
          >
            <span className="block md:inline">INWARDS</span>
            <span className="mx-4 italic">&</span>
            <span className="block md:inline">ONWARDS</span>
          </h1>
          <h2
            className="text-2xl font-serif animate-fade-in"
            style={{ color: colors.textAccent }}
          >
            {welcomePhrases[welcomeIndex]}, {userData.username}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div
            className="p-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
            style={{ backgroundColor: colors.surfaceAccent }}
            onClick={() => navigate("/free-writing")}
          >
            <h2
              className="text-3xl font-serif mb-4"
              style={{ color: colors.textPrimary }}
            >
              Free Writing
            </h2>
            <p style={{ color: colors.textSecondary }}>
              Express yourself freely in an open space for reflection and
              growth.
            </p>
          </div>

          <div
            className="p-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
            style={{ backgroundColor: colors.surfaceAccent }}
            onClick={() => navigate("/prompt-categories")}
          >
            <h2
              className="text-3xl font-serif mb-4"
              style={{ color: colors.textPrimary }}
            >
              Guided Writing
            </h2>
            <p style={{ color: colors.textSecondary }}>
              Follow thoughtful prompts designed to deepen your self-reflection.
            </p>
          </div>
        </div>

        <section className="mb-16">
          <h2
            className="text-3xl font-serif mb-6"
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
