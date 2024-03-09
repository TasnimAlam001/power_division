// "use client";

import theme from "@/app/theme";

import UtilityBarChart from "@/components/utilityBarChart/page";
import UtilityPie from "@/components/utilityPie/page";
import UtilityPie2 from "@/components/utilityPie2/page";


import { Box, Grid, Stack, ThemeProvider, Typography } from "@mui/material";
import React from "react";
import getUtility from "../../../../../lib/getUtility";
// import RowCharts from "@/components/rowCharts/rowCharts";


export default async function UtilityPage({ params }) {
  const { id } = params;
  // console.log(id);
  const utility = await getUtility(id);
  // console.log("vitoreeee",utility);

  return (
    <Box>
      <Box sx={{ width: 200 }}>
        <img width="100%" src={utility.logo} />
      </Box>
      <Typography variant="h6" color="success.main">
        Dhaka Electric Supply Company Limited : {id}
      </Typography>

      <Box mt={6}>
        <UtilityBarChart></UtilityBarChart>
      </Box>
      <Box mt={6}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={7}>
            {/* <RowCharts/> */}
          </Grid>
          <Grid item xs={12} lg={5}>
            <Stack justifyContent="space-between" sx={{display: "flex", flexDirection: {xs: "column", md: "row", lg: "column"}}} spacing={{xs:3, md:0, lg:3 } }>
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
  );
}



// export async function generateStaticParams(){
//   const posts = await useAllData();

//   return posts.map((post)=>({
//       id:post.id.toString(),
//   }))
// }
