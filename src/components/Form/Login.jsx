"use client";
import React from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { green, red } from "@mui/material/colors";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { loginAction } from "@/components/loginAction/loginAction";
import AxiosSecure from "@/app/Hooks/useAxiousSecure";



export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      let r = await loginAction(data);

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
          `${error.response ? error.response.data.message
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
    <form id="loginForm" onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ width: "100%" }}>
        <FormControl variant="outlined">
          <InputLabel htmlFor="component-simple">Email</InputLabel>
          <OutlinedInput
            sx={{ width: { xs: 280, sm: 350 } }}
            id="component-outlined"
            label="Email"
            value={email}
            {...register("email", { required: true })}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            {...register("password", { required: true })}
            onChange={(e) => {
              setPassword(e.target.value);
              if (e.key === "Enter") {
                e.preventDefault();
                handleSubmit(onSubmit)();
              }
            }}
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
      >
        Sign In
      </Button>
    </form>
  );
}
