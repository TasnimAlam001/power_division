"use client";
import useMediaQuery from "@mui/material/useMediaQuery";
import Navbar from "@/components/navbar/navbar";
import { ThemeProvider, useTheme, createTheme } from "@mui/material/styles";
import { Box, Typography, CssBaseline } from "@mui/material";
import { Inter } from "next/font/google";
import React, { useEffect } from "react";
import webTheme from "../theme";
import {themeSettings} from "../themeSettings";


const inter = Inter({ subsets: ["latin"] });



export default function DashboardLayout({ children }) {
  const drawerWidth = 223;
  const theme = useTheme();

  const lightTheme = createTheme(themeSettings);
  let darkSettings = themeSettings;
  darkSettings.palette.mode = 'dark'
  const darkTheme = createTheme(darkSettings)  

  // const webTheme = createTheme(webTheme())
  
  const [currentMode, setCurrentMode] = React.useState();

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  useEffect(()=>{
    let localStorageMode = localStorage.getItem('mode');
    if(localStorageMode)
    {
      theme.palette.mode = localStorage.getItem('mode')
      setCurrentMode(localStorage.getItem('mode'))
    }else{
      theme.palette.mode = prefersDarkMode;
      setCurrentMode(prefersDarkMode)
    } 
       console.log('new mode', theme.palette.mode)
    
  },[currentMode])


  const toggleCurrentMode = () => {
    let newModeS = ()=>{
      if(currentMode){
        return currentMode === 'light' ? 'dark' : 'light'
      }
      return 'light'
    }
    setCurrentMode(newModeS())
    console.log('change mode state', currentMode)
    localStorage.setItem('mode', newModeS());
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Navbar currentMode={currentMode} toggleMode={toggleCurrentMode} />
      <Box
        sx={{
          bgcolor: theme.palette.mode === "light" ? "#fafbfc" : "#2e2e2e",
          pt: 10,
          pl: { xs: 2, md: `${drawerWidth}px` },
          pr: { xs: 2, md: 3 },
          pb: 3,
        }}
      >
        {children}
      </Box>
      <Typography sx={{ fontSize: 12, textAlign: "center", py: 1 }}>
        © 2024, All Rights Reserved. Developed By{" "}
        <span style={{ color: "#00ACF3" }}>Digicon Technologies ltd.</span>
      </Typography>
    </ThemeProvider>
  );
}
