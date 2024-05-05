"use client";
import { Box, Paper, Stack, Typography, useMediaQuery } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useState, useEffect } from "react";
import UserSkeleton from "@/components/Skeletons/TableSkeleton";
import useAxiosSecure from "@/app/Hooks/useAxiousSecure";
import moment from "moment";
import TicketDate from "@/components/TicketDate/TicketDate";
import { formatDate } from "@/components/TicketFormater/TicketFormatter";
import { useTheme } from "@emotion/react";

export default function CDRTable() {
  const [selectedDates, setSelectedDates] = useState(null);
  const [axiosSecure] = useAxiosSecure();
  const [data, setData] = useState();
  const [cdrData, setCdrData] = useState([]);
  const [loading, setLoading] = useState(true);
  const startDate = formatDate(data?.startDate);
  const endDate = formatDate(data?.endDate);
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    setLoading(true);
    if (selectedDates) {
      axiosSecure(
        `/cdr?start_date=${selectedDates.from}&end_date=${selectedDates.to}`
      )
        .then((res) => {
          setCdrData(res.data.data.companyTicketList);
          setData(res.data.data);
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
        });
    } else {
      axiosSecure(`/cdr`)
        //
        .then((res) => {
          setData(res.data);
          setCdrData(organizeData(res.data));
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
        });
    }
  }, [axiosSecure, selectedDates]);

  const organizeData = (data) => {
    let row = [];

    /**
     * 
     * extension	name
        16117	WPZDCL-16117
        16603	NESCO-16603
        9610016120	DESCO-9610016120
        9610016131	BPDB-9610016131
        9610916899	BREB-9610916899
        16131	BPDB-16131
        916899	BREB-916899
     */

    let {
      monthlyHangUpCallCount,
      monthlyALLUtilityCallCount,
      monthlyTotalCallCount,
    } = data;

    let getValue = (month, year, code) => {
      let s = monthlyALLUtilityCallCount.find(
        (item) =>
          item.month === month && item.year === year && item.dst === code
      );

      return s ? s.total_call : 0;
    };

    let getHangUpValue = (month, year) => {
      let s = monthlyHangUpCallCount.find(
        (item) => item.month === month && item.year === year
      );

      return s ? s.total_call : 0;
    };

    monthlyTotalCallCount.forEach((item, index) => {
      row.push({
        id: index + 1,
        monthYear: moment(item.month, "M").format("MMM") + " " + item.year,
        total_call_at_16999: item.total_call,
        dpdc: getValue(item.month, item.year, "16116"),
        wpzdcl: getValue(item.month, item.year, "16117"),
        nesco: getValue(item.month, item.year, "16603"),
        desco: getValue(item.month, item.year, "9610016120"),
        bpdb: getValue(item.month, item.year, "16131"),
        breb: getValue(item.month, item.year, "916899"),
        monthlyHangUpCallCount: getHangUpValue(item.month, item.year),
      });
    });
    return row;
  };

  const columns = [
    { field: "monthYear", headerName: "Month", minWidth: 120 },
    {
      field: "total_call_at_16999",
      headerName: "Monthly Total Call Count",
      
      align: "center",
      minWidth: isMediumScreen ? 190 : undefined,
      flex: !isMediumScreen ? 1 : undefined,  
    },
    {
      field: "dpdc",
      headerName: "DPDC",
     
      align: "center",
      headerAlign: "center",
      minWidth: isMediumScreen ? 140 : undefined,
      flex: !isMediumScreen ? 1 : undefined,  
    },
    {
      field: "wpzdcl",
      headerName: "WPZDCL",
    
      align: "center",
      headerAlign: "center",
      minWidth: isMediumScreen ? 130 : undefined,
      flex: !isMediumScreen ? 1 : undefined,  
    },
    {
      field: "nesco",
      headerName: "NESCO",
     
      align: "center",
      headerAlign: "center",
      minWidth: isMediumScreen ? 130 : undefined,
      flex: !isMediumScreen ? 1 : undefined,  
    },
    {
      field: "desco",
      headerName: "DESCO",
 
      align: "center",
      headerAlign: "center",
      minWidth: isMediumScreen ? 130 : undefined,
      flex: !isMediumScreen ? 1 : undefined,  
    },
    {
      field: "bpdb",
      headerName: "BPDP",

      align: "center",
      headerAlign: "center",
      minWidth: isMediumScreen ? 130 : undefined,
      flex: !isMediumScreen ? 1 : undefined,  
    },
    {
      field: "breb",
      headerName: "BREB",
     
      align: "center",
      headerAlign: "center",
      minWidth: isMediumScreen ? 130 : undefined,
      flex: !isMediumScreen ? 1 : undefined,  
    },

    {
      field: "monthlyHangUpCallCount",
      headerName: "Monthly Hang Up Call Count",
   
      align: "center",
      headerAlign: "center",
      minWidth: isMediumScreen ? 270       : undefined,
      flex: !isMediumScreen ? 1 : undefined,  
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
            CDR List
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
              slots={{
                toolbar: GridToolbar,
              }}
              slotProps={{
                toolbar: { showQuickFilter: true },
              }}
              rows={cdrData}
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
          </Box>
        )}
      </Box>
    </Paper>
  );
}
