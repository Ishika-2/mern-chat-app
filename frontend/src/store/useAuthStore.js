import { create } from "zustand";
import toast from "react-hot-toast";

import { axiosInstance } from "../lib/axios.js";

export const useAuthStore = create((set) => ({
  authUser: null,

  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/check");

      set({
        authUser: response.data,
      });
    } catch (error) {
      console.log("Error in checkAuth:", error.response?.data?.message);

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
      const response = await axiosInstance.post("/auth/signup", formData);

      set({
        authUser: response.data,
      });

      toast.success("Account created successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to create account"
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
      const response = await axiosInstance.post("/auth/login", formData);

      set({
        authUser: response.data,
      });

      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to log in"
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

      set({
        authUser: null,
      });

      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to log out"
      );
    }
  },
}));