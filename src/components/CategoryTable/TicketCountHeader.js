import React from 'react'
import { Box, Divider} from "@mui/material";

export default function TicketCountHeader({params , data}) {
    const dateString = params.colDef.headerName;
    
  return (
    <Box sx={{lineHeight: "25px"}}>
      <Box component="span" sx={{fontSize: 16}}>{dateString} ({data})</Box>
      
    </Box>
  )
}
