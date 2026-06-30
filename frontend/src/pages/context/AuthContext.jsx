import { createContext, useContext, useState, useEffect } from "react";
import { getMe, logout as logoutApi } from "../../services/authApi.js";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const res = await getMe();
      setUser(res.data.user);
    } catch (err) {
      setUser(null);
    }
    setLoading(false);
  };

  const loginUser = (userData) => {
    setUser(userData);
  };

  const logoutUser = async () => {
    try {
      await logoutApi();
    } catch (err) {}
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginUser, logoutUser, checkUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
