"use client";
import useAxiosSecure from "@/app/Hooks/useAxiousSecure";
import {
  Box,
  Button,
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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
import Divider from "@mui/material/Divider";
import TicketNavbar from "@/components/TicketPage/TicketNavbar";

export default function SingleTicket({ params }) {
  const router = useRouter();
  const { id } = params;
  const [axiosSecure] = useAxiosSecure();
  const [ticketDetailsData, setTicketDetailsData] = React.useState([]);

  React.useEffect(() => {
    axiosSecure(`/show-ticket/${id}`)
      .then((res) => {
        setTicketDetailsData(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [axiosSecure, id]);

  return (
    <Box sx={{}}>
      <TicketNavbar />
      <Paper elevation={1} sx={{ p: 3, ml: 10,mr: 10,mb: 10,mt: 5 }}>
        <Button
          sx={{ m: 0.5, bgcolor: grey[200] }}
          onClick={() => router.back()}
        >
          <ArrowBackIcon />
        </Button>
        <Box sx={{ px: 3, pb: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              py: 3,
              px: 1,

              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Typography>Ticket Details | ID #{ticketDetailsData.id}</Typography>
            <Typography
              sx={{
                bgcolor: grey[200],
                px: 1,
                py: 0.5,
                borderRadius: 2,
                color: "black",
                textAlign: "center",
                mt: { xs: 3, md: 0 },
                fontWeight: 700,
              }}
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
              <Grid item xs={12} md={4} lg={3}>
                <TableContainer sx={{ border: 1, color: grey[200] }}>
                  <Table sx={{ maxWidth: "100%" }}>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{
                            bgcolor: grey[200],
                            color: "black",
                            fontWeight: 700,
                          }}
                          align="center"
                          colSpan={2}
                        >
                          Customer Info
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                        <TableCell>{ticketDetailsData.name}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
                        <TableCell>{ticketDetailsData.email}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 700 }}>Phone</TableCell>
                        <TableCell>{ticketDetailsData.phone}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 700 }}>Address</TableCell>
                        <TableCell>{ticketDetailsData.address}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              {/* -----------------------------------Warp Up----------------------------- */}
              <Grid item xs={12} md={4} lg={6}>
                <TableContainer sx={{ border: 1, color: grey[200] }}>
                  <Table sx={{ maxWidth: "100%" }}>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{
                            bgcolor: grey[200],
                            color: "black",
                            fontWeight: 700,
                          }}
                          align="center"
                          colSpan={2}
                        >
                          Warp Up
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 700, width: "45%" }}>
                          Request Type
                        </TableCell>
                        <TableCell>
                          {ticketDetailsData.request_type_name}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 700 }}>
                          Request Category
                        </TableCell>
                        <TableCell>
                          {ticketDetailsData.request_category_name}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 700 }}>
                          Request Sub Category
                        </TableCell>
                        <TableCell>
                          {ticketDetailsData.request_sub_category_name}
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell sx={{ fontWeight: 700 }}>
                          Submitted At:
                        </TableCell>
                        <TableCell>{ticketDetailsData.submitted_at}</TableCell>
                      </TableRow>
                      
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              {/* -----------------------------------Consumer info----------------------------- */}
              <Grid item xs={12} md={4} lg={3}>
                <TableContainer sx={{ border: 1, color: grey[200] }}>
                  <Table sx={{ maxWidth: "100%" }}>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{
                            bgcolor: grey[200],
                            color: "black",
                            fontWeight: 700,
                          }}
                          align="center"
                          colSpan={2}
                        >
                          Consumer Info
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 700 }}>
                          Meter Type
                        </TableCell>
                        <TableCell>
                          {ticketDetailsData.request_type_id === 1
                            ? "PREPAID"
                            : "POSTPAID"}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ width: "45%", fontWeight: 700 }}>
                          {" "}
                          Area
                        </TableCell>
                        <TableCell>
                          {ticketDetailsData.company_zone_name}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 700 }}>
                          Nearest Office
                        </TableCell>
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
              <Grid item xs={12} md={7}>
                <TableContainer sx={{ border: 1, color: grey[200] }}>
                  <Table sx={{ maxWidth: "100%" }}>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{
                            bgcolor: grey[200],
                            color: "black",
                            fontWeight: 700,
                          }}
                          align="center"
                          colSpan={2}
                        >
                          Other Details
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 700 }}>
                          Power Division Id
                        </TableCell>
                        <TableCell>{ticketDetailsData.ticket_id}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 700 }}>
                          Created Time
                        </TableCell>
                        <TableCell>{ticketDetailsData.created_at}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 700 }}>
                          Start Processing at
                        </TableCell>
                        <TableCell>
                          {ticketDetailsData.start_processing_at}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 700 }}>
                          Closed at
                        </TableCell>
                        <TableCell>{ticketDetailsData.closed_at}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 700 }}>Reopen</TableCell>
                        <TableCell>
                          {ticketDetailsData.reopen_count} times
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 700 }}>
                          Updated By
                        </TableCell>
                        <TableCell>
                          {ticketDetailsData.update_by_name}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 700 }}>
                          Problem Details
                        </TableCell>
                        <TableCell>{ticketDetailsData.complain}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              {/* -----------------------------------Log----------------------------- */}
              <Grid item xs={12} md={5}>
                <TableContainer sx={{ border: 1, color: grey[200] }}>
                  <Table sx={{ maxWidth: "100%" }}>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{
                            bgcolor: grey[200],
                            color: "black",
                            fontWeight: 700,
                          }}
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
        </Box>
      </Paper>
    </Box>
  );
}
