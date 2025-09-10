import { createContext, useState } from "react";
import axios from "axios";
const backendURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendURL;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [authUser, setAuthUser] = useState(null);
  const [onlineUser, setOnlineUser] = useState([]);
  const [socket, setSocket] = useState(null);

  // Check if user is authenticated and if so, set the user data and connect to socket
    const checkAuth = async () => {
        try {
            const data = await axios.get("/api/users/auth/check");
            if (data.success) {
                setAuthUser(data.user);
            }
        } catch (error) {
            
        }
    }

  const value = {
    axios,
    token,
    authUser,
    onlineUser,
    socket,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
