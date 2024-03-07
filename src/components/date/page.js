"use client";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box, Button, Stack, ThemeProvider, Typography } from "@mui/material";
import webTheme from "@/app/theme";


export default function Date() {
  return (
    <ThemeProvider theme={webTheme}>
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <Stack direction="row" spacing={3} alignItems="center" width={550}>
          
          <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack direction="row" spacing={3} alignItems="center">
                <DatePicker
                label="From"
                  slotProps={{
                    textField: { size: "small", color: "success" },
                    openPickerButton: { color: "success" },
                  }}
                />{" "}
                <Typography sx={{color: 'success.main'}}>-</Typography>
                <DatePicker
                label="To"
                  slotProps={{
                    textField: { size: "small", color: "success",},
                    openPickerButton: { color: "success" },
                  }}
                />
              </Stack>
            </LocalizationProvider>
          </Box>

          <Box>
            <Button variant="contained" sx={{ backgroundColor: "success.main" , "&:hover": {backgroundColor: "success.dark"} }}>
              Filter
            </Button>
          </Box>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}
