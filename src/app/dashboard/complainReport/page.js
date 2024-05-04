"use client";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useState, useEffect } from "react";
import UserSkeleton from "@/components/Skeletons/TableSkeleton";
import useAxiosSecure from "@/app/Hooks/useAxiousSecure";
import TotalTicketH from "@/components/ComplainTable/TotalTicketH";
import TicketDate from "@/components/TicketDate/TicketDate";
import { formatDate } from "@/components/TicketFormater/TicketFormatter";


export default function ComplainReport() {
  const [axiosSecure] = useAxiosSecure();
  const [cdrData, setCdrData] = useState([]);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [selectedDates, setSelectedDates] = useState(null);
  const startDate = formatDate(data?.startDate);
  const endDate = formatDate(data?.endDate);

  useEffect(() => {
    setLoading(true);
    if(selectedDates){
      axiosSecure(`/report/company?start_date=${selectedDates.from}&end_date=${selectedDates.to}`)
      .then((res) => {
        setCdrData(res.data.data.companyTicketList);
        setData(res.data.data)
        setLoading(false);


      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });

    }
    else{
      axiosSecure(`/report/company`)
      // 
      .then((res) => {
        setCdrData(res.data.data.companyTicketList);
        setData(res.data.data)
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
    }
  }, [axiosSecure, selectedDates]);



  const columns = [
    { field: "company_name", headerName: "Company Name", minWidth: 480 },
    {
      field: "total_ticket",
      headerName: "Total Ticket",
      renderHeader: (params) => <TotalTicketH data={data.totalTicket} {...{ params }} />,

      minWidth: 210, align: "center", headerAlign: "center",
    },
    {
      field: "pending_ticket",
      headerName: "Pending Ticket",
      minWidth: 210,
      align: "center",
      renderHeader: (params) => <TotalTicketH data={data.totalPendingTicket} {...{ params }} />,

      headerAlign: "center",
    },
    {
      field: "completed_ticket",
      headerName: "Completed Ticket",
      minWidth: 240,
      renderHeader: (params) => <TotalTicketH data={data.totalCompletedTicket} {...{ params }} />,

      align: "center",
      headerAlign: "center",
    },
  ];


  return (
    <Paper >
      <Box style={{ width: "100%" }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ pl: 3, pt: 3, pr: 3 }}
      >
        <Typography variant="h6" sx={{ color: "success.main" }}>
          
          Company wise Report
        </Typography>
        <TicketDate
          onDatesSelected={setSelectedDates}
          startDate={startDate}
          endDate={endDate}
        />
      </Stack>
        {loading ? (
          <UserSkeleton />
        ) : (
          <Box
            sx={{
              p:3,
              
              width: "100%",
              "& .actions": {
                color: "text.secondary",
              },
              "& .textPrimary": {
                color: "text.primary",
              },
              pt: 5,
            }}
          >
           
            <DataGrid
             disableColumnFilter
             disableColumnSelector
             disableDensitySelector
             
              slots={{
                toolbar: GridToolbar,
              }}
              slotProps={{
                toolbar: { showQuickFilter: true },
              }}
              rows={cdrData}
              columns={columns}
              getRowId={(row) => row.company_id}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 6,
                  },
                },
              }}
              pageSizeOptions={[6]}
              disableRowSelectionOnClick          
              
              
            />
          </Box>
        )}
      </Box>
    </Paper>
  );
}
