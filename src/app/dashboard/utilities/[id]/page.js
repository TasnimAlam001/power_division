"use client";
import UtilityMonthlyBarCharts from "../../../../components/utilityMonthlyBarChart/UtilityMonthlyBarChart";
import UtilityPageSkeleton from "../../../../components/Skeletons/UtilityPageSkeleton";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useAxiosSecure from "@/app/Hooks/useAxiousSecure";
import UtilityPie from "@/components/utilityPie/UtilityPie";
import UtilityPie2 from "@/components/utilityPie2/UtilityPie2";
import UtilityComplainBarChart from "@/components/utilityComplainBarChart/UtilityComplainBarChart";

export default function UtilityPage({ params }) {
  const [axiosSecure] = useAxiosSecure();
  const [companyData, setCompanyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = params;

  useEffect(() => {
    setLoading(true);
    axiosSecure(`/companyDashboard/${id}`)
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
    <Box sx={{mt:2}}>
      {loading ? (
        <>
          <UtilityPageSkeleton />
        </>
      ) : (
        <>
          <Box>
            <Box sx={{display: "flex", flexDirection: "column" , alignItems:"center"}}>
              <Box >
                <img
                  style={{ maxHeight: "120px" }}
                  src={companyData.company.logo}
                />
              </Box>
              <Typography
                variant="h5"
                color="success.main"
                sx={{fontWeight:700, mt:1}}
                
              >
                {companyData.company.name}
              </Typography>
            </Box>

            <Box mt={6}>
              <UtilityMonthlyBarCharts
                ticketData={companyData?.last30DaysTicketStatusWiseCount}
              />
            </Box>
            <Box mt={6}>
              <Grid container spacing={2}>
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
//   const res = await fetch("http://172.17.0.87:16999/api/web-app//dashboard")
//   const utilities = res.data.data;

//   return utilities.map((utility)=>({
//       id:utility.id.toString(),
//   }))
// }
