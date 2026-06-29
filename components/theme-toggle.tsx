"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { getTheme, setTheme } from "@/lib/theme";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(getTheme() === "dark");
  }, []);

  function toggleTheme() {
    const newTheme = isDark ? "light" : "dark";
    setIsDark(!isDark);
    setTheme(newTheme);
  }

  return (
    <button
      onClick={toggleTheme}
      className={`rounded-full border p-2 transition-colors ${
        isDark
          ? "border-white/20 hover:bg-white/10 text-white"
          : "border-[#E2D9CF] hover:bg-[#EDE5DA] text-[#111111]"
      }`}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Moon className="h-5 w-5 transition-transform" />
      ) : (
        <Sun className="h-5 w-5 transition-transform" />
      )}
    </button>
  );
}
