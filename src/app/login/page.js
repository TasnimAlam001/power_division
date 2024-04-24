
import {
  Box,
  Grid,
  Stack,
  Typography
} from "@mui/material";
import Image from "next/image";
import React from "react";
import { green, red } from "@mui/material/colors";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import LoginSVG from "@/components/LoginSVG/LoginSVG";
import Login from "@/components/Form/Login";

export default function MyLogin() {
 

  return (
      <Stack alignItems="center" justifyContent="center" sx={{ mt: 4 }}>
        <Grid container spacing={6} sx={{ ml: { md: 10 }, display: "flex", justifyContent: "center", alignItems: "center"  }}>
          <Grid item xs={12} md={3}>
            <Stack sx={{ px: 2 }} direction="column" spacing={3}>
              <Stack
                direction="column"
                alignItems="center"
                sx={{ alignSelf: "center" }}
              >
                <Image
                  width={60}
                  height={60}
                  src="/logo2.png"
                  spacing={2}
                  alt="ministry of power logo"
                />
                <Typography sx={{ mt: 1 }} variant="body1">
                  বিদ্যুৎ জ্বালানি ও খনিজ সম্পদ মন্ত্রণালয়
                </Typography>
              </Stack>
              <Box>
                <Typography fontWeight={300} variant="subtitle2">
                  Welcome back!
                </Typography>
                <Typography fontWeight={700} variant="h6" sx={{ mb: 4 }}>
                  Login to your account.
                </Typography>
              </Box>
              <Login />
              <ToastContainer />
              <Typography variant="caption" sx={{ textAlign: "center" }}>
                Don`t have an account?{" "}
                <span style={{ color: green[900], fontWeight: 600 }}>
                  Sign up
                </span>
              </Typography>
            </Stack>
            <Typography sx={{ fontSize: 12, mt: 8, textAlign: "center" }}>
              © 2023, All Rights Reserved. Developed By{" "}
              <span style={{ color: "#00ACF3" }}>
                Digicon Technologies ltd.
              </span>
            </Typography>
          </Grid>
          <Grid sx={{ display: { xs: "none", md: "block" } }} item xs={8}>
            {/* Login SVG */}
            <LoginSVG />
          </Grid>
        </Grid>
      </Stack>
  );
}
