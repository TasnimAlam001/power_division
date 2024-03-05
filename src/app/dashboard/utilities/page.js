
// import getAllUtilities from "@/lib/getAllUtilities";
import { Box, Grid, Paper, ThemeProvider, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";


export default function Utilities({utility}) {

  // const result = await getAllUtilities();
  // console.log(result)
  return (
    <Grid container spacing={{ xs: 2, sm: 4 }}>
      {utility.map((data) => (
        <Grid item xs={12} sm={6} lg={4} xl={2} key={data.id}>
          <Paper
            elevation={2}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",

              borderRadius: "0.5rem",
            }}
          >
            <Link href={`/dashboard/utilities/${data.id}`}>
              <Box height={100} px={2} pt={2} pb={2}>
                <img
                  height="100%"
                  width="100%"
                  src={data.logo}
                  alt="logo"
                ></img>
              </Box>
            </Link>
            <Typography sx={{ fontSize: { xs: 13, md: 17 } }}>
              Total Complaints
            </Typography>
            <Typography
              sx={{ color: "success.main" }}
              mb={3}
              gutterBottom
              variant="h5"
            >
              {data.total_tickets}
            </Typography>

            <Box
              py={0.5}
              sx={{
                fontSize: 10,
                backgroundColor: "success.light",
                width: "100%",
                fontWeight: 550,
                textAlign: "center",
                color: "black",

                borderBottomLeftRadius: 6,
                borderBottomRightRadius: 6,
              }}
            >
              {data.last_connected_at}
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
