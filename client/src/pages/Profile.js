import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useTheme } from "../contexts/ThemeContext";
import api from "../utils/api";

const Profile = () => {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
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

        // Get user data from localStorage since it's stored there after login
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

  return (
    <div
      className="min-h-screen pt-28 transition-colors duration-300"
      style={{ backgroundColor: colors.bgPrimary }}
    >
      <Header />
      <div
        className="max-w-6xl mx-auto px-4 py-8 rounded-lg"
        style={{ backgroundColor: colors.surfaceSecondary }}
      >
        <div className="mb-8">
          <h2
            className="text-2xl font-bold mb-4"
            style={{ color: colors.textPrimary }}
          >
            Profile Information
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div
              className="p-4 rounded-lg"
              style={{ backgroundColor: colors.bgAccent }}
            >
              <p style={{ color: colors.textSecondary }}>Username</p>
              <p className="text-xl" style={{ color: colors.textPrimary }}>
                {user.username}
              </p>
            </div>
            <div
              className="p-4 rounded-lg"
              style={{ backgroundColor: colors.bgAccent }}
            >
              <p style={{ color: colors.textSecondary }}>Email</p>
              <p className="text-xl" style={{ color: colors.textPrimary }}>
                {user.email}
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div
            className="p-6 rounded-lg text-center"
            style={{ backgroundColor: colors.surfaceAccent }}
          >
            <h3
              className="text-xl mb-2"
              style={{ color: colors.textSecondary }}
            >
              Total Entries
            </h3>
            <p
              className="text-3xl font-bold"
              style={{ color: colors.textPrimary }}
            >
              {stats.totalEntries}
            </p>
          </div>
          <div
            className="p-6 rounded-lg text-center"
            style={{ backgroundColor: colors.surfaceAccent }}
          >
            <h3
              className="text-xl mb-2"
              style={{ color: colors.textSecondary }}
            >
              Total Words
            </h3>
            <p
              className="text-3xl font-bold"
              style={{ color: colors.textPrimary }}
            >
              {stats.totalWords}
            </p>
          </div>
          <div
            className="p-6 rounded-lg text-center"
            style={{ backgroundColor: colors.surfaceAccent }}
          >
            <h3
              className="text-xl mb-2"
              style={{ color: colors.textSecondary }}
            >
              Total Characters
            </h3>
            <p
              className="text-3xl font-bold"
              style={{ color: colors.textPrimary }}
            >
              {stats.totalChars}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {!loading &&
            entries.map((entry) => (
              <div
                key={entry._id}
                className="p-4 rounded-lg flex justify-between items-center"
                style={{ backgroundColor: colors.surfacePrimary }}
              >
                <div>
                  <h3
                    className="text-xl mb-2"
                    style={{ color: colors.textPrimary }}
                  >
                    {entry.heading || entry.promptText}
                  </h3>
                  <p style={{ color: colors.textSecondary }}>
                    {new Date(entry.createdAt).toLocaleDateString()} •{" "}
                    {entry.wordCount} words
                  </p>
                </div>
                <button
                  className="px-4 py-2 rounded hover:opacity-90 transition-opacity"
                  style={{
                    backgroundColor: colors.buttonBg,
                    color: colors.buttonText,
                  }}
                  onClick={() => navigate(`/edit/${entry._id}`)}
                >
                  Edit
                </button>
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
