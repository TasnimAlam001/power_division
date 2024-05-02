import { Box } from "@mui/material";
import React from "react";

export default function CategoryName({params}) {
  const value = params.colDef.headerName;

  return (
    <Box sx={{ lineHeight: "25px" }}>
      <Box component="span" sx={{ fontSize: 16 }}>
        {value}
      </Box>
    </Box>
  );
}
