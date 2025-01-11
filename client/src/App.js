import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import ComponentShowcase from "./pages/ComponentShowcase";
import EditJournal from "./pages/Edit";
import ForgotPassword from "./pages/ForgotPassword";
import FreeWriting from "./pages/FreeWriting";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Profile from "./pages/Profile";
import PromptCategories from "./pages/PromptCategories";
import PromptWriting from "./pages/PromptWriting";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import ThemeShowcase from "./pages/ThemeShowcase";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/landing" />;
  }
  return children;
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/free-writing"
              element={
                <ProtectedRoute>
                  <FreeWriting />
                </ProtectedRoute>
              }
            />
            <Route
              path="/prompt-categories"
              element={
                <ProtectedRoute>
                  <PromptCategories />
                </ProtectedRoute>
              }
            />
            <Route
              path="/prompt-writing"
              element={
                <ProtectedRoute>
                  <PromptWriting />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit/:entryId"
              element={
                <ProtectedRoute>
                  <EditJournal />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/theme"
              element={
                <ProtectedRoute>
                  <ThemeShowcase />
                </ProtectedRoute>
              }
            />
            <Route
              path="/component"
              element={
                <ProtectedRoute>
                  <ComponentShowcase />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
