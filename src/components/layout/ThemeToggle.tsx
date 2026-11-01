"use client";

import { useLayoutEffect } from "react";

const themeStorageKey = "portfolio-theme";

function applySavedTheme() {
  try {
    document.documentElement.classList.toggle(
      "light",
      window.localStorage.getItem(themeStorageKey) === "light",
    );
  } catch (error) {
    console.error("Unable to read the saved color theme.", error);
    document.documentElement.classList.remove("light");
  }
}

export function ThemeToggle() {
  useLayoutEffect(() => {
    applySavedTheme();
  }, []);

  function toggleTheme() {
    const nextTheme = document.documentElement.classList.contains("light")
      ? "dark"
      : "light";

    document.documentElement.classList.toggle("light", nextTheme === "light");

    try {
      window.localStorage.setItem(themeStorageKey, nextTheme);
    } catch (error) {
      console.error("Unable to save the selected color theme.", error);
    }
  }

  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      title="Toggle color theme"
      onClick={toggleTheme}
      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-border bg-surface text-foreground transition-colors hover:bg-surface-raised lg:w-auto lg:gap-2 lg:px-3 lg:text-small lg:font-medium"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="theme-toggle__sun h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
      </svg>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="theme-toggle__moon h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      >
        <path d="M20.2 15.1A8.5 8.5 0 0 1 8.9 3.8 8.5 8.5 0 1 0 20.2 15.1Z" />
      </svg>
      <span className="sr-only lg:not-sr-only">Theme</span>
    </button>
  );
}
