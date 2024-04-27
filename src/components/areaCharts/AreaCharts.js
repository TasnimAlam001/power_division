"use client";
import * as React from "react";
import {
  Box,
  Card,
  CardContent,
  Stack,  
  Typography,
  useMediaQuery,
} from "@mui/material";

import { LineChart, axisClasses } from "@mui/x-charts";
import theme from "@/app/theme";


const chartSetting = {
  yAxis: [
    {
      label: "Ticket Count",
    },
  ],
};

export default function AreaCharts(params) {
  //---------------------- Getting and setting the data
  let { dashboardData } = params;
  const { longPendingComplainCompanyWiseCount } = dashboardData;

  const openedData = longPendingComplainCompanyWiseCount.map(
    (item) => item.count
  );
  const xLabels = longPendingComplainCompanyWiseCount.map((item) => item.company_short_name);

  //-----------------------Responsive breakpoints

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isLgScreen = useMediaQuery(theme.breakpoints.down("lg"));

  const width = isSmallScreen
    ? 250
    : isMediumScreen
    ? 360
    : isLgScreen
    ? 630
    : 529;
  const height = isMediumScreen ? (isSmallScreen ? 280 : 310) : 400;
  const boxHeight = isMediumScreen ? (isSmallScreen ? 399 : 460) : 460;
  const fontS = isMediumScreen ? 8 : 11;

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
                Utility Wise Long Pending Opened Tickets
              </Typography>
              <Stack sx={{ mt: 3 }} direction="row" alignItems="center">
                <LineChart
                  margin={{
                    top: 70,
                    left: isMediumScreen ? 30 : 65,
                    right: 35,
                    bottom: 60,
                  }}
                  width={width}
                  height={height}
                  series={[
                    {
                      data: openedData,
                      label: "Opened Tickets",
                      area: true,
                      showMark: true,

                      gradient: {
                        from: "#1ACBC0",
                        to: "#D9D9D9",
                      },
                    },
                  ]}
                  slotProps={{
                    legend: {
                      itemMarkWidth: 10,
                      itemMarkHeight: 10,
                      labelStyle: {
                        fontSize: 15,
                      },
                    },
                  }}
                  xAxis={[
                    {
                      scaleType: "point",
                      data: xLabels,
                      tickLabelStyle: {
                        angle: isMediumScreen ? 70 : 0,
                        textAnchor: isMediumScreen ? "start" : "middle",
                        fontSize: fontS,
                      },
                    },
                  ]}              

                  sx={{
                    "& path": {
                      fill: "url(#linear-gradient)",
                    },
                    ".MuiLineElement-root": {
                      display: "none",
                    },
                    [`.${axisClasses.left} .${axisClasses.label}`]: {
                      transform: "translate(-20px, 0)",
                    },
                  }}
                  {...chartSetting}
                >
                  <defs>
                    <linearGradient
                      id="linear-gradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#1ACBC0"
                        stopOpacity={0.95}
                      />
                      <stop offset="100%" stopColor="#D9D9D9" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                </LineChart>
              </Stack>
            </CardContent>
          </Stack>
        </Card>
      </Box>
  );
}
