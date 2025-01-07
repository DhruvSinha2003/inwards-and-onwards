import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("iao-token");
    const userData = localStorage.getItem("iao-user");
    if (token && user) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("iao-token", token);
    localStorage.setItem("iao-user", JSON.stringify(userData)); // Fix: Correct the user data storage
  };

  const logout = (userData, token) => {
    localStorage.removeItem("iao-token");
    localStorage.removeItem("iao-user");
  };
  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
