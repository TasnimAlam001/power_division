"use client";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  useMediaQuery,
  Typography
} from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import { green, red } from "@mui/material/colors";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";

import { loginAction } from "@/components/loginAction/loginAction";
// import useAxiosSecure from "../Hooks/AxiousSecure";

import LoginSVG from "@/components/LoginSVG/LoginSVG";
import AxiosSecure from "../Hooks/useAxiousSecure";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);  
  const [axiosSecure] = AxiosSecure();

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    

    const email = data.email;
    const password = data.password;

    

    try {
      const res = await axiosSecure.post("login", { email, password });
      await loginAction(data);
      // console.log("response of", r);

      if (res.data.message === "Login Successful") {
        const token = res.data.data.token;

        toast("Login Successful");
        localStorage.setItem("access-token", token);
      }
    } catch (error) {
      reset();
      if (error.response.status === 400) {
        toast.error("Please check your email and password again!");
      } else {
        toast.error(
          `${
            error.response
              ? error.response.data.message
              : "Something went wrong!"
          }`
        );
      }
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

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
              <form id="loginForm" onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ width: "100%" }}>
                  <FormControl variant="outlined">
                    <InputLabel htmlFor="component-simple">Email</InputLabel>
                    <OutlinedInput
                      sx={{ width: { xs: 280, sm: 350 } }}
                      id="component-outlined"
                      // placeholder="Inter your Email"
                      label="Email"
                      autoComplete="email"
                      
                      {...register("email", { required: true })}                     
                    />
                  </FormControl>

                  <br />
                  {errors.email && (
                    <span style={{ color: red[500] }}>Email is required</span>
                  )}
                </Box>
                <Box sx={{ mt: 3, mb: 2 }}>
                  {/* Password field */}
                  <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      sx={{ width: { xs: 280, sm: 350 } }}
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      
                      {...register("password", { required: true })}                    
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </FormControl>

                  <br />
                  {errors.password && (
                    <span style={{ color: red[500] }}>
                      Password is required
                    </span>
                  )}
                </Box>
                {/* <FormControlLabel
                        value="end"
                        control={<Checkbox size="small" />}
                        label="Remember me"
                        labelPlacement="end"
                               /> */}
                <Stack
                  sx={{ width: { xs: 280, sm: 350 } }}
                  // width={350}
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="subtitle2">
                    <Checkbox size="small" /> Remember me
                  </Typography>
                  <Typography
                    fontWeight={550}
                    variant="subtitle2"
                    sx={{ color: green[900] }}
                  >
                    Forget Password?
                  </Typography>
                </Stack>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    width: { xs: 280, sm: 350 },
                    backgroundColor: green[900],
                    "&:hover": {
                      backgroundColor: green[800],
                    },
                  }}
                  // onClick={handleSignIn}
                >
                  Sign In
                </Button>
              </form>
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
