import { Box, Grid, Paper, Stack, Table, TableHead } from "@mui/material";
import React from "react";

export default function CompanyId({ params }) {
  const { id } = params;
  return (
    <Box>
      <Paper elevation={2}>
        
        
        Company id id : {id}</Paper>
    </Box>
  );
}
