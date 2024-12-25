import React from "react";
import { useTheme } from "./ThemeContext"; 
import '../App.css';
import darkColorLogo from "../assets/light-theme-fyp-logo-removebg-preview-scaled.png"; 
import lightColorLogo from "../assets/dark-theme-fyp-logo-removebg-preview-scaled.png"; 

const NavBar = () => {
  // Using the custom useTheme hook to get theme and toggleTheme function
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="fixed bg-zinc-800 w-full h-[60px] p-4 shadow-md"> 
      <div className="flex items-center space-x-2 flex-shrink-0">
        {theme === "light" ? (
          <img
            src={lightColorLogo} // Replace with the path to your light theme logo
            alt="dark-color-logo"
            className="h-6 w-6 rounded-full"
          />
        ) : (
          <img
            src={darkColorLogo} // Replace with the path to your dark theme logo
            alt="light-color-logo"
            className="h-6 w-6 rounded-full"
          />
        )}

        <span className="text-2xl font-bold tracking-wider text-black dark:text-white">
          PaperMatch
        </span>
      </div>
    </nav>
  );
};

export default NavBar;
