import { Box } from '@mui/material'
import { deepOrange, green, orange, red } from '@mui/material/colors'
import React from 'react'

export default function UserTypeCell({ params }) {
    // console.log("status page", params.formattedValue)
    const type = params.formattedValue;

    let color;
    

    if (type === "admin") {
        color = red[500];
        
    } else if (type === "company") {
        color = green[500];
       
    }else if (type === "customer") {
        color = orange[300];
        
    } else {
        color = deepOrange[300];
        
    }

    return (
        <Box sx={{ p: 1,  borderRadius: "10px", border: 1 , color: color}}>
            {type}
        </Box>
    )
}
