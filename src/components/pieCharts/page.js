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
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts";
import theme from "@/app/theme";
import webTheme from "@/app/theme";
import { useTheme } from "@emotion/react";
import { Suspense } from "react";

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

export default function PieChars() {
  const theme = useTheme();
  // console.log("fffffffffffffff",theme.palette.mode)
  // const [value, setValue] = React.useState(0);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isLgScreen = useMediaQuery(theme.breakpoints.down("lg"));  

  // const mode = localStorage.getItem("mode");
  // const darkTheme = React.useMemo(
  //   () =>
  //     createTheme({
  //       palette: {
  //         mode: mode,
  //       },
  //     }),
  //   [mode]
  // );

  // const width = isMediumScreen ? (isSmallScreen ? 260 : 360) : 410;
  const width = isSmallScreen
    ? 260
    : isMediumScreen
    ? 360
    : isLgScreen
    ? 560
    : 410;
  const height = isMediumScreen ? (isSmallScreen ? 290 : 290) : 250;
  const boxHeight = isMediumScreen ? (isSmallScreen ? 560 : 560) : 460;

  // const markH = isMediumScreen ? 4: 15;
  const markFont = isMediumScreen ? 12 : 15;

  return (
    <ThemeProvider theme={webTheme}>
         <div>
      <Card elevation={1}>
        <Stack
          sx={{ height: boxHeight }}
          direction="column"
          justifyContent="space-between"
        >
          <CardContent>
            <Typography variant="h5">Total Tickets</Typography>
            <PieChart
              margin={{
                top: isMediumScreen ? 105 : 10,
                left: isMediumScreen ? 90 : 5,
              }}
              series={[
                {
                  outerRadius: 95,
                  innerRadius: 50,
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

            <Divider sx={{ pt: 4 }} />
            <Grid container columnSpacing={1} sx={{ mt: 4, pl: 3 }}>
              {data.map((name, index) => (
                <Grid item xs={12} md={6} key={name.label}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        backgroundColor: name.color,
                      }}
                    />
                    <Typography
                      sx={{ fontSize: { xs: 13, sm: 15 } }}
                      className="list-disc"
                    >
                      {name.label} Tickets-{name.value}
                    </Typography>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </CardContent>

          <Typography
            bgcolor="#ecedeb"
            pt={0.5}
            textAlign="center"
            variant="caption"
            sx={{ fontWeight: 550, color: "#048943" }}
            className=" bg-slate-200 text-green-700 align-bottom font-bold py-2 text-center"
          >
            Total Tickets : {TOTAL}
          </Typography>
        </Stack>
      </Card>
    </div>
    </ThemeProvider>
  );
}
