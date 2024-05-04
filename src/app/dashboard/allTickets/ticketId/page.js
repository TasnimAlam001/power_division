import { Box } from '@mui/material';
import Link from 'next/link'
import React from 'react'

export default function TicketId({ params }) {

  const id = params.formattedValue;
  return (
    <Link style={{ color: '#3382ef' }} href={`/dashboard/allTickets/ticketId/${id}`}>{params.formattedValue}</Link>
  )
}
