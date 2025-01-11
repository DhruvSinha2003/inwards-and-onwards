import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useTheme } from "../contexts/ThemeContext";

const PrivacyPolicy = () => {
  const { colors } = useTheme();
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen pt-24"
      style={{
        backgroundColor: colors.bgPrimary,
        backgroundImage: `linear-gradient(to bottom, ${colors.bgPrimary}, ${colors.bgSecondary})`,
      }}
    >
      <Header />
      <div
        className="max-w-2xl mx-auto px-6 py-6 rounded-xl shadow-lg mb-4"
        style={{
          backgroundColor: colors.surfaceSecondary,
          borderLeft: `3px solid ${colors.buttonBg}`,
        }}
      >
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 rounded-full text-sm hover:opacity-90 transition-opacity flex items-center"
          style={{
            backgroundColor: colors.surfaceAccent,
            color: colors.textPrimary,
          }}
        >
          ← Back to Home
        </button>
        <h1
          className="text-3xl font-serif mb-8 mt-6"
          style={{ color: colors.textPrimary }}
        >
          Privacy Policy
        </h1>

        <div className="space-y-6" style={{ color: colors.textSecondary }}>
          <section>
            <h2
              className="text-xl font-serif mb-3"
              style={{ color: colors.textPrimary }}
            >
              Data Storage & Security
            </h2>
            <ul className="space-y-2">
              <li>
                • All journal entries and personal data are stored securely
              </li>
              <li>
                • Passwords are hashed before storage using industry-standard
                encryption
              </li>
              <li>
                • Your data is accessible only to you through your authenticated
                account
              </li>
            </ul>
          </section>

          <section>
            <h2
              className="text-xl font-serif mb-3"
              style={{ color: colors.textPrimary }}
            >
              Data Usage
            </h2>
            <p>
              Your data is used solely for providing the journaling service.
            </p>
          </section>

          <section>
            <h2
              className="text-xl font-serif mb-3"
              style={{ color: colors.textPrimary }}
            >
              Contact
            </h2>
            <p>
              For any privacy-related concerns, please contact me at
              dhruv.sinha06@gmail.com
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
