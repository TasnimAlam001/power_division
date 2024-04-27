"use client";
import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box, Button, Stack, Typography } from "@mui/material";
import { toast } from "react-toastify";
import dayjs from "dayjs";

export default function DashboardDate({ onDatesSelected, startDate, endDate }) {
  const [selectedFromDate, setSelectedFromDate] = useState(() => dayjs(startDate));
  const [selectedToDate, setSelectedToDate] = useState(() => dayjs(endDate));

  const handleDateChange = (date, dateType) => {
    if (dateType === "from") {
      setSelectedFromDate(date);
    } else if (dateType === "to") {
      setSelectedToDate(date);
    }
  };

  const handleFilterClick = () => {
    if (!selectedFromDate || !selectedToDate) {
      toast.error("Please select both from and to dates.");
      return;
    }
    if (selectedToDate.isBefore(selectedFromDate)) {
      toast.error("End date cannot be before start date");
      return;
    }
    const fromDate = selectedFromDate.format("YYYY-MM-DD");
    const toDate = selectedToDate.format("YYYY-MM-DD");
    onDatesSelected({ from: fromDate, to: toDate });
  };

  return (
    <Box sx={{ display: { xs: "none", md: "block" } }}>
      <Stack direction="row" spacing={3} alignItems="center" width={550}>
        <Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack direction="row" spacing={3} alignItems="center">
              <DatePicker
                value={selectedFromDate}
                onChange={(date) => handleDateChange(date, "from")}
                slotProps={{
                  textField: { size: "small", color: "success" },
                  openPickerButton: { color: "success" },
                }}
              />
              <Typography sx={{ color: "success.main" }}>-</Typography>
              <DatePicker
                minDate={selectedFromDate}
                value={selectedToDate}
                onChange={(date) => handleDateChange(date, "to")}
                slotProps={{
                  textField: { size: "small", color: "success" },
                  openPickerButton: { color: "success" },
                }}
              />
            </Stack>
          </LocalizationProvider>
        </Box>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "success.main",
            "&:hover": { backgroundColor: "success.dark" },
          }}
          onClick={handleFilterClick}
        >
          Filter
        </Button>
      </Stack>
    </Box>
  );
}
