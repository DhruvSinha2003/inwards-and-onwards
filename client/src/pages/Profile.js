import { LogOut } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import JournalCard from "../components/JournalCard";

import {
  MonthlyEntriesChart,
  WordCountChart,
} from "../components/ProfileGraphs";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import api from "../utils/api";

const Profile = () => {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAllEntries, setShowAllEntries] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
  });
  const [stats, setStats] = useState({
    totalWords: 0,
    totalChars: 0,
    totalEntries: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const journalResponse = await api.get("/api/journal");
        const journalData = journalResponse.data.data;
        setEntries(journalData);
        const userData = JSON.parse(localStorage.getItem("iao-user"));
        setUser(userData);

        const totalStats = journalData.reduce(
          (acc, entry) => ({
            totalWords: acc.totalWords + entry.wordCount,
            totalChars: acc.totalChars + entry.charCount,
            totalEntries: acc.totalEntries + 1,
          }),
          { totalWords: 0, totalChars: 0, totalEntries: 0 }
        );

        setStats(totalStats);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const wordCountData = entries
    .map((entry) => ({
      date: new Date(entry.createdAt).toLocaleDateString(),
      words: entry.wordCount,
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const monthlyData = entries.reduce((acc, entry) => {
    const month = new Date(entry.createdAt).toLocaleDateString("en-US", {
      month: "short",
    });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  const handleLogout = () => {
    setTimeout(() => {
      logout();
      navigate("/landing");
    }, 200);
  };

  const latestEntries = entries.slice(0, 3);

  return (
    <div
      className="min-h-screen pt-20 transition-colors duration-300"
      style={{ backgroundColor: colors.bgPrimary }}
    >
      <Header />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
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

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-full text-sm hover:opacity-90 transition-opacity flex items-center gap-2"
            style={{
              backgroundColor: colors.buttonBg,
              color: colors.textInverted,
            }}
          >
            <LogOut size={16} /> Logout
          </button>
        </div>

        <div className="space-y-12">
          <div className="flex gap-6 items-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold"
              style={{
                backgroundColor: colors.buttonBg,
                color: colors.textInverted,
              }}
            >
              {user.username[0]?.toUpperCase()}
            </div>
            <div>
              <h2
                className="text-2xl font-bold"
                style={{ color: colors.textPrimary }}
              >
                {user.username}
              </h2>
              <p className="text-sm" style={{ color: colors.textSecondary }}>
                {user.email}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {[
              { label: "Entries", value: stats.totalEntries },
              { label: "Words", value: stats.totalWords },
              { label: "Characters", value: stats.totalChars },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-6 rounded-xl text-center"
                style={{ backgroundColor: colors.surfaceAccent }}
              >
                <p
                  className="text-sm mb-1"
                  style={{ color: colors.textSecondary }}
                >
                  {stat.label}
                </p>
                <p
                  className="text-3xl font-bold"
                  style={{ color: colors.textPrimary }}
                >
                  {stat.value.toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-8">
              <div
                className="p-6 rounded-xl"
                style={{ backgroundColor: colors.surfaceSecondary }}
              >
                <h3
                  className="text-lg font-medium mb-4"
                  style={{ color: colors.textPrimary }}
                >
                  Word Count Timeline
                </h3>
                <WordCountChart data={wordCountData} colors={colors} />
              </div>

              <div
                className="p-6 rounded-xl"
                style={{ backgroundColor: colors.surfaceSecondary }}
              >
                <h3
                  className="text-lg font-medium mb-4"
                  style={{ color: colors.textPrimary }}
                >
                  Monthly Entries
                </h3>
                <MonthlyEntriesChart data={monthlyData} colors={colors} />
              </div>
            </div>

            <div
              className="space-y-3 p-6 rounded-xl"
              style={{ backgroundColor: colors.surfaceSecondary }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3
                  className="text-lg font-medium"
                  style={{ color: colors.textPrimary }}
                >
                  Recent Entries
                </h3>
                <button
                  onClick={() => setShowAllEntries(true)}
                  className="text-sm font-medium hover:opacity-80 transition-opacity"
                  style={{ color: colors.buttonBg }}
                >
                  Show All
                </button>
              </div>
              {!loading &&
                latestEntries.map((entry) => (
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
          </div>
        </div>
      </div>

      {showAllEntries && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: colors.bgOverlay }}
        >
          <div
            className="w-full max-w-3xl max-h-[80vh] overflow-y-auto rounded-2xl p-6"
            style={{ backgroundColor: colors.surfacePrimary }}
          >
            <div className="flex justify-between items-center mb-6">
              <h3
                className="text-xl font-bold"
                style={{ color: colors.textPrimary }}
              >
                All Entries
              </h3>
              <button
                onClick={() => setShowAllEntries(false)}
                className="p-2 rounded-full hover:opacity-80 transition-opacity"
                style={{ color: colors.textPrimary }}
              >
                ✕
              </button>
            </div>
            <div className="space-y-3">
              {!loading &&
                entries.map((entry) => (
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
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Profile;
