import { useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";

import ChatHeader from "./ChatHeader.jsx";
import MessageInput from "./MessageInput.jsx";
import { useAuthStore } from "../store/useAuthStore.js";
import { useChatStore } from "../store/useChatStore.js";

const ChatContainer = () => {
  const messagesEndRef = useRef(null);

  const { authUser } = useAuthStore();

  const {
    messages,
    selectedUser,
    isMessagesLoading,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser, getMessages]);

  useEffect(() => {
    subscribeToMessages();

    return () => {
      unsubscribeFromMessages();
    };
  }, [
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const formatMessageTime = (date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <section className="flex min-w-0 flex-1 flex-col">
      <ChatHeader />

      {isMessagesLoading ? (
        <div className="flex flex-1 items-center justify-center">
          <Loader2 className="size-8 animate-spin" />
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-4">
          {messages.length === 0 ? (
            <div className="flex h-full items-center justify-center text-center text-base-content/50">
              No messages yet. Start the conversation!
            </div>
          ) : (
            messages.map((message) => {
              const isSentByCurrentUser =
                message.senderId === authUser?._id;

              return (
                <div
                  key={message._id}
                  className={`chat ${
                    isSentByCurrentUser
                      ? "chat-end"
                      : "chat-start"
                  }`}
                >
                  <div className="chat-header mb-1 text-xs opacity-60">
                    {isSentByCurrentUser
                      ? "You"
                      : selectedUser?.fullName}

                    <time className="ml-2">
                      {formatMessageTime(message.createdAt)}
                    </time>
                  </div>

                  <div
                    className={`chat-bubble flex max-w-xs flex-col gap-2 sm:max-w-md ${
                      isSentByCurrentUser
                        ? "chat-bubble-primary"
                        : ""
                    }`}
                  >
                    {message.image && (
                      <img
                        src={message.image}
                        alt="Message attachment"
                        className="max-h-64 rounded-lg object-cover"
                      />
                    )}

                    {message.text && (
                      <p className="whitespace-pre-wrap break-words">
                        {message.text}
                      </p>
                    )}
                  </div>
                </div>
              );
            })
          )}

          <div ref={messagesEndRef} />
        </div>
      )}

      <MessageInput />
    </section>
  );
};

export default ChatContainer;