"use client";
import { Box, Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState, useEffect } from "react";
import UserData from "../../../../lib/UserData";
import UserDateFormatter from "@/components/UserDateFormatter/UserDateFormatter";
import UserSkeleton from "@/components/Skeletons/userSkeleton";
import UserTypeCell from "@/components/useTypeCell/UserTypeCell";
import UserTableType from "@/components/UserTableType/UserTableType";
import CdrDataFetching from "../../../../lib/CdrDataFetching";
import useAxiosSecure from "@/app/Hooks/useAxiousSecure";
import moment from "moment";

export default function CDRTable() {
  const [axiosSecure] = useAxiosSecure();
  const [cdrData, setCdrData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axiosSecure("/cdr")
      .then((res) => {
        // console.log(res.data)
        setCdrData(organizeData(res.data));
        setLoading(false);

        
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, [axiosSecure]);


    const organizeData = (data) => {
        
        console.log(data)

        let row = [];

        /**
         * 
         * extension	name
            16116	DPDC-16116
            16117	WPZDCL-16117
            16603	NESCO-16603
            9610016120	DESCO-9610016120
            9610016131	BPDB-9610016131
            9610916899	BREB-9610916899
            16131	BPDB-16131
            916899	BREB-916899
         */
       


        let {monthlyHangUpCallCount, monthlyALLUtilityCallCount, monthlyTotalCallCount } = data;

        let getValue = (month, year, code) => {            
          let s = monthlyALLUtilityCallCount.find((item)=>item.month === month && item.year === year && item.dst === code);

            return s? s.total_call: 0;
        }

        let getHangUpValue = (month, year) => {            

            let s = monthlyHangUpCallCount.find((item)=>item.month === month && item.year === year);
  
              return s? s.total_call: 0;
          }

        monthlyTotalCallCount.forEach((item, index)=>{
            // console.log(item)
            row.push(
                {
                    id: index+1,
                    monthYear: moment(item.month, 'M').format('MMM') + ' ' + item.year,
                    total_call_at_16999: item.total_call,
                    dpdc: getValue(item.month, item.year, '16603'),
                    wpzdcl: getValue(item.month, item.year, '9610016120'),
                    nesco: getValue(item.month, item.year, '916899'),
                    desco: getValue(item.month, item.year, '16116'),
                    bpdb: getValue(item.month, item.year, '16117'),
                    breb: getValue(item.month, item.year, '16131'),
                    monthlyHangUpCallCount: getHangUpValue(item.month, item.year)

                }
            )
        })  

        // console.table(row);

        return row;
        // return row.reduce((acc,curr)=> {
        //     acc[curr.key] = curr.value;
        //     return acc;
        // }, {})

    };
  
  const columns = [
    { field: 'monthYear', headerName: 'Month', minWidth: 100 },
    { field: 'total_call_at_16999', headerName: 'Monthly Total Call Count', minWidth: 150 },
    { field: 'dpdc', headerName: 'DPDC', minWidth: 100 },
    { field: 'wpzdcl', headerName: 'wpzdcl', minWidth: 100 },
    { field: 'nesco', headerName: 'nesco', minWidth: 100 },
    { field: 'desco', headerName: 'desco', minWidth: 100 },
    { field: 'bpdb', headerName: 'bpdb', minWidth: 100 },
    { field: 'breb', headerName: 'BREB', minWidth: 100 },

    { field: 'monthlyHangUpCallCount', headerName: 'Monthly Hang Up Call Count', minWidth: 250 },
  ];
  
//   const rows = organizeData(data);
//   const rows = {};
//   console.log(rows)


  return (
    <Paper sx={{ height: 850 }}>
      <Box sx={{ p: 4 }} style={{ height: 675, width: "100%" }}>
        <Typography
          sx={{ fontSize: 19, fontWeight: 600, color: "success.main" }}
        >
          CDR List
        </Typography>
        {loading ? (
          <UserSkeleton />
        ) : (
          <Box
            sx={{
              height: 600,
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
            {console.table(cdrData)}
            <DataGrid
              rows={cdrData} columns={columns}
            />
          </Box>
        )}
      </Box>
    </Paper>
  );
}
