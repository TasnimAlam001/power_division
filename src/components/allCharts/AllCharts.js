
import { Grid, ThemeProvider, createTheme } from "@mui/material";
import React from "react";
import PieChars from "../pieCharts/page";
import BarCharts from "../barCharts/page";
import AreaCharts from "../areaCharts/page";
import ColumnCharts from "../columnCharts/page";
import webTheme from "@/app/theme";



export default function AllCharts() {
  return (
    <ThemeProvider theme={webTheme}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={5}>
          <PieChars />
        </Grid>
        
        {/* <Grid item xs={12} lg={7}>
            <BarCharts/>
        </Grid>
        <Grid item xs={12} lg={5}>
            <AreaCharts/>
        </Grid>
        <Grid item xs={12} lg={7}>
            <ColumnCharts/>
        </Grid> */}


      </Grid>
    </ThemeProvider>
  );
}
