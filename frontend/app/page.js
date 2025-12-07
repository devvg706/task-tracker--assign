"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-gray-200 flex flex-col">

      {/* NAVBAR */}
      <nav className="w-full py-5 px-8 flex justify-between items-center border-b border-gray-800">
        <h1 className="text-2xl font-bold tracking-wide text-white">
          TaskTracker<span className="text-[#6366f1]">.</span>
        </h1>

        <div className="flex gap-4">
          <button
            onClick={() => router.push("/login")}
            className="px-5 py-2 rounded-md border border-gray-600 text-gray-300 hover:bg-gray-800 transition"
          >
            Login
          </button>
          <button
            onClick={() => router.push("/signup")}
            className="px-5 py-2 rounded-md bg-[#6366f1] text-white hover:bg-[#4f51c8] transition"
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="flex flex-col md:flex-row items-center justify-between px-10 md:px-20 py-20 gap-10">
        
        {/* TEXT */}
        <div className="flex-1">
          <h2 className="text-4xl md:text-6xl font-bold leading-tight text-white">
            Organize your day.  
            <span className="block text-[#6366f1] mt-2">Achieve more with clarity.</span>
          </h2>

          <p className="mt-6 text-lg text-gray-400 max-w-lg">
            TaskTracker helps you stay productive, focused, and in control.
            Plan tasks, track progress, set priorities — all in one place.
          </p>

          <div className="mt-8 flex gap-4">
            <button
              onClick={() => router.push("/signup")}
              className="px-6 py-3 bg-[#6366f1] rounded-md text-white font-semibold hover:bg-[#4f51c8] transition"
            >
              Get Started
            </button>

            <button
              onClick={() => router.push("/login")}
              className="px-6 py-3 border border-gray-600 rounded-md text-gray-300 hover:bg-gray-800 transition"
            >
              Login
            </button>
          </div>
        </div>

        {/* HERO IMAGE / ILLUSTRATION */}
        <div className="flex-1 flex justify-center">
          <div className="w-72 h-72 md:w-96 md:h-96 bg-linear-to-br from-gray-800 to-[#1a1a1a] rounded-xl border border-gray-700 shadow-lg flex items-center justify-center">
            <p className="text-6xl md:text-8xl">📝</p>
          </div>
        </div>

      </section>

      {/* FEATURES SECTION */}
      <section className="px-10 md:px-20 py-16 bg-[#111111] border-t border-b border-gray-800">
        <h3 className="text-3xl font-bold text-white text-center mb-10">
          Powerful Features to Boost Your Productivity
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Feature 1 */}
          <div className="p-6 bg-[#1a1a1a] rounded-xl border border-gray-700 hover:border-[#6366f1] hover:shadow-lg transition">
            <h4 className="text-xl font-semibold text-[#6366f1] mb-3">
              Smart Task Organization
            </h4>
            <p className="text-gray-400">
              Categorize your tasks, set priority levels, and organize your workflow effortlessly.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 bg-[#1a1a1a] rounded-xl border border-gray-700 hover:border-[#6366f1] hover:shadow-lg transition">
            <h4 className="text-xl font-semibold text-[#6366f1] mb-3">
              Real-Time Progress Tracking
            </h4>
            <p className="text-gray-400">
              Track your productivity with task status indicators like To-Do, In-Progress, and Done.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 bg-[#1a1a1a] rounded-xl border border-gray-700 hover:border-[#6366f1] hover:shadow-lg transition">
            <h4 className="text-xl font-semibold text-[#6366f1] mb-3">
              Secure & Personal
            </h4>
            <p className="text-gray-400">
              Every task is securely linked to your account — private, safe, and accessible anytime.
            </p>
          </div>

        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 px-10 md:px-20 text-center">
        <h3 className="text-3xl font-bold text-white mb-6">
          Start Managing Your Tasks Smarter Today
        </h3>

        <button
          onClick={() => router.push("/signup")}
          className="px-8 py-3 bg-[#6366f1] text-white rounded-md shadow-lg hover:bg-[#4f51c8] transition"
        >
          Create Your Free Account
        </button>
      </section>

      {/* FOOTER */}
      <footer className="py-6 text-center text-gray-500 border-t border-gray-800">
        © {new Date().getFullYear()} TaskTracker • All rights reserved.
      </footer>
    </div>
  );
}
