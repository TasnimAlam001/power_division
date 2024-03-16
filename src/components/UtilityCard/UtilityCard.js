"use client";
import { Box, Grid, Paper, Typography } from "@mui/material";
import Aos from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function UtilityCard({ data }) {
  const [count, setCount] = useState(0);
  const duration = 2000;
  useEffect(() => {
    Aos.init();
  }, []);

  useEffect(() => {
    const end = data.total_tickets;
    let start = 0;
    if (start === end) return;

    let totalMilSecDur = parseInt(duration);
    let incrementTime = totalMilSecDur / end;

    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [data.total_tickets, duration]);
  return (
    <Grid item xs={12} sm={6} lg={4} xl={2} key={data.id}>
      <div data-aos="zoom-in-up" data-aos-offset="300" data-aos-duration="800">
        <Paper
          elevation={0}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            height: "241px",
            width: { lg: "180px" },
            borderRadius: "0.5rem",
            boxShadow: "0px 10px 40px 0px #00000008",
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
            {count}
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
      </div>
    </Grid>
  );
}