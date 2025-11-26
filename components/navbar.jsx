"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();

  const menu = [
    { name: "Home", href: "/" },
    { name: "Book", href: "/book" },
    { name: "Testimoni", href: "/testimoni" },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full bg-white py-4 px-6"
    >
      {/* NAV CONTAINER */}
      <div className="max-w-7xl mx-auto flex items-center justify-between 
        bg-white shadow-lg rounded-full px-8 py-3 border border-gray-100">

        {/* Logo + Title */}
        <div className="flex items-center gap-3">
          <img
            src="/image/LogoTB.jpg"
            alt="Logo"
            className="w-10 h-10 object-contain"
          />
          <h1 className="text-xl font-bold text-gray-900">
            TB Digital Reads
          </h1>
        </div>

        {/* MENU */}
        <ul className="flex items-center gap-10 text-gray-700 font-medium">
          {menu.map((item) => (
            <li key={item.href} className="group relative">
              <Link
                href={item.href}
                className={`relative pb-1 transition-all duration-300
                  ${
                    pathname === item.href
                      ? "text-blue-600 font-semibold"
                      : "text-gray-600 group-hover:text-blue-600"
                  }
                `}
              >
                {item.name}

                {/* Hover underline */}
                {pathname !== item.href && (
                  <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-blue-600 rounded-full transition-all duration-300 group-hover:w-full" />
                )}

                {/* Active underline */}
                {pathname === item.href && (
                  <motion.span
                    layoutId="underline"
                    className="absolute left-0 -bottom-1 h-[2px] w-full bg-blue-600 rounded-full"
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Sign Up Button */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/login"
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 
              text-white rounded-lg font-medium shadow-md transition"
          >
            Sign Up
          </Link>
        </motion.div>

      </div>
    </motion.nav>
  );
}
