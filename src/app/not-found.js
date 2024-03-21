import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';

const NotFound = () => {
  return (
    <Box
      sx={{
        backgroundImage: 'url("/404.jpg")', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        justifyContent: 'flex-end',
        textAlign: 'center',
      }}
    >
      <Box sx={{color: "black", pb:10}}>
        <Box>
          Go Back to{' '}
          <Link style={{backgroundColor:'black', padding:5, color:"white", borderRadius:"8px"}} href="/dashboard" passHref>
             Dashboard
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default NotFound;
