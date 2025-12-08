"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Footer from "@/components/footer";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    if (!email.trim()) {
      setStatus({ type: "error", message: "Email is required" });
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to send reset link");
      }

      setStatus({
        type: "success",
        message: data.message || "Reset link sent! Please check your email.",
      });
    } catch (err) {
      setStatus({ type: "error", message: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col bg-white text-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-12 top-0 w-72 h-72 bg-blue-100 blur-3xl"></div>
        <div className="absolute right-0 bottom-0 w-80 h-80 bg-purple-100 blur-3xl"></div>
        <div className="absolute left-1/2 top-1/4 w-44 h-44 border border-gray-100 rounded-full -translate-x-1/2"></div>
      </div>

      <motion.nav
        className="relative flex items-center justify-between px-6 md:px-12 py-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-white border border-blue-100 flex items-center justify-center shadow-sm">
            <img src="/image/LogoTb.jpg" alt="Logo" className="h-10 w-10 rounded-lg object-cover" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-blue-900">TB Digital Reads</h1>
            <p className="text-sm text-gray-600">Reset your password</p>
          </div>
        </div>
        <a
          href="/login"
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-200 text-sm font-semibold text-blue-800 hover:bg-blue-50 transition"
        >
          Back to login
        </a>
      </motion.nav>

      <section className="relative flex-1 flex items-center justify-center px-6 pb-16">
        <motion.div
          className="relative max-w-3xl w-full grid md:grid-cols-2 gap-8 items-stretch z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="hidden md:flex flex-col justify-between bg-gray-50 border border-gray-100 rounded-2xl p-10 shadow-xl">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs uppercase tracking-wide text-blue-700">
                Forgot Password
              </div>
              <h2 className="text-3xl font-bold mt-6 leading-tight">
                We’ll help you get back in
              </h2>
              <p className="text-gray-600 mt-3">
                Enter your email and we&apos;ll send a secure link to reset your password.
              </p>
            </div>
            <ul className="text-sm text-gray-600 space-y-2 mt-6">
              <li>• Reset link valid for a limited time</li>
              <li>• Check your spam folder if you don&apos;t see it</li>
              <li>• Need help? Contact support</li>
            </ul>
          </div>

          <motion.div
            className="bg-white text-gray-900 rounded-2xl shadow-2xl p-10 border border-gray-100 relative overflow-hidden"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-purple-50 opacity-60"></div>
            <div className="relative">
              <h2 className="text-3xl font-bold mb-2 text-blue-900">
                Reset password
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                We will send a reset link to your email if it matches an account.
              </p>

              {status.message && (
                <p
                  className={`mb-4 rounded-lg px-3 py-2 text-sm ${
                    status.type === "success"
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  {status.message}
                </p>
              )}

              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-blue-900">Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-blue-900/15 rounded-lg px-3 py-3 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-blue-50/30"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition disabled:bg-gray-300"
                >
                  {loading ? "Sending..." : "Send reset link"}
                </motion.button>
              </form>

              <div className="mt-6 text-sm text-gray-600">
                Remembered it?{" "}
                <a href="/login" className="text-blue-700 font-semibold hover:underline">
                  Back to login
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
