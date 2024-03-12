"use client";
import useAxiosSecure from "@/app/Hooks/useAxiousSecure";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
      <Paper elevation={2}>
        {/* -----------------------------------Customer info----------------------------- */}
        <Box width={260}>
          <TableContainer sx={{ ml: 6, border: 1, color: grey[200] }}>
            <Table sx={{ maxWidth: 260 }}>
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
        </Box>
        <Box width={500}>
          <TableContainer sx={{ ml: 6, border: 1, color: grey[200] }}>
            <Table sx={{ maxWidth: 500 }}>
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
                  <TableCell>Tasnim Alam</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell>blahblaah@blag.com</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Phone</TableCell>
                  <TableCell>29759 52670</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Address</TableCell>
                  <TableCell>Rajshahi</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        Company id id : {id}
      </Paper>
    </Box>
  );
}
