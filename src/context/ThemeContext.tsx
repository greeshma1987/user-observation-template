import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface ThemeContextType {
  darkMode: boolean;
  toggleTheme: () => void;
  highContrast: boolean;                // ✅ add this
  toggleHighContrast: () => void;       // ✅ add this
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [highContrast, setHighContrast] = useState(false); // ✅ new state

  const toggleTheme = () => setDarkMode(prev => !prev);
  const toggleHighContrast = () => setHighContrast(prev => !prev); // ✅ toggle fn

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme, highContrast, toggleHighContrast }}>
      <div
        style={{
          minHeight: "100vh",
          transitionProperty: "background-color, color",
          transitionDuration: "500ms",
          backgroundColor: darkMode
            ? highContrast
              ? "#000000" // black in high-contrast dark
              : "#0a0a0a"
            : highContrast
            ? "#ffffff"  // white background in high-contrast light
            : "",
          backgroundImage: !highContrast && !darkMode
            ? "linear-gradient(to bottom right, #eff6ff, #faf5ff, #fdf2f8)"
            : "none",
          color: highContrast
            ? (darkMode ? "#00ff00" : "#000000") // green-on-black or black-on-white
            : (darkMode ? "#ffffff" : "#0f172a")
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
