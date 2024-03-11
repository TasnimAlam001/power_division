"use client";
import * as React from "react";
import {
  Card,
  CardContent,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts";
import theme from "@/app/theme";

// const data = [
//   { label: "December", value: 273, color: "#04984A" },
//   { label: "January", value: 236, color: "#10C6FF" },
  
// ];

// const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);

// const getArcLabel = (params) => {
//   const percent = params.value / TOTAL;
//   return `${(percent * 100).toFixed(0)}%`;
// };

export default function UtilityPie2({previous2MonthTicketCount}) {
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




  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Generate data array for the pie chart
  const data = previous2MonthTicketCount.map(({ month, count }) => ({
    label: monthNames[month - 1], // Subtract 1 to convert month number to array index
    value: count,
  }));

  // Calculate total count
  const total = data.reduce((acc, { value }) => acc + value, 0);

  // Function to get arc label
  const getArcLabel = ({ value }) => `${((value / total) * 100).toFixed(0)}%`;
  return (
    <div>
      <Card>
        <Stack
          sx={{ height: boxHeight }}
          direction="column"
          justifyContent="space-between"
        >
          <CardContent>
            <Typography variant="h6">Previous 2 Month Ticket Comparison</Typography>
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
