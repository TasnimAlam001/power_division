'use client'
 
import { Box, Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import { useEffect } from 'react'
 
export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <Box sx={{width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center"}}>
      <Box>
      <Typography variant='h3' sx={{color: red[700]}}>Something went wrong . </Typography>
      <button style={{color: "success.main"}}
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
      </Box>
    </Box>
  )
}