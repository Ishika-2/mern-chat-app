import { create } from "zustand";
import toast from "react-hot-toast";

import { axiosInstance } from "../lib/axios.js";
import { useAuthStore } from "./useAuthStore.js";

export const useChatStore = create((set, get) => ({
  users: [],
  messages: [],
  selectedUser: null,

  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({
      isUsersLoading: true,
    });

    try {
      const response = await axiosInstance.get("/messages/users");

      set({
        users: response.data,
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to load users"
      );
    } finally {
      set({
        isUsersLoading: false,
      });
    }
  },

  getMessages: async (userId) => {
    set({
      isMessagesLoading: true,
    });

    try {
      const response = await axiosInstance.get(
        `/messages/${userId}`
      );

      set({
        messages: response.data,
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to load messages"
      );
    } finally {
      set({
        isMessagesLoading: false,
      });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser } = get();

    if (!selectedUser) return;

    try {
      const response = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );

      set((state) => ({
        messages: [...state.messages, response.data],
      }));
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to send message"
      );

      throw error;
    }
  },

  subscribeToMessages: () => {
    const socket = useAuthStore.getState().socket;

    if (!socket) return;

    socket.off("newMessage");

    socket.on("newMessage", (newMessage) => {
      const { selectedUser } = get();

      if (!selectedUser) return;

      const belongsToCurrentConversation =
        newMessage.senderId === selectedUser._id;

      if (!belongsToCurrentConversation) return;

      set((state) => ({
        messages: [...state.messages, newMessage],
      }));
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;

    if (socket) {
      socket.off("newMessage");
    }
  },

  setSelectedUser: (selectedUser) => {
    set({
      selectedUser,
      messages: [],
    });
  },
}));