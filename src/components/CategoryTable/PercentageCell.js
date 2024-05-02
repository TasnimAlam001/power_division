import { Box } from "@mui/material";
import React from "react";

export default function PercentageCell({ params }) {
  const value = params.formattedValue;

  return (
    <Box>
      {value} %
    </Box>
  );
}
