import { Box } from "@mui/material";
import React from "react";
import moment from "moment";

export default function UserDateFormatter({ params }) {
  const dateString = params.formattedValue;

  let formattedDate;
  try {
    if (dateString) {
      formattedDate = moment(dateString).format('LLL');
    } else {
      formattedDate = 'Date , Year , -- AM/PM'; 
    }
  } catch (error) {
    formattedDate = '✘'; 
  }

  return (
    <Box>
      {formattedDate}
    </Box>
  );
}
