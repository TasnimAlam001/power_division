"use client";
import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import {
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import theme from "@/app/theme";
import { axisClasses } from "@mui/x-charts";


const chartSetting = {
  yAxis: [
    {
      label: "Ticket Count",
    },
  ],

  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-20px, 0)",
    },
  },
};

export default function BarCharts(params) {
   //---------------------- Getting and setting the data
  let { dashboardData } = params;
  const { utilityWiseOpenAndClosed } = dashboardData;
  const solvedData = utilityWiseOpenAndClosed.map((item) => item.close);
  const openedData = utilityWiseOpenAndClosed.map((item) => item.open);
  const xLabels = utilityWiseOpenAndClosed.map((item) => item.company_short_name);



    //-----------------------Responsive breakpoints

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isLgScreen = useMediaQuery(theme.breakpoints.down("lg"));

  const width = isSmallScreen
    ? 215
    : isMediumScreen
    ? 315
    : isLgScreen
    ? 580
    : 520;
  const height = isMediumScreen ? (isSmallScreen ? 290 : 330) : 400;
  const boxHeight = isMediumScreen ? (isSmallScreen ? 410 : 460) : 460;
  const fontS = isSmallScreen ? 9 : 12;

 
  return (
    <Box sx={{ position: "relative" }}>
    <Card sx={{boxShadow: "0px 10px 40px 0px #00000008", borderRadius:3}}>
      <Stack
        sx={{ height: boxHeight }}
        direction="column"
        justifyContent="space-between"
      >
        <CardContent>
          <Typography variant="h6">
            Utility Wise Tickets ( Opened and Solved)
          </Typography>
          <Stack sx={{ mt: 3 }} direction="row" alignItems="center">
            <BarChart
              margin={{
                top: 60,
                bottom: 90,
                right: 0,
                left: 20,
              }}
              width={width}
              height={height}
              series={[
                {
                  data: openedData,
                  label: "Opened",
                  id: "openedId",
                  color: "#04984A",
                },
                {
                  data: solvedData,
                  label: "Solved",
                  id: "solvedId",
                  color: "#3382EF",
                },
              ]}
              slotProps={{
                legend: {
                  itemMarkHeight: 9,
                  itemMarkWidth: 9,
                  labelStyle: {
                    fontSize: 15,
                  },
                },
              }}
              xAxis={[
                {
                  data: xLabels,
                  align:"start",
                  scaleType: "band",
                  tickLabelStyle: {
                    angle: isMediumScreen ? 90 : 0,
                    textAnchor:"start",                        
                    fontSize: fontS,
                  },
                },
              ]}
              {...chartSetting}
            />
          </Stack>
        </CardContent>
      </Stack>
    </Card>
  </Box>
  );
}
