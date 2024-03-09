"use client";
import { Grid, ThemeProvider, createTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import webTheme from "@/app/theme";
import useAxiosSecure from "@/app/Hooks/useAxiousSecure";
import BarCharts from "../barCharts/BarCharts";
import PieChars from "../pieCharts/PieCharts";
import AreaCharts from "../areaCharts/AreaCharts";
import RowCharts from "../rowCharts/RowCharts";


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
        {loading ? (
          "Loading ...."
        ) : (
          <>
            <Grid item xs={12} lg={5}>
              <PieChars dashboardData={dashboardData} />
            </Grid>

            <Grid item xs={12} lg={7}>
              <BarCharts dashboardData={dashboardData} />
            </Grid>
            <Grid item xs={12} lg={5}>
              <AreaCharts dashboardData={dashboardData} />
            </Grid>
            <Grid item xs={12} lg={7}>
              <RowCharts dashboardData={dashboardData} />
            </Grid>
          </>
        )}
      </Grid>
    </ThemeProvider>
  );
}
