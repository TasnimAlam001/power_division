import Form from '@/components/TicketPage/Form'
import TicketNavbar from '@/components/TicketPage/TicketNavbar'
import { Box } from '@mui/material'
import React from 'react'

export default function page() {
  return (
    <Box>
      <TicketNavbar/>
      <Form/>
    </Box>
  )
}
