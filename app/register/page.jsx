"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Footer from "@/components/footer";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pesan, setPesan] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e) {
    e.preventDefault();
    setPesan("");
    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (!data.success) {
      setPesan(data.message);
      return;
    }

    // 🔥 Arahkan ke dashboard user
    window.location.href = "/login";
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

      {/* Register Card */}
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
              alt="Register"
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
              Create Account
            </h2>
            <p className="text-sm text-gray-600 text-center mb-6">
              Please enter your details to create an account.
            </p>

            {pesan && (
              <p className="text-red-600 text-center mb-3 font-medium">
                {pesan}
              </p>
            )}

            <form className="flex flex-col gap-3" onSubmit={handleRegister}>
              
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border border-black rounded-md px-3 py-2 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-black rounded-md px-3 py-2 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-black rounded-md px-3 py-2 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />

              <div className="flex justify-end text-sm text-black">
                <a href="/login" className="text-blue-600 hover:underline">
                  Already have an account? Login
                </a>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-2 bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition disabled:bg-gray-400"
              >
                {loading ? "Processing..." : "Confirm"}
              </motion.button>
            </form>
          </motion.div>

        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
