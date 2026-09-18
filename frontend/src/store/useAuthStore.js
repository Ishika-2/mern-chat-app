import { create } from "zustand";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

import { axiosInstance } from "../lib/axios.js";

const SOCKET_URL = "http://localhost:5000";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  onlineUsers: [],
  socket: null,

  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/check");

      set({
        authUser: response.data,
      });

      get().connectSocket();
    } catch (error) {
      console.log(
        "Error in checkAuth:",
        error.response?.data?.message
      );

      set({
        authUser: null,
      });
    } finally {
      set({
        isCheckingAuth: false,
      });
    }
  },

  signup: async (formData) => {
    set({
      isSigningUp: true,
    });

    try {
      const response = await axiosInstance.post(
        "/auth/signup",
        formData
      );

      set({
        authUser: response.data,
      });

      get().connectSocket();

      toast.success("Account created successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to create account"
      );
    } finally {
      set({
        isSigningUp: false,
      });
    }
  },

  login: async (formData) => {
    set({
      isLoggingIn: true,
    });

    try {
      const response = await axiosInstance.post(
        "/auth/login",
        formData
      );

      set({
        authUser: response.data,
      });

      get().connectSocket();

      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to log in"
      );
    } finally {
      set({
        isLoggingIn: false,
      });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");

      get().disconnectSocket();

      set({
        authUser: null,
      });

      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to log out"
      );
    }
  },

  updateProfile: async (profileData) => {
    set({
      isUpdatingProfile: true,
    });

    try {
      const response = await axiosInstance.patch(
        "/auth/update-profile",
        profileData
      );

      set({
        authUser: response.data,
      });

      toast.success("Profile picture updated");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to update profile"
      );
    } finally {
      set({
        isUpdatingProfile: false,
      });
    }
  },

  connectSocket: () => {
    const { authUser, socket } = get();

    if (!authUser || socket?.connected) {
      return;
    }

    const newSocket = io(SOCKET_URL, {
      query: {
        userId: authUser._id,
      },
      withCredentials: true,
    });

    newSocket.connect();

    newSocket.on("getOnlineUsers", (userIds) => {
      set({
        onlineUsers: userIds,
      });
    });

    set({
      socket: newSocket,
    });
  },

  disconnectSocket: () => {
    const { socket } = get();

    if (socket) {
      socket.off("getOnlineUsers");
      socket.disconnect();
    }

    set({
      socket: null,
      onlineUsers: [],
    });
  },
}));