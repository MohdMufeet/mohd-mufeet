
import React from "react";
import { Search, Moon, Menu } from "lucide-react";
import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mohd Mufeet",
  description: "Full Stack Developer",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): React.JSX.Element {
  return (
    <html lang="en">
      <body className="bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 antialiased font-sans">
        {/* Header/Navbar */}
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <span className="font-black text-xl tracking-wider border-2 border-black dark:border-white px-1.5 py-0.5 rounded">
                MM
              </span>
              <span className="font-semibold text-sm hidden sm:inline text-gray-700 dark:text-gray-300">
                Mohd Mufeet
              </span>
            </div>

            {/* Nav Links */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-400">
              <span className="text-black dark:text-white border-b-2 border-orange-500 pb-5 pt-5 cursor-pointer">Overview</span>
              <span className="hover:text-black dark:hover:text-white cursor-pointer transition">Projects</span>
              <span className="hover:text-black dark:hover:text-white cursor-pointer transition">Achievements</span>
              <span className="hover:text-black dark:hover:text-white cursor-pointer transition">Experience</span>
              <span className="hover:text-black dark:hover:text-white cursor-pointer transition">Blogs</span>
              <span className="hover:text-black dark:hover:text-white cursor-pointer transition">Contact</span>
            </nav>

            {/* Right Controls */}
            <div className="flex items-center gap-4">
              {/* Search Bar */}
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Type to search"
                  className="pl-9 pr-4 py-1.5 text-xs bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg w-48 focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
                <kbd className="absolute right-2 top-2 hidden md:inline-flex items-center gap-0.5 rounded border border-gray-300 bg-white px-1 text-[10px] font-medium text-gray-400 shadow-sm dark:border-neutral-700 dark:bg-neutral-900">
                  Shift + /
                </kbd>
              </div>

              {/* Theme Toggle & Menu */}
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-lg transition">
                <Moon className="h-4 w-4" />
              </button>
              <button className="p-2 md:hidden hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-lg">
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>

        <main>{children}</main>
      </body>
    </html>
  );
}