import { Box } from "@mui/material";
import React from "react";
import moment from "moment";
import { formatDateTime } from "../TicketFormater/TicketFormatter";

export default function TimeDateFormate({ params }) {
  const dateTime = params.formattedValue;

  // Format the date and time using Moment.js
  // const formattedDateTime = moment(dateTime).format('LT, ll');
  const formattedDateTime = formatDateTime(dateTime);

  return <Box>{formattedDateTime}</Box>;
}
