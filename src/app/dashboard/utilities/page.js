import { Box, Grid, Paper, Typography } from "@mui/material";
import Link from "next/link";

export default function Utilities({ dashboardData }) {
  const utility = dashboardData?.companyListWithTickets;

  return (
    <Grid container spacing={{ xs: 2, sm: 3 }}>
      {utility?.map((data) => (
        <Grid item xs={12} sm={6} lg={4} xl={2} key={data.id} >
          <Box>
            <Paper
              elevation={2}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                height: "241px",
                width: { lg: "180px" },
                borderRadius: "0.5rem",
              }}
            >
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "50%",
                  borderTopLeftRadius: "0.5rem",
                  borderTopRightRadius: "0.5rem",
                }}
              >
                <Link href={`/dashboard/utilities/${data.id}`}>
                  <Box
                    height={120}
                    alignItems="center"
                    justifyContent="center"
                    px={2}
                    py={2}
                    style={{
                      display: "flex",
                      overflow: "hidden",
                      transition: "transform 0.3s ease-in",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "scale(1.1)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <img
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        width: "auto",
                        height: "auto",
                      }}
                      src={data.logo}
                      alt="logo"
                    />
                  </Box>
                </Link>
              </Box>
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
                  backgroundColor: "#04984A1A",
                  width: "100%",
                  fontWeight: 550,
                  textAlign: "center",
                  

                  borderBottomLeftRadius: 6,
                  borderBottomRightRadius: 6,
                }}
              >
                {data.last_connected_at}
              </Box>
            </Paper>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}
