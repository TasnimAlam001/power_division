"use client";
import * as React from "react";
import {
  DataGrid,
  GridActionsCellItem,
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
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  useMediaQuery,
  Grid,
  Stack,
} from "@mui/material";
import UserTypeCell from "@/components/useTypeCell/UserTypeCell";
import { red } from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { useTheme } from "@emotion/react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserData from "../../../../lib/UserData";
import { useState } from "react";
import UserDateFormatter from "@/components/UserDateFormatter/UserDateFormatter";
import BigTableSkeleton from "@/components/Skeletons/BigTableSkeleton";

export default function User() {
  const { userData, loading } = UserData();
  const [axiosSecure] = useAxiosSecure();
  const [type, setType] = useState("customer");
  const [rows, setRows] = useState(userData);
  const [rowModesModel, setRowModesModel] = useState({});
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      reset();
      const { name, email, phone, password, type, company_id } = data;

      await axiosSecure
        .post("/users", { name, email, phone, password, type, company_id })
        .then((response) => {
          if (response) {
            setOpen(false);
            toast.success("User Added successfully!");
          }
        })
        .catch((error) => {
          console.log("Error submitting form:", error);
          toast.error("Error submitting form. Please try again.");
        });
    } catch (error) {
      console.error("Unexpected error:", error);
    }
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
    if (userData) {
      setRows(userData);
    }
  }, [userData]);

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
    {
      field: "name",
      headerName: "Name",
      minWidth: fullScreen ? 180 : undefined,
      flex: !fullScreen ? 1 : undefined,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: fullScreen ? 200 : undefined,
      flex: !fullScreen ? 1 : undefined,
      editable: true,
    },

    {
      field: "type",
      headerName: "Type",

      minWidth: fullScreen ? 180 : undefined,
      flex: !fullScreen ? 1 : undefined,
      renderCell: (params) => <UserTypeCell {...{ params }} />,
      editable: true,
      type: "singleSelect",
      valueOptions: ["admin", "company", "customer"],
    },
    {
      field: "created_at",
      headerName: "Created At",
      minWidth: fullScreen ? 260 : undefined,
      flex: !fullScreen ? 1 : undefined,
      renderCell: (params) => <UserDateFormatter {...{ params }} />,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      minWidth: fullScreen ? 180 : undefined,
      flex: !fullScreen ? 1 : undefined,
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
          // <GridActionsCellItem
          //   key={`edit-${id}`}
          //   icon={<EditIcon />}
          //   label="Edit"
          //   className="textPrimary"
          //   onClick={handleEditClick(id)}
          //   color="inherit"
          // />,
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
    <Paper>
      <ToastContainer />

      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ pl: 3, pt: 3, pr: 3 }}
      >
        <Typography
          sx={{ fontSize: 19, fontWeight: 600, color: "success.main" }}
        >
          User List
        </Typography>

        <Button
          variant="outlined"
          sx={{ mb: 0.5 }}
          color="success"
          onClick={handleClickOpen}
        >
          <AddIcon /> Add User
        </Button>
      </Stack>

      {loading ? (
        <BigTableSkeleton />
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
          <Dialog
            fullWidth
            maxWidth="md"
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">{"ADD USER"}</DialogTitle>
            <DialogContent sx={{ px: { md: 7 } }}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2} sx={{ mb: 3, mt: 3 }}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Name"
                      fullWidth
                      variant="outlined"
                      autoComplete="name"
                      color="success"
                      {...register("name", { required: "Name is required" })}
                      error={!!errors.name}
                      helperText={errors.name ? errors.name.message : ""}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Email"
                      fullWidth
                      variant="outlined"
                      autoComplete="email"
                      color="success"
                      {...register("email", {
                        required: "Email is required",
                      })}
                      error={!!errors.email}
                      helperText={errors.email ? errors.email.message : ""}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Phone"
                      fullWidth
                      variant="outlined"
                      autoComplete="phone"
                      color="success"
                      {...register("phone", {
                        required: "Phone number is required",
                      })}
                      error={!!errors.phone}
                      helperText={errors.phone ? errors.phone.message : ""}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Password"
                      fullWidth
                      variant="outlined"
                      autoComplete="current-password"
                      type="password"
                      color="success"
                      {...register("password", {
                        required: "Password is required",
                        minLength: 6,
                      })}
                      error={!!errors.password}
                      helperText={
                        errors.password ? errors.password.message : ""
                      }
                    />
                    {errors.password?.type === "minLength" && (
                      <Typography sx={{ color: red[600], mt: 1 }}>
                        Password must be at least 6 characters
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl
                      fullWidth
                      variant="outlined"
                      color="success"
                      error={!!errors.type}
                    >
                      <InputLabel>Type</InputLabel>
                      <Select
                        {...register("type", {
                          required: "Type is required",
                        })}
                        label="Type"
                        onChange={(e) => setType(e.target.value)}
                      >
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="company">Company</MenuItem>
                        <MenuItem value="customer">Customer</MenuItem>
                      </Select>
                    </FormControl>
                    {errors.type && (
                      <Typography sx={{ color: red[600], mt: 1 }}>
                        {errors.type.message}
                      </Typography>
                    )}
                  </Grid>
                  {type === "company" && (
                    <Grid item xs={12} md={6}>
                      <FormControl
                        fullWidth
                        variant="outlined"
                        color="success"
                        error={!!errors.company}
                      >
                        <InputLabel>Company Name</InputLabel>
                        <Select
                          {...register("company_id", {
                            required: "Company is required",
                          })}
                          label="Company Name"
                        >
                          <MenuItem value="1">BPDB</MenuItem>
                          <MenuItem value="2">BREB</MenuItem>
                          <MenuItem value="3">DESCO</MenuItem>
                          <MenuItem value="4">DPDC</MenuItem>
                          <MenuItem value="5">WZPDCL</MenuItem>
                          <MenuItem value="6">NESCO</MenuItem>
                        </Select>
                      </FormControl>
                      {errors.company_id && (
                        <Typography sx={{ color: red[600], mt: 1 }}>
                          {errors.company_id.message}
                        </Typography>
                      )}
                    </Grid>
                  )}
                </Grid>
                <DialogActions>
                  <Button onClick={handleClose} color="error">
                    Cancel
                  </Button>
                  <Button type="submit" variant="outlined" color="success">
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
              toolbar: { showQuickFilter: true },
            }}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />
        </Box>
      )}
    </Paper>
  );
}
