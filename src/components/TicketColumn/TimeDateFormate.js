import { Box } from "@mui/material";
import React from "react";
import moment from "moment";

export default function TimeDateFormate({ params }) {
  const dateTime = params.formattedValue;

  // Format the date and time using Moment.js
  const formattedDateTime = moment(dateTime).format('LLL');

  return <Box>{formattedDateTime}</Box>;
}
