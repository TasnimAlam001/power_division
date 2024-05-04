"use client";
import Navbar from "@/components/navbar/navbar";
import { ThemeProvider } from "@mui/material/styles";
import { Box, Typography, CssBaseline } from "@mui/material";
import React from "react";
import {
  DarkModeProvider,
  useDarkMode,
} from "@/components/DarkModeProvider/DarkModeProvider";
import { SessionProvider } from "next-auth/react";
import NextNProgress from 'nextjs-progressbar';



const ContextConsumer = (props) => {
  let { children } = props;
  let { myTheme } = useDarkMode();

  return <ThemeProvider theme={myTheme}>    
    {children}
    </ThemeProvider>;
};

export default function DashboardLayout({ children }) {
  const drawerWidth = 223;

  return (
    <SessionProvider>
        <DarkModeProvider>
          <ContextConsumer>
          
            <NextNProgress color="#29D" startPosition={0.3} stopDelayMs={200} height={3} showOnShallow={true} />

            <CssBaseline />

            <Navbar />
            <Box
              sx={{
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
              <span style={{ color: "#00ACF3" }}>
                Digicon Technologies ltd.
              </span>
            </Typography>
         
            
          </ContextConsumer>
        </DarkModeProvider>
    </SessionProvider>
  );
}
