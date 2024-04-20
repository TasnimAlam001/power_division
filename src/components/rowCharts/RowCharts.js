"use client";
import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import {
  Card,
  CardContent,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import theme from "@/app/theme";


export default function RowCharts(params) {
  //---------------------- Getting and setting the data
  let { dashboardData } = params;
  const { longPendingComplainCategoryAndCount } = dashboardData;
  
  // Check if dataset is empty, if so, set it to an array of objects with zero counts
  const dataset = longPendingComplainCategoryAndCount.length === 0
    ? [{ name: 'No Data', count: 0 } /* Add more categories as needed */]
    : longPendingComplainCategoryAndCount;
  
  //-----------------------Responsive breakpoints
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isLgScreen = useMediaQuery(theme.breakpoints.down("lg"));

  const width = isSmallScreen
    ? 240
    : isMediumScreen
    ? 280
    : isLgScreen
    ? 600
    : 520;
  const height = isMediumScreen ? (isSmallScreen ? 290 : 330) : 380;
  const boxHeight = isMediumScreen ? (isSmallScreen ? 400 : 430) : 460;
  const fontS = isMediumScreen ? 8 : 12;

  return (
    <Card sx={{ boxShadow: "0px 10px 40px 0px #00000008", borderRadius: 3 }}>
      <Stack
        sx={{ height: boxHeight }}
        direction="column"
        justifyContent="space-between"
      >
        <CardContent sx={{ alignContent: "end" }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Long Pending Tickets Categories
          </Typography>
          <Stack
            sx={{ pl: 0, textAlign: "right" }}
            direction="row"
            alignContent="flex-end"
            justifyContent="flex-end"
          >
            <BarChart
              margin={{
                right: 0,
              }}
              width={width}
              height={height}
              dataset={dataset}
              yAxis={[
                {
                  scaleType: "band",
                  dataKey: "name",
                  tickLabelStyle: {
                    fontSize: fontS,
                  },
                },
              ]}
              series={[{ dataKey: "count", color: "#CEB900", label: "Ticket Count" }]}
              layout="horizontal"
              slotProps={{
                legend: {
                  itemMarkHeight: 9,
                  itemMarkWidth: 9,
                  labelStyle: {
                    fontSize: 15,
                  },
                },
              }}
            />
          </Stack>
        </CardContent>
      </Stack>
    </Card>
  );
}

