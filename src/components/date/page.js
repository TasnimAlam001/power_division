"use client";
import { useState } from 'react'; // Import useState hook
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box, Button, Stack, ThemeProvider, Typography } from "@mui/material";
import webTheme from "@/app/theme";
import { toast } from 'react-toastify'; // Assuming you're using react-toastify for displaying toasts
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dayjs from 'dayjs';

export default function Date({ onDatesSelected , startDate, endDate}) {
  // State to store selected dates
  const [selectedFromDate, setSelectedFromDate] = useState(dayjs(startDate));
  const [selectedToDate, setSelectedToDate] = useState(dayjs(endDate));

  // Handler function to update selected dates
  const handleDateChange = (date, dateType) => {
    if (dateType === 'from') {
      setSelectedFromDate(date);
    } else if (dateType === 'to') {
      setSelectedToDate(date);
    }
  };

  // Handler function to handle filter button click
  const handleFilterClick = () => {
    if (selectedFromDate && selectedToDate) {
      // Check if the end date is before the start date
      if (selectedToDate.isBefore(selectedFromDate)) {
        // Display error toast if end date is before start date
        toast.error('End date cannot be before start date');
        return;
      }
      
      // Format selected dates into "date/month/year" format
      const fromDate = selectedFromDate.format('YYYY-MM-DD');
      const toDate = selectedToDate.format('YYYY-MM-DD');
      console.log('From Date:', fromDate);
      console.log('To Date:', toDate);
      onDatesSelected({ from: fromDate, to: toDate });
    } else {
      console.log('Please select both from and to dates.');
    }
  };
  console.log(startDate, endDate)

  return (
    <ThemeProvider theme={webTheme}>
      <ToastContainer/>
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <Stack direction="row" spacing={3} alignItems="center" width={550}>
          <Box>
            
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack direction="row" spacing={3} alignItems="center">
                <DatePicker
                  // label="From"
                  // defaultValue={dayjs(startDate)}
                  value={selectedFromDate} // Set selected date
                  onChange={(date) => handleDateChange(date, 'from')}
                  slotProps={{
                    textField: { size: "small", color: "success" },
                    openPickerButton: { color: "success" },
                  }}
                />
                <Typography sx={{ color: 'success.main' }}>-</Typography>
                <DatePicker
                  // label="To"
                  minDate={selectedFromDate ? selectedFromDate : undefined}
                  // defaultValue={dayjs(endDate)}
                  value={selectedToDate} // Set selected date
                  onChange={(date) => handleDateChange(date, 'to')}
                  slotProps={{
                    textField: { size: "small", color: "success" },
                    openPickerButton: { color: "success" },
                  }}
                />
              </Stack>
            </LocalizationProvider>
          </Box>
          <Box>
            <Button variant="contained" sx={{ backgroundColor: "success.main", "&:hover": { backgroundColor: "success.dark" } }} onClick={handleFilterClick}>
              Filter
            </Button>
          </Box>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}

