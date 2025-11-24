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

    // Redirect berdasarkan role
    if (data.role === "admin") {
      window.location.href = "/admin/dashboard";
    } else {
      window.location.href = "/user/dashboard";
    }
  }

  return (
    <main className="min-h-screen flex flex-col justify-between bg-white">
      {/* Navbar */}
      <motion.nav
        className="flex items-center justify-between px-8 py-4 shadow-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex items-center gap-2">
          <img src="/image/LogoTb.jpg" alt="Logo" className="w-10 h-10" />
          <h1 className="text-xl font-bold text-blue-800">
            TB <span className="text-black">Digital Reads</span>
          </h1>
        </div>
      </motion.nav>

      {/* Login Card */}
      <section className="flex justify-center items-center py-12">
        <motion.div
          className="bg-white shadow-lg rounded-xl overflow-hidden flex w-[800px] h-[600px]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Left Image */}
          <motion.div
            className="w-1/2 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <img
              src="/image/FotoTb.png"
              alt="Login"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
          </motion.div>

          {/* Right Form */}
          <motion.div
            className="w-1/2 flex flex-col justify-center p-10"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <h2 className="text-2xl font-bold mb-2 text-center text-black">
              Welcome To <span className="text-blue-800">TB</span>{" "}
              <span className="font-semibold">Digital Reads</span>
            </h2>
            <p className="text-sm text-gray-600 text-center mb-6">
              Please enter your username and password.
            </p>

            {/* Error Message */}
            {error && (
              <p className="text-red-600 text-center mb-3 font-medium">
                {error}
              </p>
            )}

            <form className="flex flex-col gap-3" onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border border-black rounded-md px-3 py-2 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-black rounded-md px-3 py-2 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />

              <div className="flex flex-col items-end text-sm mt-2 space-y-2 text-black text-right">
                <p>
                  Don't have an account?{" "}
                  <a href="/register" className="text-blue-600 hover:underline">
                    Register
                  </a>
                </p>
                <a href="#" className="text-blue-600 hover:underline">
                  Forget Password?
                </a>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-2 bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition"
              >
                Enter
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
