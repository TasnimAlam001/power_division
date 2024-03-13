"use client";
import useAxiosSecure from "@/app/Hooks/useAxiousSecure";
import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import React from "react";

export default function CompanyId({ params }) {
  const { id } = params;
  const [axiosSecure] = useAxiosSecure();
  const [ticketDetailsData, setTicketDetailsData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    axiosSecure(`/ticket/${id}`)
      .then((res) => {
        setLoading(false);
        setTicketDetailsData(res.data.data);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, []);

  console.log(ticketDetailsData);

  return (
    <Box>
      <Paper sx={{ p: 3 }} elevation={2}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            py: 3,
            px: 1,
          }}
        >
          <Typography>Ticket Details | ID #{ticketDetailsData.id}</Typography>
          <Typography
            sx={{ bgcolor: "primary.light", px: 2, py: 0.5, borderRadius: 2 }}
          >
            {(() => {
              const status = Number(ticketDetailsData.status);
              switch (status) {
                case 1:
                  return "Opend";
                case 2:
                  return "Processing";
                case 3:
                  return "Closed";
                case 4:
                  return "Reopened";
                default:
                  return "Unknown";
              }
            })()}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <Grid container spacing={3}>
            {/* -----------------------------------Customer info----------------------------- */}
            <Grid item xs={3}>
              <TableContainer sx={{ border: 1, color: grey[200] }}>
                <Table sx={{ maxWidth: "100%" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{ bgcolor: blue[50] }}
                        align="center"
                        colSpan={2}
                      >
                        Customer Info
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>{ticketDetailsData.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Email</TableCell>
                      <TableCell>{ticketDetailsData.email}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Phone</TableCell>
                      <TableCell>{ticketDetailsData.phone}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Address</TableCell>
                      <TableCell>{ticketDetailsData.address}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            {/* -----------------------------------Warp Up----------------------------- */}
            <Grid item xs={6}>
              <TableContainer sx={{ border: 1, color: grey[200] }}>
                <Table sx={{ maxWidth: "100%" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{ bgcolor: blue[50] }}
                        align="center"
                        colSpan={2}
                      >
                        Warp Up
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Request Type</TableCell>
                      <TableCell>
                        {ticketDetailsData.request_type_name}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Request Category</TableCell>
                      <TableCell>
                        {ticketDetailsData.request_category_name}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Request Sub Category</TableCell>
                      <TableCell>
                        {ticketDetailsData.request_sub_category_name}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <Box sx={{pt:1}}> 
                <Typography >
                  Source{" "}
                  <Box component="span" sx={{ bgcolor: "primary.light", px: 2, py: 0.5, borderRadius: 2 , mr:2}}>

                    {ticketDetailsData.platform}
                  </Box>
                  
                  Submitted At: 
                  
                  {ticketDetailsData.submitted_at}
                </Typography>
                <Typography sx={{mt:2}}>
                  Created By <Box component="span" sx={{ bgcolor: grey[200], px: 2, py: 0.5, borderRadius: 2}}> {ticketDetailsData.user_name}</Box>
                </Typography>
              </Box>
            </Grid>
            {/* -----------------------------------Customer info-2----------------------------- */}
            <Grid item xs={3}>
              <TableContainer sx={{ border: 1, color: grey[200] }}>
                <Table sx={{ maxWidth: "100%" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{ bgcolor: blue[50] }}
                        align="center"
                        colSpan={2}
                      >
                        Customer Info
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Meter Type</TableCell>
                      <TableCell>
                        {ticketDetailsData.request_type_id === 1
                          ? "PREPAID"
                          : "POSTPAID"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Area</TableCell>
                      <TableCell>
                        {ticketDetailsData.company_zone_name}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Nearest Office</TableCell>
                      <TableCell>
                        {ticketDetailsData.supply_and_distribution_name}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            {/* -----------------------------------Other Details----------------------------- */}
            <Grid item xs={6}>
              <TableContainer sx={{ border: 1, color: grey[200] }}>
                <Table sx={{ maxWidth: "100%" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{ bgcolor: blue[50] }}
                        align="center"
                        colSpan={2}
                      >
                        Other Details
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Power Division Id</TableCell>
                      <TableCell>{ticketDetailsData.ticket_id}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Created Time</TableCell>
                      <TableCell>{ticketDetailsData.created_at}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Start Processing at</TableCell>
                      <TableCell>
                        {ticketDetailsData.start_processing_at}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Closed at</TableCell>
                      <TableCell>{ticketDetailsData.closed_at}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Reopen</TableCell>
                      <TableCell>
                        {ticketDetailsData.reopen_count} times
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Updated By</TableCell>
                      <TableCell>{ticketDetailsData.update_by_name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Problem Details</TableCell>
                      <TableCell>{ticketDetailsData.complain}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            {/* -----------------------------------Log----------------------------- */}
            <Grid item xs={6}>
              <TableContainer sx={{ border: 1, color: grey[200] }}>
                <Table sx={{ maxWidth: "100%" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{ bgcolor: blue[50] }}
                        align="center"
                        colSpan={3}
                      >
                        Log
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>closed</TableCell>
                      {ticketDetailsData.log &&
                      ticketDetailsData.log.length > 0 ? (
                        <>
                          <TableCell>
                            {ticketDetailsData.log[0].status === "closed"
                              ? "Ok"
                              : "No"}
                          </TableCell>
                          <TableCell>
                            {ticketDetailsData.log[0].created_at}
                          </TableCell>
                        </>
                      ) : (
                        <>
                          <TableCell>-</TableCell>
                          <TableCell>-</TableCell>
                        </>
                      )}
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
}
