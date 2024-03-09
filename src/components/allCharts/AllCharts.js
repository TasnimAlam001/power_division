"use client";
import { Grid, ThemeProvider, createTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import PieChars from "../pieCharts/page";
import BarCharts from "../barCharts/page";
import AreaCharts from "../areaCharts/page";
import ColumnCharts from "../columnCharts/page";
import webTheme from "@/app/theme";
import useAxiosSecure from "@/app/Hooks/useAxiousSecure";

export default function AllCharts() {
  const [axiosSecure] = useAxiosSecure();
  const [dashboardData, setDashboardData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axiosSecure("/dashboard")
      .then((res) => {
        setLoading(false);
        setDashboardData(res.data.data);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, []);

  return (
    <ThemeProvider theme={webTheme}>
      <Grid container spacing={3}>
        
        <Grid item xs={12} lg={5}>
          {loading ? (
            "loading..............."
          ) : (
            <PieChars dashboardData={dashboardData} />
          )}
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
