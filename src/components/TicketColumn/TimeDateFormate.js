import { Box } from "@mui/material";
import React from "react";
import moment from "moment";

export default function TimeDateFormate({ params }) {
  const dateTime = params.formattedValue;

  // Format the date and time using Moment.js
  const formattedDateTime = moment(dateTime).format('LT, ll');

  return <Box>{formattedDateTime}</Box>;
}
