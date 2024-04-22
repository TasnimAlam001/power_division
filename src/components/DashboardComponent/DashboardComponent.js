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
  const [selectedDates, setSelectedDates] = useState(dashboardData.startDate,dashboardData.endDate);

  useEffect(() => {
    setLoading(true);
    if (selectedDates && selectedDates.from && selectedDates.to) {
      axiosSecure(
        `/dashboard?start_date=${selectedDates.from}&end_date=${selectedDates.to}`
      )
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
   
      setSelectedDates(dashboardData.startDate, dashboardData.endDate);
      console.log("uuuuuuuuuuuuuuuuuuddddddddddddddd",dashboardData.startDate, dashboardData.endDate)
  }, [dashboardData]);

  // console.log("................", selectedDates.from,selectedDates.to )

  // useEffect(() => {
  //   setLoading(true);
  //   if (selectedDates && selectedDates.from && selectedDates.to) {
  //     axiosSecure(`/dashboard?start_date=${selectedDates.from}&end_date=${selectedDates.to}`)
  //       .then((res) => {
  //         setLoading(false);
  //         setDashboardData(res.data.data);
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //         setLoading(false);
  //       });
  //   } else {
  //     setLoading(false); // No need to set loading to false if no API call is made
  //     // Optionally, you can set default data or handle the absence of selected dates here
  //   }
  // }, [selectedDates, axiosSecure]);

  // useEffect(() => {
  //   // Update the URL when selectedDates change
  //   if (selectedDates ) {
  //     router.push(`/dashboard?start_date=${selectedDates.from}&end_date=${selectedDates.to}`);
  //   } else{
  //   router.push(`/dashboard?start_date=${dashboardData.startDate}&end_date=${dashboardData.endDate}`);
  // }
  // }, [selectedDates, router,dashboardData]);

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

            <DashboardDate
              onDatesSelected={setSelectedDates}
              startDate={dashboardData.startDate}
              endDate={dashboardData.endDate}
            />
          </Stack>

          <Box my={4}>
            <Utilities dashboardData={dashboardData} selectedDates={selectedDates}/>
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
