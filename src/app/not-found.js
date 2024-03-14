import { blue } from '@mui/material/colors'
import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <div>
        Requested page is not found. <br></br>

        Go Back to <Link href="/dashboard" style={{color: blue[800]}}> Dashboard</Link>
      
    </div>
  )
}
