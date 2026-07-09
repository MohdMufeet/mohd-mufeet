"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  BriefcaseBusiness,
  FolderGit2,
  Menu,
  Moon,
  Search,
  Trophy,
  Mail,
} from "lucide-react";

const links = [
  {
    name: "Overview",
    icon: BookOpen,
  },
  {
    name: "Projects",
    icon: FolderGit2,
  },
  {
    name: "Achievements",
    icon: Trophy,
  },
  {
    name: "Experience",
    icon: BriefcaseBusiness,
  },
  {
    name: "Contact",
    icon: Mail,
  },
];

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -70 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.45 }}
      className="sticky top-0 z-50 border-b border-[#30363d] bg-[#0d1117]/90 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Left */}

        <div className="flex items-center gap-10">

          <h1 className="text-2xl font-black tracking-tight">
            Mufeet
          </h1>

          <nav className="hidden items-center gap-7 lg:flex">

            {links.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.name}
                  href="#"
                  className="flex items-center gap-2 text-sm text-gray-300 transition hover:text-white"
                >
                  <Icon size={18} />

                  {item.name}
                </a>
              );
            })}
          </nav>

        </div>

        {/* Right */}

        <div className="flex items-center gap-3">

          <div className="hidden h-10 w-80 items-center rounded-lg border border-[#30363d] bg-[#161b22] px-3 md:flex">

            <Search
              size={18}
              className="text-gray-500"
            />

            <input
              placeholder="Search"
              className="ml-3 w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
            />

          </div>

          <button className="rounded-lg border border-[#30363d] p-2 transition hover:bg-[#161b22]">
            <Moon size={19} />
          </button>

          <button className="rounded-lg border border-[#30363d] p-2 transition hover:bg-[#161b22] lg:hidden">
            <Menu size={20} />
          </button>

        </div>

      </div>
    </motion.header>
  );
}