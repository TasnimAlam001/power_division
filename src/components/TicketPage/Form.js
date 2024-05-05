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

export default function Form() {
  const [age, setAge] = useState("");
  const [selectedOption, setSelectedOption] = useState("account");
  const [inputValue, setInputValue] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  return (
    <Paper elevation={3} sx={{ m: 5, p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">
          {" "}
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
      <Box sx={{ mt: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                Select the meter type *
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="prepaid"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="prepaid"
                  control={<Radio />}
                  label="Prepaid"
                />
                <FormControlLabel
                  value="postpaid"
                  control={<Radio />}
                  label="Postpaid"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
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
                fullWidth
                select
                label="Select"
                value={selectedOption}
                onChange={handleSelectChange}
                variant="outlined"
              >
                <MenuItem value="account">Account Number</MenuItem>
                <MenuItem value="meter">Meter Number</MenuItem>
                <MenuItem value="customer">Customer Number</MenuItem>
              </TextField>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <FormLabel sx={{ pb: 2 }} id="demo-radio-buttons-group-label">
                Enter account/meter/customer number *
              </FormLabel>
              <TextField
                fullWidth
                select
                label="Select"
                value={selectedOption}
                onChange={handleSelectChange}
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <TextField
                      fullWidth
                      label="Enter number"
                      value={inputValue}
                      onChange={handleInputChange}
                      variant="standard"
                      disabled={!selectedOption}
                    />
                  ),
                }}
              >
                <MenuItem value="account">Account Number </MenuItem>
                <MenuItem value="meter">Meter Number</MenuItem>
                <MenuItem value="customer">Customer Number</MenuItem>
              </TextField>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <FormLabel sx={{ pb: 2 }} id="demo-radio-buttons-group-label">
                Enter the phone number*
              </FormLabel>         
              
              <TextField fullWidth   label="+880 " />
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={3} sx={{ mt: 4 }}>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <FormLabel sx={{ pb: 2 }} id="demo-radio-buttons-group-label">
                Select the delivery region/area *
              </FormLabel>
              <TextField
                fullWidth
                select
                label="Select"
                value={selectedOption}
                onChange={handleSelectChange}
                variant="outlined"
              >
                <MenuItem value="account">Account Number</MenuItem>
                <MenuItem value="meter">Meter Number</MenuItem>
                <MenuItem value="customer">Customer Number</MenuItem>
              </TextField>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <FormLabel sx={{ pb: 2 }} id="demo-radio-buttons-group-label">
                Select the nearest electricity office*
              </FormLabel>
              <TextField
                fullWidth
                select
                label="Select"
                value={selectedOption}
                onChange={handleSelectChange}
                variant="outlined"
              >
                <MenuItem value="account">Account Number</MenuItem>
                <MenuItem value="meter">Meter Number</MenuItem>
                <MenuItem value="customer">Customer Number</MenuItem>
              </TextField>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <FormLabel sx={{ pb: 2 }} id="demo-radio-buttons-group-label">
                Select the type of service *
              </FormLabel>
              <TextField
                fullWidth
                select
                label="Select"
                value={selectedOption}
                onChange={handleSelectChange}
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <TextField
                      fullWidth
                      label="Enter number"
                      value={inputValue}
                      onChange={handleInputChange}
                      variant="standard"
                      disabled={!selectedOption}
                    />
                  ),
                }}
              >
                <MenuItem value="account">Account Number </MenuItem>
                <MenuItem value="meter">Meter Number</MenuItem>
                <MenuItem value="customer">Customer Number</MenuItem>
              </TextField>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <FormLabel sx={{ pb: 2 }} id="demo-radio-buttons-group-label">
                Complainant`s Name*
              </FormLabel>
              <TextField label="Complainant's Name" />
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{my:3}}>
          <Grid item xs={5}>
            <TextField
              multiline
              minRows={4} 
              maxRows={10} 
              label="Enter your address"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={7}>
            <TextField
              multiline
              minRows={4} 
              maxRows={10} 
              label="Comment / Enter details of your complaint"
              variant="outlined"
              fullWidth
            />
          </Grid>
        </Grid>
        <FileAttachment/>
        <Button variant="contained">Submit</Button>
      </Box>
    </Paper>
  );
}
