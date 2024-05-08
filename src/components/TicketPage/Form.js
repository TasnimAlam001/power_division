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
import useAxiosSecure from "@/app/Hooks/useAxiousSecure";
import Swal from "sweetalert2";

export default function Form() {
  const [selectedOrganization, setOrganization] = useState("");
  const [organizations, setOrganizations] = useState({ data: [] });
  const [areas, setAreas] = useState([]);
  const [offices, setOffices] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedOffice, setSelectedOffice] = useState("");
  const [selectedService, setService] = useState("");
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [selectedAMCName, setAMCName] = useState("");
  const [axiosSecure] = useAxiosSecure();

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
      axiosSecure("/wrap-up/request-sub-category")
        .then((res) => {
          setServices(res.data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (error) {
      console.error("Error fetching organizations:", error);
    }
  };
  const fetchOrganizations = async () => {
    try {
      axiosSecure("/wrap-up/company")
        .then((res) => {
          setOrganizations(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (error) {
      console.error("Error fetching organizations:", error);
    }
  };

  const fetchAreas = async (organizationId) => {
    try {
      axiosSecure(`/wrap-up/company-zone?company_id=${organizationId}`)
        .then((res) => {
          setAreas(res.data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (error) {
      console.error("Error fetching areas:", error);
    }
  };

  const fetchOffices = async (organizationId, areaId) => {
    try {
      axiosSecure(
        `/wrap-up/supply-and-distribution?company_id=${organizationId}&company_zone_id=${areaId}`
      )
        .then((res) => {
          setOffices(res.data.data);
        })
        .catch((e) => {
          console.log(e);
        });
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
    const filesObject = {};
  
    attachedFiles.forEach((file, index) => {
      filesObject[`file_${index + 1}`] = file;
    });
  
    const formDataWithFiles = Object.assign({}, data, filesObject);
    reset();
    const {
      account_type_id,
      address,
      company_id,
      company_zone_id,
      complain,
      identity_number,
      identity_number_type_id,
      name,
      phone,
      request_sub_category_id,
      supply_and_distribution_id,
     
    } = formDataWithFiles;
    console.log(formDataWithFiles)

    axiosSecure.post("/create-ticket", {
        account_type_id,
        address,
        company_id,
        company_zone_id,
        complain,
        identity_number,
        identity_number_type_id,
        name,
        phone,
        request_sub_category_id,
        supply_and_distribution_id,
        
      })
      .then((res) => {
        if (res.status === 200) {
          const complaintID = res.data.data.ticket_id;

          Swal.fire({
            title: "আপনার অভিযোগটি গৃহীত হয়েছে",
            html: `
            <div>
              <p>অভিযোগ অনুসন্ধান আইডি : <strong id="complaintID">${complaintID}</strong></p>
              <p style="font-size: 12px; margin-bottom: 10px;">খুব শীগ্রই অভিযোগটি পর্যালোচনা করে সমাধান করা হবে।</p>
              <p>ধন্যবাদ</p>
            </div>`,
            icon: "success",
            showCancelButton: false,
            showConfirmButton: true,
            confirmButtonText: "Okay",
            confirmButtonColor: "#3085d6",
          });

          console.log(res);
        }
      })
      .catch((e) => {
        console.log(",,,,,,,,,,", e);
      });
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
            বিদ্যুৎ সেবা পেতে নিচের ফরমটি পূরণ করুন।
          </Typography>

          <Link href="/ticket/track">
            <Button variant="contained">
              অভিযোগ সন্ধান করুন <SearchOutlinedIcon />
            </Button>
          </Link>
        </Box>
        <Divider variant="middle" />
        <ToastContainer />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ pt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">
                    মিটারের ধরণ নির্বাচন করুন *
                  </FormLabel>
                  <RadioGroup defaultValue="1" name="account_type_id">
                    <FormControlLabel
                      value="1"
                      control={<Radio size="small" />}
                      label="প্রিপেইড"
                      {...register("account_type_id")}
                    />
                    <FormControlLabel
                      value="2"
                      control={<Radio size="small" />}
                      label="পোস্টপেইড"
                      {...register("account_type_id")}
                    />
                    <FormControlLabel
                      value="3"
                      control={<Radio size="small" />}
                      label="অন্যান্য"
                      {...register("account_type_id")}
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <FormLabel sx={{ pb: 2 }} id="demo-radio-buttons-group-label">
                    সংস্থা / কোম্পানী নির্বাচন করুন *
                  </FormLabel>
                  <TextField
                    {...register("company_id", { required: true })}
                    select
                    label="Select"
                    value={selectedOrganization}
                    onChange={handleOrganizationChange}
                    variant="outlined"
                    size="small"
                  >
                    {organizations?.data.map((company) => (
                      <MenuItem key={company.id} value={company.id}>
                        {company.short_name}-{company.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  {errors.Organization && (
                    <Typography variant="body2" color="error">
                      Please choose an organization
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <FormLabel sx={{ pb: 2 }} id="demo-radio-buttons-group-label">
                    অ্যাকাউন্ট / মিটার / গ্রাহক নাম্বার লিখুন *
                  </FormLabel>
                  <Box sx={{ display: "flex" }}>
                    <TextField
                      fullWidth
                      {...register("identity_number_type_id")}
                      select
                      label="Select"
                      value={selectedAMCName}
                      variant="outlined"
                      onChange={(event) => setAMCName(event.target.value)}
                      size="small"
                    >
                      <MenuItem value="1">অ্যাকাউন্ট নাম্বার </MenuItem>
                      <MenuItem value="2">মিটার নাম্বার</MenuItem>
                      <MenuItem value="3">গ্রাহক নাম্বার</MenuItem>
                    </TextField>
                    <TextField
                      fullWidth
                      label="Enter number"
                      variant="outlined"
                      {...register("identity_number", { required: true })}
                      size="small"
                    />
                  </Box>
                  {errors.identity_number && (
                    <Typography variant="body2" color="error">
                      Account name and number is required
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={2}>
                <FormControl fullWidth>
                  <FormLabel sx={{ pb: 2 }} id="demo-radio-buttons-group-label">
                    ফোন নম্বর লিখুন *
                  </FormLabel>

                  <TextField
                    size="small"
                    {...register("phone", { required: true })}
                    label="+880 "
                  />
                  {errors.phone && (
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
                    বিতরণ অঞ্চল / এলাকা নির্বাচন করুন *
                  </FormLabel>
                  <TextField
                    {...register("company_zone_id")}
                    fullWidth
                    select
                    label="Select"
                    value={selectedArea}
                    onChange={handleAreaChange}
                    variant="outlined"
                    size="small"
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
                    নিকটস্থ বিদ্যুৎ অফিস নির্বাচন করুন *
                  </FormLabel>
                  <TextField
                    size="small"
                    {...register("supply_and_distribution_id")}
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
                    সেবার ধরণ নির্বাচন করুন *
                  </FormLabel>
                  <Box sx={{ display: "flex" }}>
                    <TextField
                      size="small"
                      {...register("request_sub_category_id")}
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
                    অভিযোগকারীর নাম *
                  </FormLabel>

                  <TextField
                    size="small"
                    {...register("name", { required: true })}
                    label="Write Your Name"
                  />
                  {errors.name && (
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
                  label="আপনার ঠিকানা লিখুন"
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
                  {...register("complain", { required: true })}
                  multiline
                  minRows={4}
                  maxRows={10}
                  label="মন্তব্য / আপনার অভিযোগের বিস্তারিত লিখুন"
                  variant="outlined"
                  fullWidth
                />
                {errors.complain && (
                  <Typography variant="body2" color="error">
                    Complaint is required
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
