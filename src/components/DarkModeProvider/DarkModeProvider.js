import React, { createContext, useContext, useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme, createTheme } from "@mui/material/styles";
import webTheme from "@/app/theme";


// Create a context for managing dark mode
const DarkModeContext = createContext();

// Custom hook to consume the dark mode context
export const useDarkMode = () => useContext(DarkModeContext);

// Dark mode provider component
export const DarkModeProvider = ({ children }) => { 


  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [isDarkMode, setIsDarkMode] = useState(prefersDarkMode);

  const theme = useTheme();

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
    localStorage.setItem("darkMode", !isDarkMode);
    theme.palette.mode = isDarkMode ? "dark" : "light";
    console.log('change to', myTheme.palette.mode);
  };


  const myTheme = createTheme({
    palette: {
        mode: isDarkMode ? 'dark' : 'light'
    }
  })


  useEffect(() => {
    const localStorageMode = localStorage.getItem("darkMode");
    if (localStorageMode) {
      setIsDarkMode(localStorageMode);
    }
  }, []);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode, myTheme }}>
      {children}
    </DarkModeContext.Provider>
  );
};
