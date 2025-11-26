"use client";

import React from "react";
import { Search, Bell, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Dashboard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full h-screen bg-gray-100 p-4 flex gap-4 text-gray-800"
    >
      {/* SIDEBAR */}
    <motion.aside
  initial={{ x: -40, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  whileHover={{ 
    scale: 1.02,
    boxShadow: "0px 8px 24px rgba(0,0,0,0.12)"
  }}
  transition={{ duration: 0.3 }}
  className="w-64 bg-white rounded-2xl p-6 shadow-sm flex flex-col justify-between cursor-pointer"
>
  <div>
    <h1 className="text-2xl font-semibold mb-8">Coursue</h1>
    <nav className="space-y-4">
      <p className="font-semibold text-gray-400 text-sm">OVERVIEW</p>
      <ul className="space-y-3">
        <li className="font-medium text-purple-600">Dashboard</li>
        <li className="text-gray-500 hover:text-purple-600 transition">Inbox</li>
        <li className="text-gray-500 hover:text-purple-600 transition">Lesson</li>
        <li className="text-gray-500 hover:text-purple-600 transition">Task</li>
        <li className="text-gray-500 hover:text-purple-600 transition">Group</li>
      </ul>

      <p className="font-semibold text-gray-400 text-sm mt-8">FRIENDS</p>
      <ul className="space-y-2 text-gray-500 text-sm">
        <li className="hover:text-purple-600 transition">Bagas Mahpie</li>
        <li className="hover:text-purple-600 transition">Sir Dandy</li>
        <li className="hover:text-purple-600 transition">Jhon Tosan</li>
      </ul>
    </nav>
  </div>

  <div>
    <p className="text-gray-500 text-sm mb-2 hover:text-purple-600 transition">Settings</p>
    <p className="text-red-400 text-sm cursor-pointer hover:text-red-500 transition">Logout</p>
  </div>
</motion.aside>


      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col gap-4">
        {/* TOP BAR */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full flex items-center justify-between"
        >
          <div className="flex items-center bg-white px-4 py-3 rounded-2xl shadow-sm w-1/2 gap-3">
            <Search size={18} className="text-gray-400" />
            <input
              placeholder="Search your course..."
              className="w-full outline-none text-sm"
            />
          </div>

          <div className="flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.1 }} className="p-3 bg-white rounded-full shadow-sm cursor-pointer">
              <MessageCircle size={20} />
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} className="p-3 bg-white rounded-full shadow-sm cursor-pointer">
              <Bell size={20} />
            </motion.div>

            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm gap-3">
              <span>Jason Ranti</span>
            </div>
          </div>
        </motion.div>

        {/* BANNER */}
        <motion.div
          initial={{ scale: 0.97, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="bg-purple-500 text-white rounded-3xl shadow-md p-8"
        >
          <h2 className="text-3xl font-semibold mb-4 w-80 leading-tight">
            Sharpen Your Skills with Professional Online Courses
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-white text-purple-600 font-semibold rounded-full px-6 py-2"
          >
            Join Now
          </motion.button>
        </motion.div>

        {/* CONTINUE WATCHING */}
        <div>
          <h3 className="font-semibold mb-3">Continue Watching</h3>

          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 * i }}
                whileHover={{ scale: 1.02 }}
                className="rounded-3xl shadow-sm overflow-hidden bg-white cursor-pointer"
              >
                <div className="p-4">
                  <p className="text-xs text-purple-600 font-semibold">
                    UI/UX DESIGN
                  </p>
                  <p className="font-semibold mt-1">Optimizing User Experience</p>
                  <p className="text-xs text-gray-500 mt-2">By Bayu Salto</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT SIDEBAR */}
      <motion.aside
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-80 bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-6"
      >
        <div>
          <p className="font-semibold text-lg">Statistic</p>

          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4 }}
            className="mt-4"
          >
            <div className="w-20 h-20 rounded-full bg-purple-200 mx-auto flex items-center justify-center">
              <span className="text-purple-600 font-semibold">32%</span>
            </div>
            <p className="text-center mt-2 text-sm">Good Morning Jason 🔥</p>
          </motion.div>
        </div>

        <div>
          <p className="font-semibold mb-3">Your Mentor</p>
          <ul className="space-y-3 text-sm">
            {["Padhang Satrio", "Zakir Horizontal"].map((name, idx) => (
              <motion.li
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-300 rounded-full" />
                  <span>{name}</span>
                </div>

                <button className="text-xs px-3 py-1 rounded-full bg-purple-600 text-white">
                  Follow
                </button>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.aside>
    </motion.div>
  );
}
