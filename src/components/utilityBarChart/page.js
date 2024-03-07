"use client";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import { BarChart, axisClasses } from "@mui/x-charts";
import React from "react";

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
const seriesA = {
  data: [
    2, 3, 1, 4, 5, 2, 4, 5, 1, 2, 4, 5, 1, 2, 4, 5, 1, 2, 4, 5, 1, 2, 4, 5, 1,
    2, 4, 5, 1, 5, 1,
  ],
  label: "Opened",
};
const seriesB = {
  data: [
    3, 1, 4, 2, 1, 2, 4, 5, 1, 2, 4, 5, 1, 2, 4, 5, 1, 2, 4, 5, 1, 2, 4, 5, 1,
    2, 4, 5, 1, 5, 1,
  ],
  label: "Processing",
};
const seriesC = {
  data: [
    3, 2, 4, 5, 1, 2, 4, 5, 1, 2, 4, 5, 1, 2, 4, 5, 1, 2, 4, 5, 1, 2, 4, 5, 1,
    2, 4, 5, 1, 5, 1,
  ],
  label: "Solved",
};
const seriesD = {
  data: [
    3, 2, 4, 5, 1, 2, 4, 5, 1, 2, 4, 5, 1, 2, 4, 5, 1, 2, 4, 5, 1, 2, 4, 5, 1,
    2, 4, 5, 1, 5, 1,
  ],
  label: "Reopened",
};
export default function UtilityBarChart() {
  return (
    <Card>
      <Stack
        sx={{ height: 500 }}
        direction="column"
        justifyContent="space-between"
      >
        <CardContent>
          <Typography variant="h6">Last 30 Days Tickets Status</Typography>
          <Stack sx={{ mt: 3 }} direction="row" alignItems="center">
            
              <BarChart
                margin={{
                  left: 70,
                  right: 10,
                  top: 80,
                }}
                // width={1000}
                height={400}
                series={[
                  { ...seriesA, stack: "total", color: "#04984A" },
                  { ...seriesB, stack: "total", color: "#10C6FF" },
                  { ...seriesC, stack: "total", color: "#3382EF" },
                  { ...seriesD, stack: "total", color: "#00BBC7" },
                ]}
                slotProps={{
                  legend: {
                    padding: 10,
                    itemMarkHeight: 9,
                    itemMarkWidth: 9,
                    labelStyle: {
                      fontSize: 15,
                    },
                  },
                }}
                {...chartSetting}
              />
           
          </Stack>
        </CardContent>
      </Stack>
    </Card>
  );
}
