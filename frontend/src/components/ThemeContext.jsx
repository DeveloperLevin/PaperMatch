import { createContext, useContext, useState } from "react";

// create context for theme
const ThemeContext = createContext();

// create a provider component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  // function to toggle the theme
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// custom hook to access the theme context
export const useTheme = () => useContext(ThemeContext);
