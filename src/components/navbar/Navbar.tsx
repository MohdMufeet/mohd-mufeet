"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMenu,
  FiMoon,
  FiSearch,
  FiX,
} from "react-icons/fi";

const navItems = [
  { title: "Overview", href: "#" },
  { title: "Projects", href: "#" },
  { title: "Achievements", href: "#" },
  { title: "Experience", href: "#" },
  { title: "Blogs", href: "#" },
  { title: "Contact", href: "#" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-6">

          {/* Left */}
          <div className="flex items-center gap-10">

            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white font-bold">
                MM
              </div>

              <span className="hidden text-lg font-semibold md:block">
                Mohd Mufeet
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="relative text-sm font-medium text-zinc-600 transition hover:text-black"
                >
                  {item.title}
                </Link>
              ))}
            </nav>

          </div>

          {/* Right */}

          <div className="flex items-center gap-3">

            <div className="hidden md:flex items-center gap-3 rounded-xl border border-zinc-300 px-4 py-2 w-72">

              <FiSearch className="text-zinc-500" />

              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-transparent outline-none text-sm"
              />

            </div>

            <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-300 hover:bg-zinc-100 transition">
              <FiMoon size={18} />
            </button>

            <button
              onClick={() => setOpen(true)}
              className="flex lg:hidden h-10 w-10 items-center justify-center rounded-xl border border-zinc-300 hover:bg-zinc-100 transition"
            >
              <FiMenu size={20} />
            </button>

          </div>

        </div>
      </header>

      <AnimatePresence>

        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: .3 }}
            className="fixed inset-0 z-50 bg-white"
          >

            <div className="flex items-center justify-between border-b p-6">

              <span className="text-xl font-bold">
                Mohd Mufeet
              </span>

              <button
                onClick={() => setOpen(false)}
              >
                <FiX size={24} />
              </button>

            </div>

            <nav className="flex flex-col p-8">

              {navItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="border-b py-5 text-lg font-medium"
                >
                  {item.title}
                </Link>
              ))}

            </nav>

          </motion.div>
        )}

      </AnimatePresence>
    </>
  );
}