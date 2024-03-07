
import { Box, Stack, Typography } from "@mui/material";
import Utilities from "@/app/dashboard/utilities/page";
import AllCharts from "../allCharts/page";
import Date from "../date/page";
import { Suspense } from "react";


const DashboardComponent =  () => {


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
      <Suspense>

      <Box  my={6}>
        <Utilities/>
      </Box>
      </Suspense>
      <Box>
        <AllCharts />
      </Box>
    </Box>
  );
};

export default DashboardComponent;
