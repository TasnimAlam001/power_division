
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import bdGovtLogo from "@/assets/images/bdGovtLogo.svg";
import { InputAdornment, Stack, TextField } from "@mui/material";
import Image from "next/image";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";


export default function TicketNavbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="inherit">
        <Toolbar sx={{display:"flex", justifyContent:"space-between"}}>          
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              height={70}
              width={200}
              pl={2}
              py={2}
            >
              <Image
                src={bdGovtLogo}
                width={55}
                height={55}
                alt="ministry of power energy and mineral resources bangladesh logo"
              />
              <Typography variant="caption" pl={1} component="h6">
                Ministry of Power Energy & Mineral Resources
              </Typography>
            </Stack>
            <Box>
              <TextField
                label="Search Complains"
                sx={{ m: 1, width: "25ch" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
         
        </Toolbar>
      </AppBar>
    </Box>
  );
}