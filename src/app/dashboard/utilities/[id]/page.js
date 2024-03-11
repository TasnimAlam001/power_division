"use client";

import theme from "@/app/theme";

import UtilityBarChart from "@/components/utilityBarChart/page";
import UtilityPie from "@/components/utilityPie/page";
import UtilityPie2 from "@/components/utilityPie2/page";

import { Box, Grid, Stack, ThemeProvider, Typography } from "@mui/material";
import getUtility from "../../../../../lib/getUtility";
import CompanyData from "@/app/Hooks/CompanyData";
import { useEffect, useState } from "react";
import useAxiosSecure from "@/app/Hooks/useAxiousSecure";
// import RowCharts from "@/components/rowCharts/rowCharts";

export default  function UtilityPage({ params }) {
  const [axiosSecure] = useAxiosSecure();
  const [companyData, setCompanyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = params;

// const [companyData, loading] = CompanyData(id);
  useEffect(() => {
    setLoading(true);
    axiosSecure(`/companyDashboard/${id}`)
      .then((res) => {
        setCompanyData(res.data.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log("error hoisee fetching a", e);
        setLoading(false);
      });
  }, []);

  console.log(
    companyData,
    ",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,"
  );

  return (
    <Box>
      {loading ? (
        <>
          <Typography>Loading...</Typography>
        </>
      ) : (
        <>
          <Box>
            <Box sx={{ width: 200 }}>
              <img width="100%" src={companyData.company.logo} />
            </Box>
            <Typography variant="h6" color="success.main">
              {companyData.company.name}
            </Typography>

            <Box mt={6}>
              <UtilityBarChart
                ticketData={companyData?.last30DaysTicketStatusWiseCount}
              />
            </Box>
            <Box mt={6}>
              <Grid container spacing={2}>
                <Grid item xs={12} lg={7}>
                  {/* <RowCharts/> */}
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
                      <UtilityPie></UtilityPie>
                    </Grid>
                    <Grid item>
                      <UtilityPie2></UtilityPie2>
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
//   const posts = await useAllData();

//   return posts.map((post)=>({
//       id:post.id.toString(),
//   }))
// }
