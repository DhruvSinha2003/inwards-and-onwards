import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("AuthProvider: Checking localStorage for existing session");
    const token = localStorage.getItem("iao-token");
    const userData = localStorage.getItem("iao-user");

    if (token && userData) {
      console.log("Found existing session:", {
        token: token ? "Present" : "Missing",
        userData: userData ? "Present" : "Missing",
      });
      try {
        setUser(JSON.parse(userData));
      } catch (err) {
        console.error("Error parsing stored user data:", err);
        localStorage.removeItem("iao-token");
        localStorage.removeItem("iao-user");
      }
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    console.log("AuthProvider: Setting user session", {
      userData: userData ? "Present" : "Missing",
      token: token ? "Present" : "Missing",
    });
    setUser(userData);
    localStorage.setItem("iao-token", token);
    localStorage.setItem("iao-user", JSON.stringify(userData));
  };

  const logout = () => {
    console.log("AuthProvider: Clearing user session");
    setUser(null);
    localStorage.removeItem("iao-token");
    localStorage.removeItem("iao-user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
