"use client"
import { useEffect } from "react";
import { createTheme } from "@mui/material";

const getLocalStorageMode = () => {
  const mode = localStorage.getItem("mode");
  return mode === "dark" ? "dark" : "light";
};

// const setLocalStorageMode = (mode) => {
//   localStorage.setItem("mode", mode);
// };

// const useLocalStorageMode = () => {
//   useEffect(() => {
//     const mode = getLocalStorageMode();
//     setLocalStorageMode(mode);
//   }, []);
// };

const webTheme = createTheme({
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
    mode: getLocalStorageMode(), // Set mode based on local storage
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
  },
});

export default webTheme;
