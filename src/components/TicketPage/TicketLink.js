import { Box } from '@mui/material';
import Link from 'next/link'
import React from 'react'

export default function TicketLink({ params }) {

  const id = params.formattedValue;
  return (
    <Link style={{ color: '#3382ef' }} href={`/ticket/track/${id}`}>{params.formattedValue}</Link>
  )
}
