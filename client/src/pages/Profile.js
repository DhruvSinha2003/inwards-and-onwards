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

  const WordCountGraph = () => {
    if (wordCountData.length === 0) return null;

    const width = 600;
    const height = 200;
    const padding = {
      top: 20,
      right: 20,
      bottom: 30,
      left: 40,
    };

    const maxWords = Math.max(...wordCountData.map((d) => d.words));
    const points = wordCountData.map((d, i) => ({
      x:
        (i * (width - padding.left - padding.right)) /
          (wordCountData.length - 1) +
        padding.left,
      y:
        height -
        padding.bottom -
        (d.words / maxWords) * (height - padding.top - padding.bottom),
    }));

    const pathD = points.reduce(
      (acc, point, i) =>
        i === 0 ? `M ${point.x},${point.y}` : `${acc} L ${point.x},${point.y}`,
      ""
    );

    return (
      <div className="overflow-hidden rounded-lg">
        <svg
          width="100%"
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          style={{ display: "block" }}
        >
          <rect
            x="0"
            y="0"
            width={width}
            height={height}
            fill={colors.surfacePrimary}
          />
          <path
            d={pathD}
            fill="none"
            stroke={colors.buttonBg}
            strokeWidth="2"
          />
          {points.map((point, i) => (
            <circle
              key={i}
              cx={point.x}
              cy={point.y}
              r="4"
              fill={colors.buttonBg}
            />
          ))}
          {/* Y-axis label */}
          <text
            x={padding.left / 2}
            y={height / 2}
            transform={`rotate(-90 ${padding.left / 2} ${height / 2})`}
            textAnchor="middle"
            fill={colors.textSecondary}
            fontSize="12"
          >
            Words
          </text>
          {/* X-axis label */}
          <text
            x={width / 2}
            y={height - 8}
            textAnchor="middle"
            fill={colors.textSecondary}
            fontSize="12"
          >
            Time →
          </text>
        </svg>
      </div>
    );
  };

  // Simple bar graph for monthly entries
  const MonthlyEntriesGraph = () => {
    const months = Object.keys(monthlyData);
    if (months.length === 0) return null;

    const width = 600;
    const height = 200;
    const padding = {
      top: 20,
      right: 20,
      bottom: 40,
      left: 40,
    };
    const barPadding = 4;
    const barWidth =
      (width -
        padding.left -
        padding.right -
        (months.length - 1) * barPadding) /
      months.length;

    const maxEntries = Math.max(...Object.values(monthlyData));

    return (
      <div className="overflow-hidden rounded-lg">
        <svg
          width="100%"
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          style={{ display: "block" }}
        >
          <rect
            x="0"
            y="0"
            width={width}
            height={height}
            fill={colors.surfacePrimary}
          />
          {months.map((month, i) => {
            const barHeight =
              (monthlyData[month] / maxEntries) *
              (height - padding.top - padding.bottom);
            const x = i * (barWidth + barPadding) + padding.left;
            const y = height - padding.bottom - barHeight;

            return (
              <g key={month}>
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  fill={colors.buttonBg}
                  opacity={0.8}
                />
                <text
                  x={x + barWidth / 2}
                  y={height - padding.bottom + 16}
                  textAnchor="middle"
                  fill={colors.textSecondary}
                  fontSize="12"
                >
                  {month}
                </text>
              </g>
            );
          })}
          {/* Y-axis label */}
          <text
            x={padding.left / 2}
            y={height / 2}
            transform={`rotate(-90 ${padding.left / 2} ${height / 2})`}
            textAnchor="middle"
            fill={colors.textSecondary}
            fontSize="12"
          >
            Entries
          </text>
          {/* X-axis label */}
          <text
            x={width / 2}
            y={height - 8}
            textAnchor="middle"
            fill={colors.textSecondary}
            fontSize="12"
          >
            Months
          </text>
        </svg>
      </div>
    );
  };

  return (
    <div
      className="min-h-screen pt-20 transition-colors duration-300"
      style={{ backgroundColor: colors.bgPrimary }}
    >
      <Header />
      <div className="max-w-5xl mx-auto px-6 py-8">
        <button
          onClick={() => navigate("/")}
          className="mb-8 px-4 py-2 rounded-full text-sm hover:opacity-90 transition-opacity flex items-center gap-2"
          style={{
            backgroundColor: colors.surfaceAccent,
            color: colors.textPrimary,
          }}
        >
          ← Back to Home
        </button>

        <div className="space-y-12">
          {/* User Info */}
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

          {/* Stats */}
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

          {/* Graphs */}
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
              <WordCountGraph />
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
              <MonthlyEntriesGraph />
            </div>
          </div>

          {/* Entries List */}
          <div
            className="space-y-3 p-6 rounded-xl"
            style={{ backgroundColor: colors.surfaceSecondary }}
          >
            <h3
              className="text-lg font-medium"
              style={{ color: colors.textPrimary }}
            >
              Recent Entries
            </h3>
            {!loading &&
              entries.map((entry) => (
                <div
                  key={entry._id}
                  className="p-4 rounded-xl flex justify-between items-center hover:opacity-90 transition-opacity cursor-pointer"
                  style={{ backgroundColor: colors.surfacePrimary }}
                  onClick={() => navigate(`/edit/${entry._id}`)}
                >
                  <div>
                    <h4
                      className="font-medium"
                      style={{ color: colors.textPrimary }}
                    >
                      {entry.heading || entry.promptText}
                    </h4>
                    <p
                      className="text-sm"
                      style={{ color: colors.textSecondary }}
                    >
                      {new Date(entry.createdAt).toLocaleDateString()} •{" "}
                      {entry.wordCount} words
                    </p>
                  </div>
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: colors.buttonBg,
                      color: colors.textInverted,
                    }}
                  >
                    →
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
