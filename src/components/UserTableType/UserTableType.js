import React from 'react'
import { Box} from "@mui/material";

export default function UserTableType({params}) {
    const dateString = params.colDef.headerName;
    
    console.log(params)
    console.log(dateString)
  return (
    <Box>
      {dateString}
    </Box>
  )
}
