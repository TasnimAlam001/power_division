"use client";
import TicketNavbar from "@/components/TicketPage/TicketNavbar";
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useForm } from "react-hook-form";
import useAxiosSecure from "@/app/Hooks/useAxiousSecure";
import SearchTicketTable from "@/components/TicketPage/SearchTicketTable";

export default function Track() {
  const [axiosSecure] = useAxiosSecure();
  const [ticket, setTicket] = useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    try {
      axiosSecure
        .post("/search", { query: data.query })
        .then((res) => {
          setTicket(res.data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (error) {
      console.error("Error Searching data:", error);
    }
  };
  console.log(ticket);
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        mb: 8,
      }}
    >
      <TicketNavbar />
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography variant="h5" sx={{ textAlign: "center", mt: 10 }}>
          অভিযোগ অনুসন্ধান
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <FormControl sx={{ width: "50%" }}>
            <TextField
              {...register("query", { required: true })}
              fullWidth
              color="success"
              placeholder="Search Complains by ID or Phone Number"
              sx={{
                m: 2,
                "& .MuiInputBase-root": {
                  borderRadius: "40px",
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
            {errors.query && (
              <Typography variant="body2" color="error" sx={{ ml: 6 }}>
                * Please enter ID or Phone Number
              </Typography>
            )}
          </FormControl>
          <Button type="submit" variant="contained" color="success">
            Search
          </Button>
        </form>
        {ticket && (
          <Box sx={{ width: "70%" , mt:6}}>
            <SearchTicketTable rows={ticket} />
          </Box>
        )}
      </Box>
    </Box>
  );
}
