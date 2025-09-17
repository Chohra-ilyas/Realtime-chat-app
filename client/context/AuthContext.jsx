import { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const backendURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendURL;
axios.defaults.headers.common["token"] = localStorage.getItem("token");

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [authUser, setAuthUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socket, setSocket] = useState(null);

  // Check if user is authenticated and if so, set the user data and connect to socket
  const checkAuth = async () => {
    try {
      const { data } = await axios.get("/api/users/auth/check");
      if (data.success) {
        setAuthUser(data.user);
        connectSocket(data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Login function to hanlde user authentication and socket connection
  const login = async (state, credentials) => {
    try {
      const { data } = await axios.post(
        `/api/users/auth/${state}`,
        credentials
      );
      if (data.success) {
        setAuthUser(data.user);
        connectSocket(data.user);
        axios.defaults.headers.common["token"] = data.token;
        localStorage.setItem("token", data.token);
        console.log(data);
        setToken(data.token);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Logout function to clear user data and disconnect from socket
  const logout = () => {
    setAuthUser(null);
    setOnlineUsers([]);
    setToken(null);
    localStorage.removeItem("token");
    axios.defaults.headers.common["token"] = null;
    if (socket) {
      socket.disconnect();
      setSocket(null);
    }
    toast.success("Logged out successfully");
  };

  // Update profile function to update user data
  const updateProfile = async (updatedUser) => {
    try {
      const { data } = await axios.put(
        "/api/users/update-profile",
        updatedUser
      );
      if (data.success) {
        setAuthUser(data.user);
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // connect to socket server
  const connectSocket = (userData) => {
    if (!userData || socket?.connected) return;
    const newSocket = io(backendURL, {
      query: {
        userId: userData._id,
      },
    });
    newSocket.connect();
    setSocket(newSocket);

    newSocket.on("getOnlineUsers", (userIds) => {
      setOnlineUsers(userIds);
    });
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["token"] = token;
    }
    checkAuth();
  }, [token]);

  const value = {
    axios,
    token,
    authUser,
    onlineUsers,
    socket,
    login,
    logout,
    updateProfile,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
