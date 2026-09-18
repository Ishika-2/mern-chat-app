import { Link } from "react-router-dom";
import { LogOut, MessageSquare, User } from "lucide-react";

import { useAuthStore } from "../store/useAuthStore.js";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();

  return (
    <header className="border-b border-base-300 bg-base-100">
      <div className="navbar mx-auto max-w-6xl px-4">
        <div className="flex-1">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <div className="rounded-lg bg-primary/10 p-2">
              <MessageSquare className="size-5 text-primary" />
            </div>

            MERN Chat
          </Link>
        </div>

        {authUser && (
          <div className="flex items-center gap-2">
            <Link to="/profile" className="btn btn-ghost btn-sm">
              <User className="size-4" />
              Profile
            </Link>

            <button
              type="button"
              onClick={logout}
              className="btn btn-ghost btn-sm"
            >
              <LogOut className="size-4" />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;