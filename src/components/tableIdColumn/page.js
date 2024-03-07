import Link from 'next/link'
import React from 'react'

export default function TableIdColumn({params}) {
    // console.log(params)
    const id =params.formattedValue;
  return (
    <div>
      <Link href={`/dashboard/allTickets/${id}`}>{params.formattedValue}</Link>
    </div>
  )
}
