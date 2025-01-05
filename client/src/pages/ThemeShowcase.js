// src/pages/ThemeShowcase.js
import React from "react";
import { useTheme } from "../contexts/ThemeContext";

const Landing = () => {
  const { theme, cycleTheme, colors } = useTheme();

  return (
    <div
      style={{ backgroundColor: colors.bgPrimary }}
      className="min-h-screen transition-colors duration-300"
    >
      <div className="max-w-4xl mx-auto px-4 py-12">
        <header className="flex justify-between items-center mb-12">
          <h1
            style={{ color: colors.textPrimary }}
            className="text-4xl font-bold"
          >
            Theme Showcase
          </h1>
          <button
            onClick={cycleTheme}
            style={{
              backgroundColor: colors.buttonBg,
              color: colors.buttonText,
            }}
            className="px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
          >
            Switch to {getNextThemeName(theme.name)}
          </button>
        </header>

        <main>
          <div className="grid gap-6">
            <ThemePreview />
            <ComponentExamples />
          </div>
        </main>
      </div>
    </div>
  );
};

const ThemePreview = () => {
  const { colors } = useTheme();

  return (
    <div
      style={{ backgroundColor: colors.surfaceSecondary }}
      className="p-6 rounded-lg"
    >
      <h2
        style={{ color: colors.textPrimary }}
        className="text-2xl font-semibold mb-4"
      >
        Current Theme Colors
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Object.entries(colors).map(([name, value]) => (
          <div key={name} className="flex flex-col gap-2">
            <div
              className="h-12 rounded-md border"
              style={{
                backgroundColor: value,
                borderColor: colors.borderPrimary,
              }}
            />
            <p style={{ color: colors.textSecondary }} className="text-sm">
              {name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const ComponentExamples = () => {
  const { colors } = useTheme();

  return (
    <div
      style={{ backgroundColor: colors.surfaceSecondary }}
      className="p-6 rounded-lg"
    >
      <h2
        style={{ color: colors.textPrimary }}
        className="text-2xl font-semibold mb-4"
      >
        Component Examples
      </h2>
      <div className="space-y-6">
        <div className="space-y-2">
          <label
            style={{ color: colors.textSecondary }}
            className="block text-sm"
          >
            Input Example
          </label>
          <input
            type="text"
            placeholder="Enter some text..."
            style={{
              backgroundColor: colors.inputBg,
              borderColor: colors.inputBorder,
              color: colors.inputText,
            }}
            className="w-full px-4 py-2 rounded-md border focus:outline-none"
          />
        </div>

        <div className="space-x-4">
          <button
            style={{
              backgroundColor: colors.buttonBg,
              color: colors.buttonText,
            }}
            className="px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
          >
            Primary Button
          </button>
          <button
            style={{
              backgroundColor: colors.buttonDisabledBg,
              color: colors.buttonText,
            }}
            className="px-4 py-2 rounded-md opacity-50 cursor-not-allowed"
            disabled
          >
            Disabled Button
          </button>
        </div>

        <div
          style={{
            backgroundColor: colors.bgAccent,
            borderColor: colors.borderAccent,
          }}
          className="p-4 rounded-md border"
        >
          <p style={{ color: colors.textAccent }}>
            This is an accent-colored container with themed text.
          </p>
        </div>
      </div>
    </div>
  );
};

const getNextThemeName = (currentTheme) => {
  switch (currentTheme) {
    case "cool":
      return "Warm";
    case "warm":
      return "Dark";
    case "dark":
    default:
      return "Cool";
  }
};

export default Landing;
