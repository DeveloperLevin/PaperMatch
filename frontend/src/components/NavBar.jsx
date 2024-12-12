import React from "react";
import { useTheme } from "./ThemeContext"; // Import useTheme hook

import darkColorLogo from "../assets/light-theme-fyp-logo-removebg-preview-scaled.png"; // Ensure paths are correct
import lightColorLogo from "../assets/dark-theme-fyp-logo-removebg-preview-scaled.png"; // Ensure paths are correct

const NavBar = () => {
  // Using the custom useTheme hook to get theme and toggleTheme function
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 flex h-[60px] justify-between items-center p-4 bg-gray-400 dark:bg-gray-800">
      <div className="flex items-center space-x-2 flex-shrink-0 bg-gray-400 dark:bg-gray-800">
        {theme === "light" ? (
          <img
            src={darkColorLogo} // Replace with the path to your light theme logo
            alt="dark-color-logo"
            className="h-8 w-8 rounded-full"
          />
        ) : (
          <img
            src={lightColorLogo} // Replace with the path to your dark theme logo
            alt="light-color-logo"
            className="h-8 w-8 rounded-full"
          />
        )}

        <span className="text-xl font-bold text-black dark:text-white">
          PaperMatch
        </span>
      </div>
    </nav>
  );
};

export default NavBar;
