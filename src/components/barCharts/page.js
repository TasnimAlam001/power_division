
import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import {
  Box,
  Card,
  CardContent,
  Stack,
  ThemeProvider,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { axisClasses } from "@mui/x-charts";
import webTheme from "@/app/theme";
import useAllData from "@/app/Hooks/useAllData";
import { useTheme } from "@emotion/react";
import BarChartComp from "../helpers/BarChartComp";


const chartSetting = {
  yAxis: [
    {
      label: "Ticket Count",
    },
  ],

  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-30px, 0)",
    },
  },
};


export default async function BarCharts() {
  // const theme = useTheme();
  // const isSmallScreen = useMediaQuery(webTheme.breakpoints.down("sm"));
  // const isMediumScreen = useMediaQuery(webTheme.breakpoints.down("md"));
  // const isLgScreen = useMediaQuery(theme.breakpoints.down("lg"));

  // // const width = isSmallScreen ? 360 : 600;
  // // const height = isSmallScreen ? 330 : 400;
  // const width = isSmallScreen
  //   ? 215
  //   : isMediumScreen
  //   ? 315
  //   : isLgScreen
  //   ? 580
  //   : 520;
  // const height = isMediumScreen ? (isSmallScreen ? 290 : 330) : 400;
  // const boxHeight = isMediumScreen ? (isSmallScreen ? 410 : 460) : 460;
  // const fontS = isSmallScreen ? 9 : 12;
  // const boxHeight = isSmallScreen ? 400 : 460;



  return (
    <ThemeProvider theme={webTheme}>
      <Box sx={{ position: "relative" }}>
        <Card>
          <Stack
            sx={{ height: 460 }}
            direction="column"
            justifyContent="space-between"
          >
            <CardContent>
              <Typography variant="h6">
                Utility Wise Tickets ( Opened and Solved)
              </Typography>
              <Stack sx={{ mt: 3 }} direction="row" alignItems="center">
              <BarChartComp/>
              </Stack>
            </CardContent>
          </Stack>
        </Card>
      </Box>
    </ThemeProvider>
  );
}
