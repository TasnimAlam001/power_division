"use client";
import { Box, Stack, Typography } from "@mui/material";
import Utilities from "@/app/dashboard/utilities/page";
import AllCharts from "../allCharts/AllCharts";
import Date from "../date/page";
import useAxiosSecure from "@/app/Hooks/useAxiousSecure";
import { useEffect, useState } from "react";
import HomeSkeleton from "../Skeletons/HomeSkeleton";

const DashboardComponent = () => {
  const [axiosSecure] = useAxiosSecure();
  const [dashboardData, setDashboardData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axiosSecure("/dashboard")
      .then((res) => {
        setLoading(false);
        setDashboardData(res.data.data);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, []);
  return (
    <Box>
      {loading ? (
        <>
          <HomeSkeleton />
        </>
      ) : (
        <>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              sx={{ fontSize: 19, fontWeight: 600, color: "success.main" }}
            >
              All Utilities
            </Typography>

            <Date />
          </Stack>

          <Box my={6}>
            <Utilities dashboardData={dashboardData}/>
          </Box>
          <Box>
            <AllCharts dashboardData={dashboardData} />
          </Box>
        </>
      )}
    </Box>
  );
};

export default DashboardComponent;



