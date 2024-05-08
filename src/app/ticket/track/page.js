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
import React from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

export default function page() {
  return (
    <Box
      sx={{
        
        bgcolor: "background.paper",
        mb: 8,
      }}
    >
      <TicketNavbar />
      <Box sx={{display: "flex",
        alignItems: "center",
        flexDirection: "column",}}>
        {/* <Paper
          elevation={4}
          sx={{
            mt: 5,
            width: "80%",
            p: 4,
            // boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
          }}
        > */}
          <Typography variant="h5" sx={{ textAlign: "center", mt:10 }}>
            অভিযোগ অনুসন্ধান
          </Typography>
          <FormControl sx={{width:"50%"}}>
            <TextField
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
          </FormControl>
          <Button variant="contained" color="success">Search</Button>
        {/* </Paper> */}
      </Box>
    </Box>
  );
}
