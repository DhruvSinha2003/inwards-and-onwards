import React, { useState } from "react";
import { ImageFrame } from "../components/ImageFrame";
import { JournalCard } from "../components/JournalCard";
import { JournalInput } from "../components/JournalInput";
import { JournalTable } from "../components/JournalTable";
import { PromptCard } from "../components/PromptCard";

import { useTheme } from "../contexts/ThemeContext";

const ComponentShowcase = () => {
  const { cycleTheme, colors } = useTheme();
  const [journalText, setJournalText] = useState("");

  const sampleEntries = [
    { date: "2025-01-08", title: "Morning Reflections", wordCount: 543 },
    { date: "2025-01-07", title: "Evening Thoughts", wordCount: 325 },
    { date: "2025-01-06", title: "Midday Musings", wordCount: 678 },
  ];

  return (
    <div
      style={{ backgroundColor: colors.bgPrimary }}
      className="min-h-screen transition-colors duration-300"
    >
      <div className="max-w-4xl mx-auto px-4 py-12">
        <header className="flex justify-between items-center mb-12">
          <h1
            style={{ color: colors.textPrimary }}
            className="text-4xl font-serif"
          >
            Component Showcase
          </h1>
          <button
            onClick={cycleTheme}
            style={{
              backgroundColor: colors.buttonBg,
              color: colors.buttonText,
            }}
            className="px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
          >
            Switch Theme
          </button>
        </header>

        <main className="space-y-12">
          <section>
            <h2
              className="text-2xl font-serif mb-6"
              style={{ color: colors.textPrimary }}
            >
              Journal Cards
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <JournalCard
                title="Morning Reflections"
                date="January 8, 2025"
                preview="Today started with a peaceful meditation session. The silence was broken only by the gentle patter of rain against my window..."
                content="Today started with a peaceful meditation session. The silence was broken only by the gentle patter of rain against my window. These quiet moments have become increasingly precious to me, offering a sanctuary of calm before the day begins in earnest."
              />
              <JournalCard
                title="Evening Thoughts"
                date="January 7, 2025"
                preview="As the sun sets on another day, I find myself reflecting on the small victories and lessons learned..."
                content="As the sun sets on another day, I find myself reflecting on the small victories and lessons learned. Today was filled with unexpected challenges, but each one brought its own opportunity for growth."
              />
            </div>
          </section>

          <section>
            <h2
              className="text-2xl font-serif mb-6"
              style={{ color: colors.textPrimary }}
            >
              Journal Input
            </h2>
            <JournalInput
              value={journalText}
              onChange={(e) => setJournalText(e.target.value)}
              placeholder="Start writing your thoughts..."
            />
          </section>

          <section>
            <h2
              className="text-2xl font-serif mb-6"
              style={{ color: colors.textPrimary }}
            >
              Writing Prompts
            </h2>
            <div className="grid gap-4">
              <PromptCard prompt="What made you smile today?" />
              <PromptCard prompt="Describe a small act of kindness you witnessed or performed." />
              <PromptCard prompt="What's a challenge you're facing, and what's one step you can take towards overcoming it?" />
            </div>
          </section>

          <section>
            <h2
              className="text-2xl font-serif mb-6"
              style={{ color: colors.textPrimary }}
            >
              Journal Entries Table
            </h2>
            <JournalTable entries={sampleEntries} />
          </section>

          <section>
            <h2
              className="text-2xl font-serif mb-6"
              style={{ color: colors.textPrimary }}
            >
              Custom Image Frames
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              <ImageFrame
                src="https://images.unsplash.com/photo-1736268020819-7a6b3478b692?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Sample journal image 1"
              />
              <ImageFrame
                src="https://plus.unsplash.com/premium_photo-1736246143958-ca36c5cf29bd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D"
                alt="Sample journal image 2"
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ComponentShowcase;
