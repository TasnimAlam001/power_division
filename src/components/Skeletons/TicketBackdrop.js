"use client"
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

export default function TicketBackdrop() {
  return (
    <div>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
        
      >
        <CircularProgress color="inherit" />
        <Typography>Please wait...</Typography>
      </Backdrop>
    </div>
  );
}