"use client";
import UtilityMonthlyBarCharts from "../../../../components/utilityMonthlyBarChart/UtilityMonthlyBarChart";
import UtilityPageSkeleton from "../../../../components/Skeletons/UtilityPageSkeleton";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useAxiosSecure from "@/app/Hooks/useAxiousSecure";
import UtilityPie from "@/components/utilityPie/UtilityPie";
import UtilityPie2 from "@/components/utilityPie2/UtilityPie2";
import UtilityComplainBarChart from "@/components/utilityComplainBarChart/UtilityComplainBarChart";
import Aos from "aos";
import "aos/dist/aos.css";
import { useSearchParams } from "next/navigation";

export default function UtilityPage({ params }) {
  const [axiosSecure] = useAxiosSecure();
  const [companyData, setCompanyData] = useState([]);
  const [selectedDates, setSelectedDates] = useState(null);

  const [loading, setLoading] = useState(true);
  const { id } = params;

  useEffect(() => {
    Aos.init();
  }, []);

  // const searchParams = useSearchParams()
  // useEffect(() => {
  //   // console.log("router.query:----", searchParams.get('start_date'),searchParams.get('end_date'));
    
  //     // const { start_date, end_date } = router.query;

  //     setSelectedDates({
  //       from: searchParams.get('start_date'),
  //       to: searchParams.get('end_date'),
  //     });
     
    
  // }, [searchParams]);

  useEffect(() => {
    setLoading(true);
    axiosSecure(`/companyDashboard/${id}`)
    // axiosSecure(`/companyDashboard/${id}?start_date=${selectedDates.from}&end_date=${searchParams.get('end_date')}`)
      .then((res) => {
        setCompanyData(res.data.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, []);

  // console.log(
  //   companyData,
  //   ",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,"
  // );

  return (
    <Box sx={{ mt: 2 }}>
      {loading ? (
        <>
          <UtilityPageSkeleton />
        </>
      ) : (
        <>
          <Box>
            <Box
              data-aos="zoom-in-up"
              data-aos-offset="300"
              data-aos-duration="800"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box>
                <img
                  style={{ maxHeight: "120px" }}
                  src={companyData.company.logo}
                />
              </Box>
              <Typography
                variant="h5"
                color="success.main"
                sx={{ fontWeight: 700, mt: 1 }}
              >
                {companyData.company.name}
              </Typography>
            </Box>

            <Box mt={6}>
              <UtilityMonthlyBarCharts
                ticketData={companyData?.last30DaysTicketStatusWiseCount}
              />
            </Box>
            <Box mt={4}>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={7}>
                  <UtilityComplainBarChart
                    companyWiseCategoryWiseComplain={
                      companyData?.companyWiseCategoryWiseComplain
                    }
                  />
                </Grid>
                <Grid item xs={12} lg={5}>
                  <Stack
                    justifyContent="space-between"
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", md: "row", lg: "column" },
                    }}
                    spacing={{ xs: 3, md: 0, lg: 3 }}
                  >
                    <Grid item>
                      <UtilityPie companyData={companyData} />
                    </Grid>
                    <Grid item>
                      <UtilityPie2
                        previous2MonthTicketCount={
                          companyData?.previous2MonthTicketCount
                        }
                      />
                    </Grid>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
}

// export async function generateStaticParams(){
//   const res = await fetch("http://202.51.182.190:5412/api/web-app//dashboard")
//   const utilities = res.data.data;

//   return utilities.map((utility)=>({
//       id:utility.id.toString(),
//   }))
// }
