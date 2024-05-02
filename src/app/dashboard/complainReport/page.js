"use client";
import { Box, Paper, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useState, useEffect } from "react";
import UserData from "../../../../lib/UserData";
import UserDateFormatter from "@/components/UserDateFormatter/UserDateFormatter";
import UserSkeleton from "@/components/Skeletons/userSkeleton";
import UserTypeCell from "@/components/useTypeCell/UserTypeCell";
import UserTableType from "@/components/UserTableType/UserTableType";
import CdrDataFetching from "../../../../lib/CdrDataFetching";
import useAxiosSecure from "@/app/Hooks/useAxiousSecure";
import moment from "moment";
import TotalTicketH from "@/components/ComplainTable/TotalTicketH";

export default function ComplainReport() {
  const [axiosSecure] = useAxiosSecure();
  const [cdrData, setCdrData] = useState([]);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axiosSecure("/report/company")
      // axiosSecure(`/report/category?start_date=${selectedDates.from}&end_date=${selectedDates.to}`)
      .then((res) => {
        console.log(res.data.data.companyTicketList);
        setCdrData(res.data.data.companyTicketList);
        setData(res.data.data)
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, [axiosSecure]);

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
    <Paper sx={{ height: 850 }}>
      <Box sx={{ p: 4 }} style={{ height: 675, width: "100%" }}>
        <Typography
          sx={{ fontSize: 19, fontWeight: 600, color: "success.main" }}
        >
          Company wise Report
        </Typography>
        {loading ? (
          <UserSkeleton />
        ) : (
          <Box
            sx={{
              height: 503,
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
            {/* {console.table(cdrData)} */}
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
              pagination={false}
              
              
              pageSizeOptions={false}
            />
          </Box>
        )}
      </Box>
    </Paper>
  );
}
