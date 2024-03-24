"use client";
import Navbar from "@/components/navbar/navbar";
import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import { Inter } from "next/font/google";
import React from "react";

const inter = Inter({ subsets: ["latin"] });
const drawerWidth = 223;
export default function DashboardLayout({ children }) {
  const theme = useTheme();
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />

        <Box
          sx={{
            bgcolor: theme.palette.mode === "light" ? "#fafbfc" : "#353635",
            pt: 10,
            pl: { xs: 2, md: `${drawerWidth}px` },
            pr: { xs: 2, md: 3 },
          }}
        >
          {children}
        </Box>
        <Typography sx={{ fontSize: 12, mt: 5, textAlign: "center" }}>
          © 2024, All Rights Reserved. Developed By{" "}
          <span style={{ color: "#00ACF3" }}>Digicon Technologies ltd.</span>
        </Typography>
      </body>
    </html>
  );
}
