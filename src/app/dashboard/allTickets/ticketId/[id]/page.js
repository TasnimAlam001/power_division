
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
import React from "react";

export default function CompanyId({ params }) {
  const { id } = params;
  return (
    <Box>
      <Paper elevation={2}>
        <Box>
          <TableContainer sx={{ml:6,}}>
            <Table  sx={{ maxWidth: 400 , }}>
              <TableHead>
                <TableRow>
                  <TableCell
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
