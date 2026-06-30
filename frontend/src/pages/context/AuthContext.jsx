import { createContext, useContext, useState, useEffect } from "react";
import { getMe, logout as logoutApi } from "../../services/authApi.js";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const res = await getMe();
      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
    } catch (err) {
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
    setLoading(false);
  };

  const loginUser = (userData, token) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    if (token) {
      localStorage.setItem("token", token);
    }
  };

  const logoutUser = async () => {
    try {
      await logoutApi();
    } catch (err) {}
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginUser, logoutUser, checkUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
