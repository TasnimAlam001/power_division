'use client'
 
import { Box, Paper, Typography, Button } from '@mui/material';
import { green, red } from '@mui/material/colors';
import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    
    console.error(error);
  }, [error]);

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper
        sx={{
          p: 4,
          maxWidth: 500,
          width: '100%',
          textAlign: 'center',
          borderRadius: 4,
          boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column', 
          alignItems: 'center', 
        }}
        elevation={3}
      >
        <img 
          src="/error.svg"
          alt='error img' 
          style={{ width: '150px', height: '150px' }}
        />
        <Typography variant="h5" sx={{ color: red[700],mb:2 }}>
          Something went wrong.
        </Typography>
        {/* <Typography variant='caption'>{error}</Typography> */}
        <Button
          variant="contained"
          sx={{ backgroundColor: green[400], borderRadius: 4 , "&:hover": {backgroundColor:green[600]}}}
          onClick={() => reset()}
        >
          Try again
        </Button>
      </Paper>
    </Box>
  );
}
