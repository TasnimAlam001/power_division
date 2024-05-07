"use client";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputAdornment,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useState } from "react";
import FileAttachment from "./FileAttachment";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";

export default function Form() {
  const [selectedOrganization, setOrganization] = useState(null);
  const [organizations, setOrganizations] = useState({ data: [] });
  const [areas, setAreas] = useState([]);
  const [offices, setOffices] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedOffice, setSelectedOffice] = useState("");
  const [selectedService, setService] = useState("");
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [selectedAMCName, setAMCName] = useState("");

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetchOrganizations();
    fetchServiceType();
  }, []);

  const fetchServiceType = async () => {
    try {
      const response = await fetch("http://202.51.182.190:5412/api/request-sub-category", {
        method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": 'Bearer 10903|cpDoDOB9FMyXk8QoIku7v6SaOt9sbF8B7KBleU7d79acf52e'
            },
      });
      const data = await response.json();
      setServices(data.data);
    } catch (error) {
      console.error("Error fetching organizations:", error);
    }
  };
  const fetchOrganizations = async () => {
    try {
      const response = await fetch("http://202.51.182.190:5412/api/company", {
        method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": 'Bearer 10903|cpDoDOB9FMyXk8QoIku7v6SaOt9sbF8B7KBleU7d79acf52e'
            },
      });
      const data = await response.json();
      setOrganizations(data);
    } catch (error) {
      console.error("Error fetching organizations:", error);
    }
  };

  const fetchAreas = async (organizationId) => {
    try {
      const response = await fetch(
        `http://202.51.182.190:5412/api/company-zone?company_id=${organizationId}`, {
          method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer 10903|cpDoDOB9FMyXk8QoIku7v6SaOt9sbF8B7KBleU7d79acf52e'
              },
        }
      );
      const data = await response.json();
      setAreas(data.data);
    } catch (error) {
      console.error("Error fetching areas:", error);
    }
  };

  const fetchOffices = async (organizationId, areaId) => {
    try {
      // supply-and-distribution/?company_zone_id=1&company_id=1
      const response = await fetch("http://202.51.182.190:5412/api/supply-and-distribution/?company_zone_id=1&company_id=1"
        , {
          method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer 10903|cpDoDOB9FMyXk8QoIku7v6SaOt9sbF8B7KBleU7d79acf52e'
              },
        }
      );
      const data = await response.json();

      console.log('.......s',data)
      setOffices(data.data);
    } catch (error) {
      console.error("Error fetching offices:", error);
    }
  };

  const handleOrganizationChange = (event) => {
    const organizationId = event.target.value;
    setOrganization(organizationId);
    fetchAreas(organizationId);
  };

  const handleAreaChange = (event) => {
    const areaId = event.target.value;
    setSelectedArea(areaId);
    fetchOffices(selectedOrganization, areaId);
  };

  const handleOfficeChange = (event) => {
    const officeId = event.target.value;
    setSelectedOffice(officeId);
  };
  const handleService = (event) => {
    setService(event.target.value);
  };
  const onSubmit = (data) => {
    const formDataWithFiles = { ...data, files: attachedFiles };
    toast("Form submitted")
    reset();
    console.log(formDataWithFiles);
  };

  const handleFileChange = (files) => {
    setAttachedFiles(files);
  };
  return (

    <Paper
      elevation={0}
      sx={{
        mt: 5,
        width: "80%",
        p: 4,
        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pb: 2,
          }}
        >
          <Typography variant="h5">
            Fill the form below to get electricity service.
          </Typography>
          
          <Link href="/ticket/track"><Button variant="contained">Find Complains <SearchOutlinedIcon /></Button></Link>
        </Box>
        <Divider variant="middle" />
        <ToastContainer/>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ pt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={2}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">
                    Select the meter type *
                  </FormLabel>
                  <RadioGroup defaultValue="prepaid" name="meter-type">
                    <FormControlLabel
                      value="prepaid"
                      control={<Radio />}
                      label="Prepaid"
                      {...register("meter-type")}
                    />
                    <FormControlLabel
                      value="postpaid"
                      control={<Radio />}
                      label="Postpaid"
                      {...register("meter-type")}
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Other"
                      {...register("meter-type")}
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <FormLabel sx={{ pb: 2 }} id="demo-radio-buttons-group-label">
                    Select Organization / Company *
                  </FormLabel>
                  <TextField
                    {...register("Organization")}
                    select
                    label="Select"
                    value={selectedOrganization}
                    onChange={handleOrganizationChange}
                    variant="outlined"
                    // size="small"
                  >
                    {organizations?.data.map((company) => (<MenuItem key={company.id} value={company.id}>
                        {company.short_name}-{company.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <FormLabel sx={{ pb: 2 }} id="demo-radio-buttons-group-label">
                    Enter account/meter/customer number *
                  </FormLabel>
                  <Box sx={{ display: "flex" }}>
                    <TextField
                      fullWidth
                      {...register("AMCName")}
                      select
                      label="Select"
                      value={selectedAMCName}
                      variant="outlined"
                      onChange={(event) => setAMCName(event.target.value)}
                    >
                      <MenuItem value="1">Account Number </MenuItem>
                      <MenuItem value="2">Meter Number</MenuItem>
                      <MenuItem value="3">Customer Number</MenuItem>
                    </TextField>
                    <TextField
                      fullWidth
                      label="Enter number"
                      variant="outlined"
                      {...register("amc_number", { required: true })}
                    />
                  </Box>
                  {errors.amc_number && (
                    <Typography variant="body2" color="error">
                      Account name and number is required
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <FormLabel sx={{ pb: 2 }} id="demo-radio-buttons-group-label">
                    Enter the phone number*
                  </FormLabel>

                  <TextField
                    {...register("phoneNumber", { required: true })}
                    label="+880 "
                  />
                  {errors.phoneNumber && (
                    <Typography variant="body2" color="error">
                      Phone number is required
                    </Typography>
                  )}
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={3} sx={{ mt: 2 }}>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <FormLabel sx={{ pb: 2 }} id="demo-radio-buttons-group-label">
                    Select the delivery region/area *
                  </FormLabel>
                  <TextField
                    {...register("Area")}
                    fullWidth
                    select
                    label="Select"
                    value={selectedArea}
                    onChange={handleAreaChange}
                    variant="outlined"
                  >
                    {areas.map((area) => (
                      <MenuItem key={area.id} value={area.id}>
                        {area.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <FormLabel sx={{ pb: 2 }} id="demo-radio-buttons-group-label">
                    Select the nearest electricity office *
                  </FormLabel>
                  <TextField
                    {...register("office")}
                    fullWidth
                    select
                    label="Select"
                    value={selectedOffice}
                    onChange={handleOfficeChange}
                    variant="outlined"
                  >
                    {offices?.map((office) => (
                      <MenuItem key={office.id} value={office.id}>
                        {office.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <FormLabel sx={{ pb: 2 }} id="demo-radio-buttons-group-label">
                    Select the type of service *
                  </FormLabel>
                  <Box sx={{ display: "flex" }}>
                    <TextField
                      {...register("Service")}
                      fullWidth
                      select
                      label="Select"
                      value={selectedService}
                      onChange={handleService}
                      variant="outlined"
                    >
                      {services?.map((service) => (
                      <MenuItem key={service.id} value={service.id}>
                        {service.name}
                      </MenuItem>
                    ))}
                    </TextField>
                  </Box>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <FormLabel sx={{ pb: 2 }} id="demo-radio-buttons-group-label">
                    Complainant`s Name*
                  </FormLabel>

                  <TextField
                    {...register("complainName", { required: true })}
                    label="Write Complain Name"
                  />
                  {errors.complainName && (
                    <Typography variant="body2" color="error">
                      Complain Name number is required
                    </Typography>
                  )}
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ my: 3 }}>
              <Grid item xs={5}>
                <TextField
                  {...register("address", { required: true })}
                  multiline
                  minRows={4}
                  maxRows={10}
                  label="Enter your address"
                  variant="outlined"
                  fullWidth
                />
                {errors.address && (
                  <Typography variant="body2" color="error">
                    Address is required
                  </Typography>
                )}
              </Grid>
              <Grid item xs={7}>
                <TextField
                  {...register("complaintDetails", { required: true })}
                  multiline
                  minRows={4}
                  maxRows={10}
                  label="Comment / Enter details of your complaint"
                  variant="outlined"
                  fullWidth
                />
                {errors.complaintDetails && (
                  <Typography variant="body2" color="error">
                    Complaint details are required
                  </Typography>
                )}
              </Grid>
            </Grid>
            <FileAttachment onFileChange={handleFileChange} />
            <Button color="success" type="submit" variant="contained">
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Paper>
  );
}
