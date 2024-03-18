import Navbar from "@/components/navbar/navbar";
import { Box } from "@mui/material";
import { Inter } from "next/font/google";
import React from "react";

const inter = Inter({ subsets: ["latin"] });
const drawerWidth = 223;
export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <Navbar/>
          
          <Box
            sx={{
              bgcolor:"#fafbfc",
              pt: 10,
              pl: { xs: 2, md: `${drawerWidth}px` },
              pr: { xs: 2, md: 3 },
            }}
          >
            {children}
          </Box>
     
      </body>
    </html>
  );
}
