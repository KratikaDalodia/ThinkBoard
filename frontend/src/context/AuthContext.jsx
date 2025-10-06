import { createContext, useState, useEffect } from "react";
import api from "@/libs/axios";
import { useNavigate } from "react-router";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setUser(JSON.parse(userData));
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });

    const token = res.data.token;
    const userObj = {
      _id: res.data._id,
      name: res.data.name,
      email: res.data.email,
    };

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userObj));

    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    setUser(userObj);
  };

  const register = async (name, email, password) => {
    const res = await api.post("/auth/register", { name, email, password });

    const token = res.data.token;
    const userObj = {
      _id: res.data._id,
      name: res.data.name,
      email: res.data.email,
    };

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userObj));

    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    setUser(userObj);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete api.defaults.headers.common["Authorization"];
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
