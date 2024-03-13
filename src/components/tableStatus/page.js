import { Box } from '@mui/material'
import { deepOrange, green, orange } from '@mui/material/colors'
import React from 'react'

export default function TableStatusColumn({ params }) {
    // console.log("status page", params.formattedValue)
    const status = params.formattedValue;

    let backgroundColor;
    let newStatus = "";

    if (status === "1") {
        backgroundColor = green[500];
        newStatus = "Opened"
    } else if (status === "2") {
        backgroundColor = green[200];
        newStatus = "Processing"
    }else if (status === "3") {
        backgroundColor = orange[300];
        newStatus = "Closed"
    } else {
        backgroundColor = deepOrange[300];
        newStatus = "Reopened"
    }

    return (
        <Box sx={{ p: 1, backgroundColor: backgroundColor, borderRadius: "10px" }}>
            {newStatus}
        </Box>
    )
}
