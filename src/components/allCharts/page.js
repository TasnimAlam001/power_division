"use client";
import { Grid, ThemeProvider, createTheme } from "@mui/material";
import React from "react";
import PieChars from "../pieCharts/page";
import BarCharts from "../barCharts/page";
import AreaCharts from "../areaCharts/page";
import ColumnCharts from "../columnCharts/page";


const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 425,
      md: 600,
      lg: 1100,
      xl: 1440,
    },
  },
});

export default function AllCharts() {
  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={5}>
          <PieChars />
        </Grid>
        <Grid item xs={12} lg={7}>
            <BarCharts/>
        </Grid>
        <Grid item xs={12} lg={5}>
            <AreaCharts/>
        </Grid>
        <Grid item xs={12} lg={7}>
            <ColumnCharts/>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
