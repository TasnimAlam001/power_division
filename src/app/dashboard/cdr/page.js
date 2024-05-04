"use client";
import { Box, Paper, Stack, Typography } from "@mui/material";
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
import TicketDate from "@/components/TicketDate/TicketDate";
import TicketFormatter from "@/components/TicketFormater/TicketFormatter";
import { formatDate } from "@/components/TicketFormater/TicketFormatter";

export default function CDRTable() {
  const [selectedDates, setSelectedDates] = useState(null);
  const [axiosSecure] = useAxiosSecure();
  const [data, setData] = useState();
  const [cdrData, setCdrData] = useState([]);
  const [loading, setLoading] = useState(true);
  const startDate = formatDate(data?.startDate);
  const endDate = formatDate(data?.endDate);


  useEffect(() => {
    setLoading(true);
    if (selectedDates) {
      axiosSecure(`/cdr?start_date=${selectedDates.from}&end_date=${selectedDates.to}`)
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
    else {
      axiosSecure(`/cdr`)
        // 
        .then((res) => {
          setData(res.data)
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



    let { monthlyHangUpCallCount, monthlyALLUtilityCallCount, monthlyTotalCallCount } = data;

    let getValue = (month, year, code) => {
      let s = monthlyALLUtilityCallCount.find((item) => item.month === month && item.year === year && item.dst === code);

      return s ? s.total_call : 0;
    }

    let getHangUpValue = (month, year) => {

      let s = monthlyHangUpCallCount.find((item) => item.month === month && item.year === year);

      return s ? s.total_call : 0;
    }

    monthlyTotalCallCount.forEach((item, index) => {
      row.push(
        {
          id: index + 1,
          monthYear: moment(item.month, 'M').format('MMM') + ' ' + item.year,
          total_call_at_16999: item.total_call,
          dpdc: getValue(item.month, item.year, '16116'),
          wpzdcl: getValue(item.month, item.year, '16117'),
          nesco: getValue(item.month, item.year, '16603'),
          desco: getValue(item.month, item.year, '9610016120'),
          bpdb: getValue(item.month, item.year, '16131'),
          breb: getValue(item.month, item.year, '916899'),
          monthlyHangUpCallCount: getHangUpValue(item.month, item.year)

        }
      )
    })
    return row;


  };

  const columns = [
    { field: 'monthYear', headerName: 'Month', minWidth: 120 },
    { field: 'total_call_at_16999', headerName: 'Monthly Total Call Count', minWidth: 180, align: "center" },
    { field: 'dpdc', headerName: 'DPDC', minWidth: 110, align: "center", headerAlign: "center", },
    { field: 'wpzdcl', headerName: 'WPZDCL', minWidth: 110, align: "center", headerAlign: "center", },
    { field: 'nesco', headerName: 'NESCO', minWidth: 110, align: "center", headerAlign: "center", },
    { field: 'desco', headerName: 'DESCO', minWidth: 110, align: "center", headerAlign: "center", },
    { field: 'bpdb', headerName: 'BPDP', minWidth: 110, align: "center", headerAlign: "center", },
    { field: 'breb', headerName: 'BREB', minWidth: 110, align: "center", headerAlign: "center", },

    { field: 'monthlyHangUpCallCount', headerName: 'Monthly Hang Up Call Count', minWidth: 250, align: "center", headerAlign: "center", },
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
              height: 560,
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
              rows={cdrData} columns={columns}
              autoPageSize
            />
          </Box>
        )}
      </Box>
    </Paper>
  );
}
