"use client";
import Navbar from "@/components/navbar/navbar";
import { ThemeProvider } from "@mui/material/styles";
import { Box, Typography, CssBaseline } from "@mui/material";
import React, { useEffect } from "react";
import {
  DarkModeProvider,
  useDarkMode,
} from "@/components/DarkModeProvider/DarkModeProvider";
import { useTheme } from '@mui/material/styles';

const ContextConsumer = (props) => {
  let { children } = props;
  let { myTheme } = useDarkMode();
  console.log("in consumer ", myTheme.palette.mode);

  return <ThemeProvider theme={myTheme}>{children}</ThemeProvider>;
};

export default function DashboardLayout({ children }) {
  const drawerWidth = 223;
  const theme = useTheme();
  const [currentMode, setCurrentMode] = React.useState("light"); // Initialize with 'light'
  useEffect(() => {
    const mode =
      localStorage.getItem("darkMode") || (prefersDarkMode ? "dark" : "light");
    setCurrentMode(mode);
  }, []);

  return (
    <DarkModeProvider>
      <ContextConsumer>
        <CssBaseline />
        <Navbar />
        <Box
          sx={{
            bgcolor: "bg.main",
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
  );
}
