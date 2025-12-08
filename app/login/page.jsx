"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Footer from "@/components/footer";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!data.success) {
      setError(data.message);
      return;
    }

    // Redirect berdasarkan role (ambil dari payload user/redirect)
    const role = data.user?.role || data.role;
    const redirect = data.redirect || (role === "admin" ? "/admin/dashboard" : "/user/dashboard");
    window.location.href = redirect;
  }

  return (
    <main className="min-h-screen flex flex-col bg-white text-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-10 -top-10 w-72 h-72 bg-blue-100 blur-3xl"></div>
        <div className="absolute right-0 bottom-0 w-80 h-80 bg-purple-100 blur-3xl"></div>
        <div className="absolute left-1/2 top-1/3 w-40 h-40 border border-gray-100 rounded-full -translate-x-1/2"></div>
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
            <p className="text-sm text-gray-600">SMK Taruna Bakti Digital Library</p>
          </div>
        </div>
      </motion.nav>

      <section className="relative flex-1 flex items-center justify-center px-6 pb-16">
        <motion.div
          className="relative max-w-6xl w-full grid md:grid-cols-2 gap-8 items-stretch z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="hidden md:flex flex-col justify-between bg-gray-50 border border-gray-100 rounded-2xl p-10 shadow-xl">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs uppercase tracking-wide text-blue-700">
                Connected to TB ecosystem
              </div>
              <h2 className="text-4xl font-bold mt-6 leading-tight">
                Sign in and continue reading
              </h2>
              <p className="text-gray-600 mt-3">
                Access the catalog, track loans, and keep learning anytime.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { title: "24/7 access", desc: "Read anywhere" },
                { title: "Vocational focus", desc: "Materials fit the class" },
                { title: "Progress", desc: "Track loan status" },
                { title: "Secure", desc: "Encrypted data" },
              ].map((item) => (
                <div key={item.title} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                  <p className="text-sm text-blue-900">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
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
                Sign in
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                Sign in with your TB Digital Reads account.
              </p>

              {error && (
                <p className="mb-4 rounded-lg bg-red-50 text-red-700 border border-red-200 px-3 py-2 text-sm">
                  {error}
                </p>
              )}

              <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-blue-900">Username</label>
                  <input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full border border-blue-900/15 rounded-lg px-3 py-3 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-blue-50/30"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-blue-900">Password</label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-blue-900/15 rounded-lg px-3 py-3 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-blue-50/30"
                  />
                </div>

                <div className="flex flex-col items-end text-sm text-right space-y-2">
                  <p className="text-gray-600">
                    Don&apos;t have an account?{" "}
                    <a href="/register" className="text-blue-700 font-semibold hover:underline">
                      Register now
                    </a>
                  </p>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition"
                >
                  Sign in
                </motion.button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
