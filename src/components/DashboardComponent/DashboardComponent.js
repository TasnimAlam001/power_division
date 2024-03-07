"use client";
import { Box, Stack, Typography } from "@mui/material";
import useAllData from "@/app/Hooks/useAllData";
import Utilities from "@/app/dashboard/utilities/page";
import AllCharts from "../allCharts/page";
import Date from "../date/page";

const DashboardComponent = () => {
  const utility = useAllData();

  return (
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography
          sx={{ fontSize: 19, fontWeight: 600, color: "success.main" }}
        >
          All Utilities
        </Typography>

        <Date />
      </Stack>

      <Box my={6}>
        <Utilities utility={utility} />
      </Box>
      <Box>
        <AllCharts />
      </Box>
    </Box>
  );
};

export default DashboardComponent;
