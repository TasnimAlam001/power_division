"use client"
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Typography } from '@mui/material';

export default function TicketBackdrop() {
  return (
    <div>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
        
      >
        <CircularProgress color="inherit" />
        <Typography sx={{pl:2}}> Please wait...</Typography>
      </Backdrop>
    </div>
  );
}