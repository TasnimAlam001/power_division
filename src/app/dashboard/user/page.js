"use client";
import * as React from "react";
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbarContainer,
  GridRowModes,
  GridRowEditStopReasons,
  GridToolbar,
} from "@mui/x-data-grid";
import useAxiosSecure from "@/app/Hooks/useAxiousSecure";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import UserTypeCell from "@/components/useTypeCell/UserTypeCell";
import { green } from "@mui/material/colors";
import UserSkeleton from "@/components/Skeletons/userSkeleton";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { useTheme } from "@emotion/react";
import { useForm } from "react-hook-form";

export default function User() {
  const [axiosSecure] = useAxiosSecure();
  const [userData, setUserData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [rows, setRows] = React.useState(userData);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    reset();
    console.log(data);
  };

  // Set current date and time as default value for created_at field
  React.useEffect(() => {
    setValue("created_at", new Date().toISOString());
  }, [setValue]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    setLoading(true);
    axiosSecure("/user")
      .then((res) => {
        setLoading(false);
        setUserData(res.data.data);
        setRows(res.data.data);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, []);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
  const columns = [
    { field: "name", headerName: "Name", minWidth: 110, editable: true },
    { field: "email", headerName: "Email", minWidth: 160, editable: true },

    {
      field: "type",
      headerName: "Type",
      minWidth: 90,
      renderCell: (params) => <UserTypeCell {...{ params }} />,
      editable: true,
      type: "singleSelect",
      valueOptions: ["admin", "company", "customer"],
    },
    {
      field: "created_at",
      headerName: "Created At",
      minWidth: 230,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key={`save-${id}`}
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              key={`cancel-${id}`}
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            key={`edit-${id}`}
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            key={`delete-${id}`}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Paper sx={{ height: 850 }}>
      <Box sx={{ p: 4 }} style={{ height: 675, width: "100%" }}>
        <Typography
          sx={{ fontSize: 19, fontWeight: 600, color: "success.main" }}
        >
          {" "}
          User List
        </Typography>
        {loading ? (
          <UserSkeleton />
        ) : (
          <Box
            sx={{
              height: 500,
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
            <Button
              variant="outlined"
              sx={{ mb: 0.5 }}
              color="success"
              onClick={handleClickOpen}
            >
              <AddIcon /> Add User
            </Button>
            <Dialog
            
              fullScreen={fullScreen}
              open={open}
              onClose={handleClose}
              aria-labelledby="responsive-dialog-title"
            >
              <DialogTitle id="responsive-dialog-title">
                {"ADD USER"}
              </DialogTitle>
              <DialogContent >
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Box sx={{ pb: 2, mt:2 }}>
                    <TextField
                      label="Name"
                      fullWidth
                      variant="outlined"
                      {...register("name", { required: "Name is required" })}
                      error={!!errors.name}
                      helperText={errors.name ? errors.name.message : ""}
                    />
                  </Box>
                  <Box sx={{ pb: 2 }}>
                    <TextField
                      label="Email"
                      fullWidth
                      variant="outlined"
                      {...register("email", { required: "Email is required" })}
                      error={!!errors.email}
                      helperText={errors.email ? errors.email.message : ""}
                    />
                  </Box>
                  <Box sx={{ pb: 2 }}>
                    <FormControl
                      fullWidth
                      variant="outlined"
                      error={!!errors.type}
                    >
                      <InputLabel>Type</InputLabel>
                      <Select
                        {...register("type", { required: "Type is required" })}
                        label="Type"
                      >
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="company">Company</MenuItem>
                        <MenuItem value="customer">Customer</MenuItem>
                      </Select>
                    </FormControl>
                    {errors.type && (
                      <Box sx={{ color: "red", marginTop: 1 }}>
                        {errors.type.message}
                      </Box>
                    )}
                  </Box>
                  <Box sx={{ pb: 2 }}>
                    <TextField
                      // label="Created At"
                      type="datetime-local"
                      fullWidth
                      variant="outlined"
                      defaultValue={new Date().toISOString().substr(0, 16)}
                      disabled
                    />
                  </Box>
                  <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                      Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="success">
                      Add User
                    </Button>
                  </DialogActions>
                </form>
              </DialogContent>
              
            </Dialog>
            <DataGrid
              rows={rows}
              columns={columns}
              editMode="row"
              rowModesModel={rowModesModel}
              onRowModesModelChange={handleRowModesModelChange}
              onRowEditStop={handleRowEditStop}
              processRowUpdate={processRowUpdate}
              disableColumnFilter
              disableColumnSelector
              disableDensitySelector
              disableRowSelectionOnClick
              slots={{
                toolbar: GridToolbar,
              }}
              slotProps={{
                toolbar: { showQuickFilter: true, setRows, setRowModesModel },
              }}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
            />
          </Box>
        )}
      </Box>
    </Paper>
  );
}
