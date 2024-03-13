import Link from 'next/link'
import React from 'react'

export default function TicketId({params}) {
    // console.log(id)
    const id =params.formattedValue;
  return (
    <div>
      <Link href={`/dashboard/allTickets/ticketId/${id}`}>{params.formattedValue}</Link>
    </div>
  )
}
