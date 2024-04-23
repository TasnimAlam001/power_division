import React, { createContext, useContext, useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme, createTheme } from "@mui/material/styles";
import { auth } from "@/app/auth";


// Create a context for managing dark mode
const DarkModeContext = createContext();

// Custom hook to consume the dark mode context
export const useDarkMode = () => useContext(DarkModeContext);

// Dark mode provider component
export const DarkModeProvider = ({ children }) => { 
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [isDarkMode, setIsDarkMode] = useState(prefersDarkMode);
  const [session, setSession] = useState(null);
  const theme = useTheme();


  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
    localStorage.setItem("darkMode", !isDarkMode);
    theme.palette.mode = isDarkMode ? "dark" : "light";
  };

  let themeSettingsLight = {
    breakpoints: {
      values: {
        xs: 0,
        sm: 425,
        md: 600,
        lg: 1040,
        xl: 1440,
      },
    },
    palette: {
        mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: "#3382EF",
        light: "#e3f2fd",
      },
      success: {
        main: "#04984A",
        light: "#bbdefb",
        dark: "#1b5e20",
      },
      info: {
        main: "#2196f3",
        light: "#dbf2d5",
        dark: "#2962ff",
      },
      text: {
        main: "#000000",
        light: "#eeeeee",
      },
      bg: {
        main:"#fafbfc"        
      },
      background: {
        paper: "#fff",
        default: "#fafbfc" 
      }
    },
  };
  let themeSettingsDark = {
    breakpoints: {
      values: {
        xs: 0,
        sm: 425,
        md: 600,
        lg: 1040,
        xl: 1440,
      },
    },
    palette: {
        mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: "#3382EF",
        light: "#e3f2fd",
      },
      success: {
        main: "#04984A",
        light: "#bbdefb",
        dark: "#1b5e20",
      },
      info: {
        main: "#2196f3",
        light: "#dbf2d5",
        dark: "#2962ff",
      },
      text: {
        main: "#000000",
        light: "#eeeeee",
      },
      bg: {
        main: "#383838",        
      },
      background: {
        paper: "#282b33",
        default: "#121624" 
        

      }
    },
  };

  const myTheme = isDarkMode? createTheme(themeSettingsDark) :  createTheme(themeSettingsLight)


  useEffect(() => {
    const localStorageMode = localStorage.getItem("darkMode");
    if (localStorageMode) {
      setIsDarkMode(localStorageMode);
    }
  }, []);


  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode, myTheme , session}}>
      {children}
    </DarkModeContext.Provider>
  );
};
