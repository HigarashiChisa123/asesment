"use client";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="w-full bg-gradient-to-r from-[#1f3fbf] via-[#2435a8] to-[#2d1f80] text-white mt-20 py-14 border-t border-white/10 shadow-inner"
    >
      <div className="max-w-7xl mx-auto px-8 flex flex-wrap justify-between gap-12">
        
        {/* LEFT / BRAND */}
        <div className="w-full md:w-1/3">
          <h2 className="text-2xl font-bold mb-4 text-white">TB Digital Reads</h2>
          <p className="text-sm leading-relaxed text-white/90">
            TB Digital Reads has become an integral part of digital literacy activities at Taruna Bakti Vocational School.
            Students and teachers have received a variety of positive responses, benefiting from the ease of access, comfortable reading, and increased motivation to learn through this platform.
          </p>
        </div>

        {/* RIGHT / LINKS */}
        <div className="flex gap-20">
          <div>
            <h3 className="font-semibold mb-3 text-white">Support</h3>
            <ul className="text-sm space-y-2 text-white/90">
              <li className="hover:text-white hover:scale-105 transition cursor-pointer">Help Center</li>
              <li className="hover:text-white hover:scale-105 transition cursor-pointer">Documentation</li>
              <li className="hover:text-white hover:scale-105 transition cursor-pointer">Community</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-white">Company</h3>
            <ul className="text-sm space-y-2 text-white/90">
              <li className="hover:text-white hover:scale-105 transition cursor-pointer">About</li>
              <li className="hover:text-white hover:scale-105 transition cursor-pointer">Careers</li>
              <li className="hover:text-white hover:scale-105 transition cursor-pointer">Partners</li>
              <li className="hover:text-white hover:scale-105 transition cursor-pointer">Contact</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-white">About Us</h3>
            <ul className="text-sm space-y-2 text-white">
              <li className="hover:text-white hover:scale-105 transition cursor-pointer">Our Vision</li>
              <li className="hover:text-white hover:scale-105 transition cursor-pointer">Mission</li>
              <li className="hover:text-white hover:scale-105 transition cursor-pointer">History</li>
            </ul>
          </div>
        </div>

      </div>
    </motion.footer>
  );
}
