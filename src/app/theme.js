"use client"
import { createTheme } from "@mui/material";

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
    
    primary: {
      main: "#3382EF",
    },
    success: {
      main: "#04984A",
      light: "#dbf2d5",
      dark: "#1b5e20",
    },
  },

});

export default webTheme;
