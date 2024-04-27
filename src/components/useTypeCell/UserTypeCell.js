import { Box } from "@mui/material";
import { deepOrange, green, orange, red } from "@mui/material/colors";
import React from "react";

export default function UserTypeCell({ params }) {
  const type = params.formattedValue;

  let color;

  if (type === "admin") {
    color = red[500];
  } else if (type === "company") {
    color = green[500];
  } else if (type === "customer") {
    color = orange[300];
  } else {
    color = deepOrange[300];
  }

  return (
    <Box sx={{ p: 0.5, borderRadius: "10px", color: color, fontWeight: 500 }}>
      {type}
    </Box>
  );
}
