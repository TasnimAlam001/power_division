"use client";
import useAllData from "@/app/Hooks/useAllData";
import { useMediaQuery, useTheme } from "@mui/material";
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
      transform: "translate(-30px, 0)",
    },
  },
};

export default function BarChartComp() {
  const theme = useTheme();
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
  const fontS = isSmallScreen ? 9 : 12;



  const tickets = useAllData();
  const ticket = tickets.utilityWiseOpenAndClosed
  console.log("zzzzzzzzzz",ticket);

  const data = [
    {
      name: "BPDB",
      Solved: 1000,
      Opened: 800,
    },
    {
      name: "BREB",
      Solved: 2700,
      Opened: 1600,
    },
    {
      name: "DESCO",
      Solved: 300,
      Opened: 200,
    },
    {
      name: "DPDC",
      Solved: 1400,
      Opened: 1650,
    },
    {
      name: "WZPDCL",
      Solved: 1400,
      Opened: 1000,
    },
    {
      name: "NESCO",
      Solved: 490,
      Opened: 800,
    },
  ];

  const solvedData = data.map((item) => item.Solved);
  const openedData = data.map((item) => item.Opened);
  const xLabels = data.map((item) => item.name);
  return (
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

          scaleType: "band",
          tickLabelStyle: {
            angle: isMediumScreen ? 90 : 0,
            textAnchor: "start",
            fontSize: fontS,
          },
        },
      ]}
      {...chartSetting}
    />
  );
}
