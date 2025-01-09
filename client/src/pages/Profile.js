import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
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

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [journalResponse, userResponse] = await Promise.all([
          api.get("/api/journal"),
          api.get("/api/user/profile"),
        ]);

        const journalData = journalResponse.data.data;
        setEntries(journalData);
        setUser(userResponse.data);

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

  // Prepare data for charts
  const wordCountByDay = entries.reduce((acc, entry) => {
    const date = new Date(entry.createdAt).toLocaleDateString();
    acc[date] = (acc[date] || 0) + entry.wordCount;
    return acc;
  }, {});

  const wordCountData = Object.entries(wordCountByDay).map(([date, count]) => ({
    date,
    words: count,
  }));

  const entriesPerMonth = entries.reduce((acc, entry) => {
    const month = new Date(entry.createdAt).toLocaleDateString("en-US", {
      month: "short",
    });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  const monthlyData = Object.entries(entriesPerMonth).map(([month, count]) => ({
    month,
    entries: count,
  }));

  const promptVsCustom = entries.reduce(
    (acc, entry) => {
      if (entry.isPromptBased) {
        acc.prompt += 1;
      } else {
        acc.custom += 1;
      }
      return acc;
    },
    { prompt: 0, custom: 0 }
  );

  const pieData = [
    { name: "Prompt Based", value: promptVsCustom.prompt },
    { name: "Custom", value: promptVsCustom.custom },
  ];

  return (
    <div
      className="min-h-screen pt-28"
      style={{ backgroundColor: colors.bgPrimary }}
    >
      <div
        className="max-w-6xl mx-auto px-4 py-8 rounded-lg"
        style={{ backgroundColor: colors.bgSecondary }}
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
              style={{ backgroundColor: colors.surfaceAccent }}
            >
              <p style={{ color: colors.textSecondary }}>Username</p>
              <p className="text-xl" style={{ color: colors.textPrimary }}>
                {user.username}
              </p>
            </div>
            <div
              className="p-4 rounded-lg"
              style={{ backgroundColor: colors.surfaceAccent }}
            >
              <p style={{ color: colors.textSecondary }}>Email</p>
              <p className="text-xl" style={{ color: colors.textPrimary }}>
                {user.email}
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Stats cards remain the same */}
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

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Daily Word Count</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={wordCountData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="words" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Entries</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="entries" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Entry Types Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          {/* Entries list remains the same */}
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
    </div>
  );
};

export default Profile;
