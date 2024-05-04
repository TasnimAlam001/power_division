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
// import NextTopLoader from "nextjs-toploader";

const ContextConsumer = (props) => {
  let { children } = props;
  let { myTheme } = useDarkMode();

  return (
    <ThemeProvider theme={myTheme}>
      {/* <NextTopLoader
        color="#2299DD"
        initialPosition={0.08}
        // crawlSpeed={200}
        height={4}
        crawl={true}
        showSpinner={false}
        easing="ease"
        speed={200}
        shadow="0 0 10px #2299DD,0 0 5px #2299DD"
        
      /> */}

      {children}
    </ThemeProvider>
  );
};

export default function DashboardLayout({ children }) {
  const drawerWidth = 223;

  return (
    <SessionProvider>
      <DarkModeProvider>
        <ContextConsumer>
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
            <span style={{ color: "#00ACF3" }}>Digicon Technologies ltd.</span>
          </Typography>
        </ContextConsumer>
      </DarkModeProvider>
    </SessionProvider>
  );
}
