import TicketId from '@/app/dashboard/allTickets/ticketId/page';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react'
import TableStatusColumn from '../tableStatus/page';
import TimeDateFormate from '../TicketColumn/TimeDateFormate';
import TicketLink from './TicketLink';

export default function SearchTicketTable({rows}) {
    const columns = [
        {
          field: "ticket_id",
          headerName: "Ticket ID",
          flex:1,
          align: "left",
          renderCell: (params) => <TicketLink {...{ params }} />,
        },
    
        
        
        {
          field: "phone",
          headerName: "Phone Number",
          flex:1,
        },
        {
          field: "complain",
          headerName: "Complain",
          flex:1,
        },
        {
            field: "status",
            headerName: "Status",
            flex:1,
            renderCell: (params) => <TableStatusColumn {...{ params }} />,
          },
        {
          field: "created_at",
          headerName: "Ticket Create Time",
          editable: true,
          align: "left",
          headerAlign: "left",
          flex:1,
          renderCell: (params) => <TimeDateFormate {...{ params }} />,
        },
      ];
  return (
    <div>
      <DataGrid
              rows={rows}
              columns={columns}             
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              pageSizeOptions={[10]}
              disableRowSelectionOnClick 
            />
    </div>
  )
}
