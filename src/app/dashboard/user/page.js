"use client";
import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import useAxiosSecure from "@/app/Hooks/useAxiousSecure";
import { Box, Paper, Typography } from "@mui/material";
import UserTypeCell from "@/components/useTypeCell/UserTypeCell";
import { green } from "@mui/material/colors";
import UserSkeleton from "@/components/Skeletons/userSkeleton";

const columns = [
  { field: "name", headerName: "Name", minWidth: 110 },
  { field: "email", headerName: "Email", minWidth: 160 },
  {
    field: "email_verified_at",
    headerName: "Email verified time",
    minWidth: 230,
  },
  {
    field: "type",
    headerName: "Type",
    minWidth: 90,
    renderCell: (params) => <UserTypeCell {...{ params }} />,
  },
  { field: "created_at", headerName: "Created At", minWidth: 230 },
  { field: "updated_at", headerName: "Updated At", minWidth: 230 },
];

export default function User() {
  const [axiosSecure] = useAxiosSecure();
  const [userData, setUserData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    axiosSecure("/user")
      .then((res) => {
        setLoading(false);
        setUserData(res.data.data);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, []);

  return (
    <Paper sx={{ height: 550 }}>
      <Box sx={{ p: 4 }} style={{ height: 475, width: "100%" }}>
        <Typography variant="h4" sx={{ pb: 4, mt: 1, color: green[300] }}>
          {" "}
          User List
        </Typography>
        {loading ? (
          <UserSkeleton />
        ) : (
          <DataGrid
            rows={userData}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            disableRowSelectionOnClick
            slots={{ toolbar: GridToolbar }}
            slotProps={{ toolbar: { showQuickFilter: true } }}
            checkboxSelection
          />
        )}
      </Box>
    </Paper>
  );
}
