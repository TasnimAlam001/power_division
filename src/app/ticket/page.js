import Form from '@/components/TicketPage/Form'
import TicketNavbar from '@/components/TicketPage/TicketNavbar'
import { Box } from '@mui/material'
import React from 'react'

export default function Ticket() {
  return (
    <Box sx={{ display:"flex" , alignItems:"center", flexDirection:"column", bgcolor: "background.paper", mb:8}}>
      <TicketNavbar/>
      <Form/>
    </Box>
  )
}
