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
import { useRouter, useSearchParams } from "next/navigation";

export default function UtilityPage({ params }) {
  const [axiosSecure] = useAxiosSecure();
  const [companyData, setCompanyData] = useState([]);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { id } = params;
  const searchParams = useSearchParams();

  useEffect(() => {
    Aos.init();
  }, []);

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
  }, [axiosSecure, id]);

  if (searchParams.size == 0) {
    if (
      companyData &&
      companyData.startDate !== undefined &&
      companyData.endDate !== undefined
    ) {
      router.push(
        `/dashboard/utilities/${id}?start_date=${companyData.startDate}&end_date=${companyData.endDate}`
      );
    }
  }

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
