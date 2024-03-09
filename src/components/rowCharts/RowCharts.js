"use client";
import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import {
  Card,
  CardContent,
  Stack,
  ThemeProvider,
  Typography,
  useMediaQuery,
} from "@mui/material";
import theme from "@/app/theme";
import webTheme from "@/app/theme";


export default function RowCharts(params) {
    //---------------------- Getting and setting the data
  let { dashboardData } = params;
  const { longPendingComplainCategoryAndCount } = dashboardData;
  const dataset = longPendingComplainCategoryAndCount;
    //-----------------------Responsive breakpoints
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isLgScreen = useMediaQuery(theme.breakpoints.down("lg"));

  const width = isSmallScreen
    ? 170
    : isMediumScreen
    ? 280
    : isLgScreen
    ? 510
    : 470;
  const height = isMediumScreen ? (isSmallScreen ? 290 : 330) : 400;
  const boxHeight = isMediumScreen ? (isSmallScreen ? 400 : 430) : 460;
  const fontS = isMediumScreen ? 8 : 12;

  return (
    <ThemeProvider theme={webTheme}>
      <div>
        <Card>
          <Stack
            sx={{ height: boxHeight }}
            direction="column"
            justifyContent="space-between"
          >
            <CardContent sx={{ alignContent: "end" }}>
              <Typography variant="h6">
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
                  series={[{ dataKey: "count", color: "#CEB900" }]}
                  layout="horizontal"
                  xAxis={[
                    {
                      label: "Ticket Count",
                    },
                  ]}
                />
              </Stack>
            </CardContent>
          </Stack>
        </Card>
      </div>
    </ThemeProvider>
  );
}
