import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import bdGovtLogo from "@/assets/images/bdGovtLogo.svg";
import { InputAdornment, Stack, TextField } from "@mui/material";
import Image from "next/image";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Link from "next/link";
import Call from "../../assets/images/Call.svg"

export default function TicketNavbar() {
  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <AppBar
        position="static"
        color="inherit"
        variant="none"
        sx={{ boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)" }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Link href="/login">
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
          </Link>
          <Box>
            <Image src={Call} alt="" width={50} height={50}></Image>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
