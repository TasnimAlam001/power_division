import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import { BarChart, axisClasses } from "@mui/x-charts";
import React from "react";

export default function UtilityBarChart({ ticketData }) {
  // console.log("........................", ticketData);

  const dates = Object.keys(ticketData);
  const openedCounts = dates.map((date) => {
    return ticketData[date]["opened"] || 0;
  });
  const processingCounts = dates.map((date) => {
    return ticketData[date]["processing"] || 0;
  });
  const closedCounts = dates.map((date) => {
    return ticketData[date]["closed"] || 0;
  });
  const reopenedCounts = dates.map((date) => {
    return ticketData[date]["reopened"] || 0;
  });

  // console.log("Dates:", dates);
  // console.log("Opened Counts:", openedCounts);

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

  return (
    <Card>
      <Stack
        sx={{ height: 550 }}
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
                bottom: 100,
              }}
              height={450}
              series={[
                {
                  data: openedCounts,
                  label: "Opened",
                  id: "openedId",
                  stack: "total",
                  
                 
                },
                {
                  data: closedCounts,
                  label: "closed",
                  id: "closedId",
                  stack: "total",
                },
                {
                  data: processingCounts,
                  label: "Processing",
                  id: "processingId",
                  stack: "total",
                },
                {
                  data: reopenedCounts,
                  label: "Reopened",
                  id: "reopenedId",
                  stack: "total",
                },
              ]}
              xAxis={[
                {
                  data: dates,
                  scaleType: "band",

                  tickLabelStyle: {
                    angle: -45,
                    textAnchor: "end",
                  },
                  categoryGapRatio: dates.length < 10 ? 0.9 : undefined,
                },
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
