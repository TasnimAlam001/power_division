"use client";
import useAllData from "@/app/Hooks/uasAllData";
import Utilities from "@/app/dashboard/utilities/page";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";

const DashboardComponent = () => {
  const utility = useAllData();

  console.log("from dashboard", utility);

  return (
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography
          sx={{ fontSize: 19, fontWeight: 600, color: "success.main" }}
        >
          All Utilities
        </Typography>

        {/* <Date /> */}
      </Stack>

      <Box my={6}><Utilities utility={utility} /></Box>
      <Box>{/* <AllCharts></AllCharts> */}</Box>
    </Box>
  );
};

export default DashboardComponent;
