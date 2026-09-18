import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  Mail,
  MessageSquare,
} from "lucide-react";

import { useAuthStore } from "../store/useAuthStore.js";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await login(formData);
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="mb-4 text-center">
            <div className="mb-3 flex justify-center">
              <div className="rounded-xl bg-primary/10 p-3">
                <MessageSquare className="size-7 text-primary" />
              </div>
            </div>

            <h1 className="text-3xl font-bold">Welcome back</h1>

            <p className="mt-2 text-base-content/60">
              Sign in to continue chatting
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="form-control">
              <span className="label-text mb-2">Email</span>

              <div className="input input-bordered flex items-center gap-2">
                <Mail className="size-5 text-base-content/40" />

                <input
                  type="email"
                  className="grow"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      email: event.target.value,
                    })
                  }
                  required
                />
              </div>
            </label>

            <label className="form-control">
              <span className="label-text mb-2">Password</span>

              <div className="input input-bordered flex items-center gap-2">
                <LockKeyhole className="size-5 text-base-content/40" />

                <input
                  type={showPassword ? "text" : "password"}
                  className="grow"
                  placeholder="Your password"
                  value={formData.password}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      password: event.target.value,
                    })
                  }
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-base-content/50"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <EyeOff className="size-5" />
                  ) : (
                    <Eye className="size-5" />
                  )}
                </button>
              </div>
            </label>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <p className="mt-4 text-center">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="link link-primary">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;