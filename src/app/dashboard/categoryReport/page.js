"use client";
import { Box, Paper, Stack, Typography, useMediaQuery } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useState, useEffect } from "react";
import useAxiosSecure from "@/app/Hooks/useAxiousSecure";
import TicketCountHeader from "@/components/CategoryTable/TicketCountHeader";
import PercentageHeader from "@/components/CategoryTable/PercentageHeader";
import CategoryName from "@/components/CategoryTable/CategoryName";
import PercentageCell from "@/components/CategoryTable/PercentageCell";
import TicketDate from "@/components/TicketDate/TicketDate";
import { formatDate } from "@/components/TicketFormater/TicketFormatter";
import TicketSkeleton from "@/components/Skeletons/BigTableSkeleton";
import { useTheme } from "@emotion/react";

export default function CategoryReport() {
  const [axiosSecure] = useAxiosSecure();
  const [reportData, setReportData] = useState(0)
  const [cdrData, setCdrData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDates, setSelectedDates] = useState(null);
  const startDate = formatDate(reportData?.startDate);
  const endDate = formatDate(reportData?.endDate);
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    setLoading(true);
    if (selectedDates) {
      axiosSecure(`/report/category?start_date=${selectedDates.from}&end_date=${selectedDates.to}`)
        .then((res) => {
          setCdrData(res.data.data.categoryTicketList);
          setReportData(res.data.data)
          setLoading(false);


        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
        });

    }
    else {
      axiosSecure(`/report/category`)
        // 
        .then((res) => {
          setCdrData(res.data.data.categoryTicketList);
          setReportData(res.data.data)
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
        });
    }
  }, [axiosSecure, selectedDates]);

  const columns = [
    {
      field: "category_name",
      headerName: "Category Name",
        minWidth: isMediumScreen ? 220 : undefined,
      flex: !isMediumScreen ? 1 : undefined,  
      renderHeader: (params) => <CategoryName {...{ params }} />,
     
      headerAlign: "center",
      align: "center",
    },
    {
      field: "ticket_count",
      headerName: "Ticket Count",
      renderHeader: (params) => <TicketCountHeader data={reportData?.totalTicket} {...{ params }} />,
      minWidth: isMediumScreen ? 220 : undefined,
      flex: !isMediumScreen ? 1 : undefined,  
     
      align: "center",
      headerAlign: "center",
    },
    {
      field: "percentage",
      headerName: "Percentage",
      renderHeader: (params) => <PercentageHeader {...{ params }} />,
      renderCell: (params) => <PercentageCell {...{ params }} />,

      minWidth: isMediumScreen ? 220 : undefined,
      flex: !isMediumScreen ? 1 : undefined,  
      
      align: "center",
      headerAlign: "center",
    },
  ];

  return (
    <Paper>
      <Box style={{ width: "100%" }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ pl: 3, pt: 3, pr: 3 }}
        >
          <Typography variant="h6" sx={{ color: "success.main" }}>
            {" "}
            Category Report
          </Typography>
          <TicketDate
            onDatesSelected={setSelectedDates}
            startDate={startDate}
            endDate={endDate}
          />
        </Stack>
        {loading ? (
          <TicketSkeleton />
        ) : (
          <Box
            sx={{
              height: 725,
              width: "100%",
              "& .actions": {
                color: "text.secondary",
              },
              "& .textPrimary": {
                color: "text.primary",
              },
              p: 3,
            }}
          >
            
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
