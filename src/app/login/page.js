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
  Typography,
} from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import Image from "next/image";
import React, { useState } from "react";
import { green, red } from "@mui/material/colors";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { loginAction } from "@/components/loginAction/loginAction";
import LoginSVG from "@/components/LoginSVG/LoginSVG";
import AxiosSecure from "../Hooks/useAxiousSecure";
import { redirect } from "next/navigation";

import bdGovtLogo from "@/assets/images/bdGovtLogo.svg";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [axiosSecure] = AxiosSecure();
  const [isLoading, setLoading] = useState(false);

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true)
    const email = data.email;
    const password = data.password;

    try {
      const res = await axiosSecure.post("login", { email, password });
      console.log(res);
      await loginAction(data);
      const nUser = res.data.data.user;

      if (res.data.message === "Login Successful") {
        const token = res.data.data.token;

        localStorage.setItem("access-token", token);
        toast("Login Successful");
        redirect("/dashboard");
        // if (nUser.type === "company") {
        //   setLoading(false)
        //   redirect(`/dashboard/utilities/${nUser.company_id}`);
        // } else {
        //   setLoading(false)

         
        // }
      }
    } catch (error) {
      setLoading(false)

      if (error.response) {
        if (error.response.status === 400) {
          toast.error("Please check your email and password again!");
        } else {
          toast.error(
            `${error.response
              ? error.response.data.message
              : "Something went wrong!"
            }`
          );
        }
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
    <Stack
      height="100vh"
      width="100vw"
      alignItems="center"
      justifyContent="center"
      sx={{ mt: 4 }}
    >
      <Grid
        container
        spacing={6}
        sx={{
          ml: { md: 10 },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid item xs={12} md={5}>
          <Stack
            sx={{ px: 2 }}
            direction="column"
            alignItems="center"
            justifyContent="center"
            spacing={3}
          >
            <Stack
              direction="column"
              alignItems="center"
              sx={{ alignSelf: "center" }}
            >
              <Image
                width={60}
                height={60}
                src={bdGovtLogo}
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
                  <span style={{ color: red[500] }}>Password is required</span>
                )}
              </Box>

              <Stack
                sx={{ width: { xs: 280, sm: 350 } }}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="subtitle2">
                  <Checkbox size="small" /> Remember me
                </Typography>
                {/* <Typography
                  fontWeight={550}
                  variant="subtitle2"
                  sx={{ color: green[900] }}
                >
                  Forget Password?
                </Typography> */}
              </Stack>
              <LoadingButton
                // isLoading ? loading= {true} : loading = {false}
                loading={isLoading}
                variant="contained"
                type="submit"
                disabled={isSubmitting}
                sx={{
                  width: { xs: 280, sm: 350 },
                  backgroundColor: green[900],
                  "&:hover": {
                    backgroundColor: green[800],
                  },
                }}
              >
                Sign In
              </LoadingButton>
            </form>
            <ToastContainer />
            {/* <Typography variant="caption" sx={{ textAlign: "center" }}>
              Don`t have an account?{" "}
              <span style={{ color: green[900], fontWeight: 600 }}>
                Sign up
              </span>
            </Typography> */}
          </Stack>
          <Typography sx={{ fontSize: 12, mt: 8, textAlign: "center" }}>
            © 2023, All Rights Reserved. Developed By{" "}
            <span style={{ color: "#00ACF3" }}>Digicon Technologies ltd.</span>
          </Typography>
        </Grid>
        <Grid sx={{ display: { xs: "none", md: "block" } }} item xs={7}>
          {/* Login SVG */}
          <LoginSVG />
        </Grid>
      </Grid>
    </Stack>
  );
}
