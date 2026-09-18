import { useEffect } from "react";
import { Loader2, UserRound, Users } from "lucide-react";

import { useAuthStore } from "../store/useAuthStore.js";
import { useChatStore } from "../store/useChatStore.js";

const Sidebar = () => {
  const { onlineUsers } = useAuthStore();

  const {
    users,
    selectedUser,
    isUsersLoading,
    getUsers,
    setSelectedUser,
  } = useChatStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <aside className="flex h-full w-20 flex-col border-r border-base-300 bg-base-100 lg:w-72">
      <div className="flex h-16 items-center gap-2 border-b border-base-300 px-4">
        <Users className="size-6" />

        <div className="hidden lg:block">
          <p className="font-semibold">Contacts</p>

          <p className="text-xs text-base-content/50">
            {onlineUsers.length} online
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-2">
        {isUsersLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="size-6 animate-spin" />
          </div>
        ) : users.length === 0 ? (
          <p className="hidden px-4 py-8 text-center text-sm text-base-content/60 lg:block">
            No other users found
          </p>
        ) : (
          users.map((user) => {
            const isOnline = onlineUsers.includes(user._id);

            return (
              <button
                key={user._id}
                type="button"
                onClick={() => setSelectedUser(user)}
                className={`flex w-full items-center gap-3 px-3 py-3 transition-colors hover:bg-base-200 ${
                  selectedUser?._id === user._id
                    ? "bg-base-200"
                    : ""
                }`}
              >
                <div className="relative shrink-0">
                  <div className="flex size-12 items-center justify-center overflow-hidden rounded-full bg-base-300">
                    {user.profilePic ? (
                      <img
                        src={user.profilePic}
                        alt={`${user.fullName}'s profile`}
                        className="size-full object-cover"
                      />
                    ) : (
                      <UserRound className="size-7 text-base-content/40" />
                    )}
                  </div>

                  {isOnline && (
                    <span className="absolute bottom-0 right-0 size-3 rounded-full border-2 border-base-100 bg-success" />
                  )}
                </div>

                <div className="hidden min-w-0 text-left lg:block">
                  <p className="truncate font-medium">
                    {user.fullName}
                  </p>

                  <p
                    className={`truncate text-sm ${
                      isOnline
                        ? "text-success"
                        : "text-base-content/50"
                    }`}
                  >
                    {isOnline ? "Online" : user.email}
                  </p>
                </div>
              </button>
            );
          })
        )}
      </div>
    </aside>
  );
};

export default Sidebar;