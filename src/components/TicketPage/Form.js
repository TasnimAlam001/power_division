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
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useState } from "react";
import FileAttachment from "./FileAttachment";
import { useForm } from "react-hook-form";

export default function Form() {
  const [selectedOrganization, setOrganization] = useState("1");
  const [selectedAMCName, setAMCName] = useState("1");
  const [selectedAria, setAria] = useState("Aria1");
  const [selectedOffice, setOffice] = useState("office1");
  const [selectedService, setService] = useState("s1");
  const [attachedFiles, setAttachedFiles] = useState([]);
  
  const {
    register,
    handleSubmit,    
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const formDataWithFiles = { ...data, files: attachedFiles };
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
          <TextField
            label="Search Complains"
            sx={{ m: 1, width: "25ch" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Divider variant="middle" />
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
                    onChange={(event) => setOrganization(event.target.value)}
                    variant="outlined"                    
                  >
                    <MenuItem value="1">DPDC</MenuItem>
                    <MenuItem value="2">DESCO</MenuItem>
                    <MenuItem value="3">NESCO</MenuItem>
                  </TextField>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <FormLabel sx={{ pb: 2 }} id="demo-radio-buttons-group-label">
                    Enter account/meter/customer number *
                  </FormLabel>
                  <Box sx={{display:"flex"}}>
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

                  <TextField  {...register("phoneNumber", { required: true })} label="+880 " />
                  {errors.phoneNumber && (
                    <Typography variant="body2" color="error">
                      Phone number is required
                    </Typography>
                  )}
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <FormLabel sx={{ pb: 2 }} id="demo-radio-buttons-group-label">
                  Select the delivery region/area  *
                  </FormLabel>
                  <TextField
                  {...register("Area")}
                    fullWidth
                    select
                    label="Select"
                    value={selectedAria}
                    onChange={(event)=>setAria(event.target.value)}
                    variant="outlined"
                   
                  >
                    <MenuItem value="Aria1">Aria1</MenuItem>
                    <MenuItem value="Aria2">Aria2</MenuItem>
                    <MenuItem value="Aria3">Aria3</MenuItem>
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
                    onChange={(event)=>setOffice(event.target.value)}
                    variant="outlined"
                    
                  >
                    <MenuItem value="office1">office1</MenuItem>
                    <MenuItem value="office2">office2</MenuItem>
                    <MenuItem value="office3">office3</MenuItem>
                  
                  </TextField>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <FormLabel sx={{ pb: 2 }} id="demo-radio-buttons-group-label">
                  Select the type of service *
                  </FormLabel>
                  <Box sx={{display:"flex"}}>
                    <TextField
                    {...register("Service")}
                      fullWidth
                      select
                      label="Select"
                      value={selectedService}
                      onChange={(e)=>setService(e.target.value)}                     
                      variant="outlined"  
                      
                    >
                      <MenuItem value="s1">service1</MenuItem>
                      <MenuItem value="s2">service2</MenuItem>
                      <MenuItem value="s3">service3</MenuItem>
                      
                    </TextField>
                    
                  </Box>
                  
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <FormLabel sx={{ pb: 2 }} id="demo-radio-buttons-group-label">
                  Complainant`s Name*
                  </FormLabel>

                  <TextField  {...register("complainName", { required: true })} label="Write Complain Name" />
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
            <FileAttachment onFileChange={handleFileChange}/>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Paper>
  );
}
