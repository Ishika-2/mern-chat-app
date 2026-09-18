import { UserRound, X } from "lucide-react";

import { useAuthStore } from "../store/useAuthStore.js";
import { useChatStore } from "../store/useChatStore.js";

const ChatHeader = () => {
  const { onlineUsers } = useAuthStore();
  const { selectedUser, setSelectedUser } = useChatStore();

  if (!selectedUser) {
    return null;
  }

  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <header className="flex items-center justify-between border-b border-base-300 px-4 py-3">
      <div className="flex min-w-0 items-center gap-3">
        <div className="avatar">
          <div className="size-12 rounded-full">
            {selectedUser.profilePic ? (
              <img
                src={selectedUser.profilePic}
                alt={selectedUser.fullName}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-base-300">
                <UserRound className="size-7" />
              </div>
            )}
          </div>
        </div>

        <div className="min-w-0">
          <h2 className="truncate font-semibold">
            {selectedUser.fullName}
          </h2>

          <p
            className={`text-sm ${
              isOnline
                ? "text-success"
                : "text-base-content/50"
            }`}
          >
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setSelectedUser(null)}
        className="btn btn-ghost btn-circle"
        title="Close conversation"
      >
        <X className="size-5" />
      </button>
    </header>
  );
};

export default ChatHeader;