import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import React from "react";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const WordCountChart = ({ data, colors }) => {
  const chartData = {
    labels: data.map((d) => new Date(d.date).toLocaleDateString()),
    datasets: [
      {
        label: "Word Count",
        data: data.map((d) => d.words),
        borderColor: colors.buttonBg,
        backgroundColor: `${colors.buttonBg}33`,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: colors.buttonBg,
        pointBorderColor: colors.surfacePrimary,
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: colors.surfacePrimary,
        titleColor: colors.textPrimary,
        bodyColor: colors.textPrimary,
        borderColor: colors.buttonBg,
        borderWidth: 1,
        padding: 10,
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: {
          color: `${colors.textMuted}33`,
        },
        ticks: {
          color: colors.textSecondary,
        },
      },
      y: {
        grid: {
          color: `${colors.textMuted}33`,
        },
        ticks: {
          color: colors.textSecondary,
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ height: "300px" }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export const MonthlyEntriesChart = ({ data, colors }) => {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: "Entries",
        data: Object.values(data),
        backgroundColor: colors.buttonBg,
        borderRadius: 6,
        maxBarThickness: 40,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: colors.surfacePrimary,
        titleColor: colors.textPrimary,
        bodyColor: colors.textPrimary,
        borderColor: colors.buttonBg,
        borderWidth: 1,
        padding: 10,
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: colors.textSecondary,
        },
      },
      y: {
        grid: {
          color: `${colors.textMuted}33`,
        },
        ticks: {
          color: colors.textSecondary,
          stepSize: 1,
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ height: "300px" }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};
