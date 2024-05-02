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
import { v4 as uuidv4 } from "uuid";
import TicketCountHeader from "@/components/CategoryTable/TicketCountHeader";
import PercentageHeader from "@/components/CategoryTable/PercentageHeader";
import CategoryName from "@/components/CategoryTable/CategoryName";
import PercentageCell from "@/components/CategoryTable/PercentageCell";

export default function CategoryReport() {
  const [axiosSecure] = useAxiosSecure();
  const [totalTicket, setTotalTicket] = useState(0)
  const [cdrData, setCdrData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axiosSecure(`/report/category?start_date=2023-10-01&end_date=2024-03-01`)
      // axiosSecure(`/report/category?start_date=${selectedDates.from}&end_date=${selectedDates.to}`)
      .then((res) => {
        setCdrData(res.data.data.categoryTicketList);
        setTotalTicket(res.data.data.totalTicket)
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, [axiosSecure]);

  const columns = [
    {
      field: "category_name",
      headerName: "Category Name",
      renderHeader: (params) => <CategoryName data= {totalTicket} {...{ params }} />,

      minWidth: 430,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "ticket_count",
      headerName: "Ticket Count",
      renderHeader: (params) => <TicketCountHeader data= {totalTicket} {...{ params }} />,

      minWidth: 420,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "percentage",
      headerName: "Percentage",
      renderHeader: (params) => <PercentageHeader {...{ params }} />,
      renderCell: (params) => <PercentageCell {...{ params }} />,


      minWidth: 370,
      align: "center",
      headerAlign: "center",
    },
  ];

  return (
    <Paper sx={{ height: 850 }}>
      <Box sx={{ p: 4 }} style={{ height: 975, width: "100%" }}>
        <Typography
          sx={{ fontSize: 19, fontWeight: 600, color: "success.main" }}
        >
          Category Report
        </Typography>
        {loading ? (
          <UserSkeleton />
        ) : (
          <Box
            sx={{
              height: 713,
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
              disableColumnMenu 
              disableColumnSort
              disableColumnReorder
              slots={{
                toolbar: GridToolbar,
              }}
              slotProps={{
                toolbar: { showQuickFilter: true },
              }}
              rows={cdrData}
              columns={columns}
              getRowId={(row) => row.category_id}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[10, 20]}
            />
          </Box>
        )}
      </Box>
    </Paper>
  );
}
