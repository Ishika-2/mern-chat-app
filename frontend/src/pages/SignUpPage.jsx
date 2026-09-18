import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";

import { useAuthStore } from "../store/useAuthStore.js";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await signup(formData);
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

            <h1 className="text-3xl font-bold">Create account</h1>
            <p className="mt-2 text-base-content/60">
              Sign up to start chatting
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="form-control">
              <span className="label-text mb-2">Full name</span>

              <div className="input input-bordered flex items-center gap-2">
                <User className="size-5 text-base-content/40" />

                <input
                  type="text"
                  className="grow"
                  placeholder="Your full name"
                  value={formData.fullName}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      fullName: event.target.value,
                    })
                  }
                  required
                />
              </div>
            </label>

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
                  placeholder="At least 6 characters"
                  value={formData.password}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      password: event.target.value,
                    })
                  }
                  minLength={6}
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
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </button>
          </form>

          <p className="mt-4 text-center">
            Already have an account?{" "}
            <Link to="/login" className="link link-primary">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;