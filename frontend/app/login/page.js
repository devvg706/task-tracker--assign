// app/login/page.jsx
"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {Spinner} from "@heroui/spinner";

// --- IMPORTANT: adjust these import paths to match your project ---
import { login as loginThunk } from "../../services/operations/authAPI"; // <-- replace with your actual thunk path
// ------------------------------------------------------------------

import { setLoading } from "../../slices/profileSlice"; // optional if you want to clear loading, adjust if different

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  // assume profile slice stores loading boolean at state.profile.loading
  const loading = useSelector((state) => state.profile?.loading ?? false);

  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    defaultValues: { email: "", password: "" },
  });

  // optional: clear any stale loading state on mount
  useEffect(() => {
    if (loading) {
      // ensure loading false when page mounts (avoid stuck loaders)
      dispatch(setLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      // dispatch the thunk (your thunk returns { success, data?, error? })
      const result = await dispatch(loginThunk(email, password));

      // your thunk returns a plain object { success: true/false, data?, error? }
      // if using createAsyncThunk style, you'd do .unwrap(); adapt if necessary.
      // Check result.payload or result (depending on thunk implementation)
      const payload = result?.payload ?? result;

      // Some versions of dispatch(thunk) return the thunk return value directly
      const success = payload?.success ?? payload?.data?.success ?? (payload && payload.token);

      if (payload && (payload.success || success)) {
        // on success, redirect to home/dashboard (change route as needed)
        router.push("/dashboard"); // <-- change destination as required
      } else {
        // show validation / server error
        const message =
          payload?.data?.message ?? payload?.message ?? "Login failed. Check credentials.";
        // set form-level error
        setError("root", { type: "server", message });
      }
    } catch (err) {
      // Unexpected error
      console.error("Login error (component):", err);
      setError("root", { type: "server", message: err?.message || "Login failed" });
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-[#0f1724] to-[#0b1220] flex items-center justify-center px-4">
      {/* Card */}
      <div className="w-full max-w-md bg-slate-900/70 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-800 p-6 sm:p-10">
        <header className="mb-6 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-linear-to-br from-[#0ea5a5] to-[#6366f1] text-white text-2xl font-extrabold mb-3">
            TT
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-100">Welcome back</h1>
          <p className="text-sm text-slate-400 mt-1">Sign in to your TaskTracker account</p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Enter a valid email" },
              })}
              className={`w-full rounded-lg px-4 py-3 bg-slate-800 border ${
                errors.email ? "border-rose-500" : "border-slate-700"
              } text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-rose-400">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">Password</label>
            <input
              type="password"
              placeholder="Your secure password"
              autoComplete="current-password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
              className={`w-full rounded-lg px-4 py-3 bg-slate-800 border ${
                errors.password ? "border-rose-500" : "border-slate-700"
              } text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-rose-400">{errors.password.message}</p>
            )}
          </div>

          {/* server-level error */}
          {errors.root && (
            <div className="text-center text-sm text-rose-400">{errors.root.message}</div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between gap-4">
            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 bg-linear-to-r from-[#06b6d4] to-[#6366f1] text-white font-semibold shadow hover:opacity-95 disabled:opacity-60"
            >
              {loading ? (
                // small inline spinner inside button (optional)
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                    ></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign in"
              )}
            </button>

            <button
              type="button"
              onClick={() => router.push("/signup")}
              className="text-sm text-slate-300 underline-offset-2 hover:underline"
            >
              Create account
            </button>
          </div>
        </form>

        {/* Extra footer */}
        <div className="mt-6 text-center text-sm text-slate-500">
          By signing in, you agree to our <span className="text-slate-300">Terms</span>.
        </div>
      </div>

      {/* Full-screen overlay spinner when loading */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
         
          <Spinner color="primary"/>
        </div>
      )}
    </div>
  );
}
