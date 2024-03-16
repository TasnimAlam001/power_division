"use client";
import * as React from "react";
import {
  Card,
  CardContent,
  Divider,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  Box,
} from "@mui/material";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts";
import theme from "@/app/theme";

const data = [
  { label: "Opened", value: 273, color: "#04984A" },
  { label: "Processing", value: 236, color: "#10C6FF" },
  { label: "Solved", value: 374, color: "#3382EF" },
  { label: "Reopened", value: 310, color: "#00BBC7" },
];

const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);

const getArcLabel = (params) => {
  const percent = params.value / TOTAL;
  return `${(percent * 100).toFixed(0)}%`;
};

export default function UtilityPie({companyData}) {

  let {
    totalTicketCount,
    openTicketCount,
    processingTicketCount,
    closeTicketCount,
    reopenTicketCount,
  } = companyData;

  
  let data = [
    { label: "Opened", value: openTicketCount, color: "#04984A" },
    { label: "Processing", value: processingTicketCount, color: "#10C6FF" },
    { label: "Solved", value: closeTicketCount, color: "#3382EF" },
    { label: "Reopened", value: reopenTicketCount, color: "#00BBC7" },
  ];

  //-------------------Making percentage of value

  const getArcLabel = (params) => {
    // console.warn(params)
    if (params.value == 0) {
      return " ";
    } else {
      const percent = params.value / totalTicketCount;
      return `${(percent * 100).toFixed(0)}%`;
    }
  };



  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isLgScreen = useMediaQuery(theme.breakpoints.down("lg"));

  // const width = isMediumScreen ? (isSmallScreen ? 260 : 360) : 410;
  const width = isSmallScreen
    ? 260
    : isMediumScreen
    ? 360
    : isLgScreen
    ? 290
    : 410;
  const height = isMediumScreen ? (isSmallScreen ? 290 : 290) : 150;
  const boxHeight = isMediumScreen ? (isSmallScreen ? 360 : 360) : 217;

  // const markH = isMediumScreen ? 4: 15;
  const markFont = isMediumScreen ? 12 : 15;

  return (
    <div>
      <Card sx={{boxShadow: "0px 10px 40px 0px #00000008", borderRadius:3}}>
        <Stack
          sx={{ height: boxHeight }}
          direction="column"
          justifyContent="space-between"
        >
          <CardContent>
            <Typography variant="h6">Total Tickets</Typography>
            <PieChart
              margin={{
                top: isMediumScreen ? 105 : 10,
                left: isMediumScreen ? 90 : 5,
              }}
              series={[
                {
                  outerRadius: 65,
                  innerRadius: 30,
                  data,
                  arcLabel: getArcLabel,
                },
              ]}
              slotProps={{
                legend: isMediumScreen
                  ? {
                      direction: "row",
                      position: { vertical: "top", horizontal: "middle" },
                      itemMarkWidth: 9,
                      itemMarkHeight: 9,
                    }
                  : {
                      itemMarkWidth: 9,
                      itemMarkHeight: 9,
                      labelStyle: {
                        fontSize: markFont,
                      },
                    },
              }}
              width={width}
              height={height}
              sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                  fill: "white",
                  fontSize: 13,
                },
              }}
            />
            
          </CardContent>
       
        </Stack>
      </Card>
    </div>
  );
}
