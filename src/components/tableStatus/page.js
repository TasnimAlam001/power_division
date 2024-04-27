import { Box } from '@mui/material'
import { deepOrange, green, orange } from '@mui/material/colors'
import React from 'react'

export default function TableStatusColumn({ params }) {
    const status = params.formattedValue;

    let color;
    let newStatus = "";

    if (status === "1") {
        color = green[500];
        newStatus = "Opened"
    } else if (status === "2") {
        color = green[200];
        newStatus = "Processing"
    }else if (status === "3") {
        color = orange[300];
        newStatus = "Closed"
    } else {
        color = deepOrange[300];
        newStatus = "Reopened"
    }

    return (
        <Box sx={{ p: 0.5, color: color,}}>
            {newStatus}
        </Box>
    )
}
