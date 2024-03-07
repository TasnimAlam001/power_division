"use client";
import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import TicketId from "./ticketId/page";
import TableStatusColumn from "@/components/tableStatus/page";
import TimeDateFormate from "@/components/TicketColumn/TimeDateFormate";
import useAllTickets from "../../../../lib/useAllTickets";


const columns = [
  {
    field: "ticket_id",
    headerName: "Ticket ID",
    // width: 90,
    renderCell: (params) => <TicketId {...{ params }} />,
    type: "actions",
  },
  {
    field: "status",
    headerName: "Status",
    minWidth: 110,
    renderCell: (params) => <TableStatusColumn {...{ params }} />,
  },
  { field: "company_short_name", headerName: "Company", minWidth: 90 },
  { field: "name", headerName: "Customer Name", minWidth: 175 },
  {
    field: "company_zone_name",
    headerName: "Area",
    minWidth: 150,
  },
  {
    field: "supply_and_distribution_name",
    headerName: "Office",
    minWidth: 150,
  },
  {
    field: "request_category_name",
    headerName: "Ticket Category",
    minWidth: 140,
  },
  {
    field: "created_at",
    headerName: "Ticket Create Time",
    editable: true,
    align: "left",
    headerAlign: "left",
    minWidth: 150,
    renderCell: (params) => <TimeDateFormate {...{ params }} />,
    // type: "dateTime"
  },
  // {
  //   field: 'fullName',
  //   headerName: 'Ticket Create Time',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params) =>
  //     `${params.row. tCategory :"fdbdf" || ''} ${params.row.company || ''}`,
  // },
];

export default function DataTable() {
  const rows = useAllTickets();


    // const data = AxiosCall(
    //   "web-app/ticket?start_date=2023-11-01&end_date=2023-12-31"
    // );



  return (
    <div style={{ height: 670, width: "100%", overflow: "auto" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 20]}
        slots={{
          toolbar: GridToolbar,
        }}
        checkboxSelection
      />
    </div>
  );
}
