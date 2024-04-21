"use client";
import { Box, Stack, Typography } from "@mui/material";
import Utilities from "@/app/dashboard/utilities/page";
import AllCharts from "../allCharts/AllCharts";
import useAxiosSecure from "@/app/Hooks/useAxiousSecure";
import { useEffect, useState } from "react";
import HomeSkeleton from "../Skeletons/HomeSkeleton";
import DashboardDate from "../Dates/DashboardDate";
import { useRouter } from "next/navigation";


const DashboardComponent = () => {
  const router = useRouter();
  const [axiosSecure] = useAxiosSecure();
  const [dashboardData, setDashboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDates, setSelectedDates] = useState(null);

  useEffect(() => {
    setLoading(true);
    if (selectedDates) {      
      axiosSecure(`/dashboard?start_date=${selectedDates.from}&end_date=${selectedDates.to}`)
        .then((res) => {
          setLoading(false);
          setDashboardData(res.data.data);
        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
        });
    } else {
      axiosSecure("/dashboard")
        .then((res) => {
          setLoading(false);
          setDashboardData(res.data.data);
        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
        });
    }
  }, [selectedDates, axiosSecure]);

  useEffect(() => {
    // Update the URL when selectedDates change
    if (selectedDates) {
      router.push(`/dashboard?m=l&start_date=${selectedDates.from}&end_date=${selectedDates.to}`);
    } else {
      router.push(`/dashboard?m=l&start_date=${dashboardData.startDate}&end_date=${dashboardData.endDate}`);
    }
  }, [selectedDates, router,dashboardData]);


  // console.log(",...............", dashboardData)

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

            <DashboardDate onDatesSelected={setSelectedDates} startDate={dashboardData.startDate} endDate={dashboardData.endDate}/>
          </Stack>

          <Box my={4}>
            <Utilities dashboardData={dashboardData} />
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
