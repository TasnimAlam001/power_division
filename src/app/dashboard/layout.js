"use client";
import Navbar from "@/components/navbar/navbar";
import { ThemeProvider, useTheme } from "@emotion/react";
import { Box, Typography, CssBaseline } from "@mui/material";
import { Inter } from "next/font/google";
import React from "react";
import webTheme from "../theme";

const inter = Inter({ subsets: ["latin"] });
export default function DashboardLayout({ children }) {
  const drawerWidth = 223;
  const theme = useTheme();
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider theme={webTheme}>
          <CssBaseline />
          <Navbar />
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
      </body>
    </html>
  );
}
