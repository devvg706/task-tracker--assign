// app/signup/page.jsx
"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

// --- ADJUST THESE IMPORT PATHS TO YOUR PROJECT ---
import { signUp as signUpThunk } from "../../services/operations/authAPI"; // <-- your signup thunk
import {Spinner} from "@heroui/spinner";
import { setLoading } from "../../slices/profileSlice"; // optional: adjust to your slice
// --------------------------------------------------

export default function SignupPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const loading = useSelector((state) => state.profile?.loading ?? false);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // clear stale loading on mount
  useEffect(() => {
    if (loading) dispatch(setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (data) => {
    const { firstName, lastName, email, password, confirmPassword } = data;

    // client-side password match check (react-hook-form can also validate)
    if (password !== confirmPassword) {
      setError("confirmPassword", { type: "manual", message: "Passwords do not match" });
      return;
    }

    try {
      // dispatch thunk — your thunk returns { success: true/false, data?, error? }
      const result = await dispatch(signUpThunk(firstName, lastName, email, password, confirmPassword));
      // your thunk returns an object directly; sometimes result.payload exists depending on implementation
      const payload = result?.payload ?? result;

      if (payload && payload.success) {
        // If signup returns a token and user is logged in immediately, route to dashboard
        const token = payload?.data?.token ?? payload?.token;
        if (token) {
          router.push("/dashboard"); // adjust if you want different landing page
        } else {
          // otherwise go to login page
          router.push("/login");
        }
      } else {
        // display server message if available
        const msg = payload?.data?.message || payload?.message || "Signup failed";
        setError("root", { type: "server", message: msg });
      }
    } catch (err) {
      console.error("Signup error (component):", err);
      setError("root", { type: "server", message: err?.message || "Signup failed" });
    }
  };

  const passwordValue = watch("password");

  return (
    <div className="min-h-screen bg-linear-to-b from-[#071023] to-[#0b1220] flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-slate-900/70 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-xl">
        <header className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-linear-to-br from-[#0ea5a5] to-[#6366f1] text-white text-2xl font-extrabold mb-3">
            TT
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-100">Create your account</h1>
          <p className="text-sm text-slate-400 mt-1">Start managing tasks and boosting productivity</p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">First name</label>
              <input
                type="text"
                {...register("firstName", { required: "First name is required" })}
                className={`w-full rounded-lg px-4 py-3 bg-slate-800 border ${
                  errors.firstName ? "border-rose-500" : "border-slate-700"
                } text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                placeholder="John"
              />
              {errors.firstName && <p className="mt-1 text-xs text-rose-400">{errors.firstName.message}</p>}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">Last name</label>
              <input
                type="text"
                {...register("lastName", { required: "Last name is required" })}
                className={`w-full rounded-lg px-4 py-3 bg-slate-800 border ${
                  errors.lastName ? "border-rose-500" : "border-slate-700"
                } text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                placeholder="Doe"
              />
              {errors.lastName && <p className="mt-1 text-xs text-rose-400">{errors.lastName.message}</p>}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Enter a valid email" },
              })}
              className={`w-full rounded-lg px-4 py-3 bg-slate-800 border ${
                errors.email ? "border-rose-500" : "border-slate-700"
              } text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              placeholder="you@example.com"
            />
            {errors.email && <p className="mt-1 text-xs text-rose-400">{errors.email.message}</p>}
          </div>

          {/* Passwords */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">Password</label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                })}
                className={`w-full rounded-lg px-4 py-3 bg-slate-800 border ${
                  errors.password ? "border-rose-500" : "border-slate-700"
                } text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                placeholder="Create a password"
              />
              {errors.password && <p className="mt-1 text-xs text-rose-400">{errors.password.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">Confirm password</label>
              <input
                type="password"
                {...register("confirmPassword", {
                  required: "Please confirm password",
                  validate: (val) => val === passwordValue || "Passwords do not match",
                })}
                className={`w-full rounded-lg px-4 py-3 bg-slate-800 border ${
                  errors.confirmPassword ? "border-rose-500" : "border-slate-700"
                } text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                placeholder="Repeat password"
              />
              {errors.confirmPassword && <p className="mt-1 text-xs text-rose-400">{errors.confirmPassword.message}</p>}
            </div>
          </div>

          {/* server-level error */}
          {errors.root && <div className="text-center text-sm text-rose-400">{errors.root.message}</div>}

          {/* Actions */}
          <div className="flex items-center justify-between gap-4 mt-1">
            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 bg-linear-to-r from-[#06b6d4] to-[#6366f1] text-white font-semibold shadow disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"></path>
                  </svg>
                  Creating...
                </span>
              ) : (
                "Create account"
              )}
            </button>

            <button
              type="button"
              onClick={() => router.push("/login")}
              className="text-sm text-slate-300 underline-offset-2 hover:underline"
            >
              Already have an account?
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          By creating an account you agree to our <span className="text-slate-300">Terms</span>.
        </div>
      </div>

      {/* Full-screen overlay spinner when loading */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <Spinner />
        </div>
      )}
    </div>
  );
}
