import webTheme from "@/app/theme";
import UtilityCard from "@/components/UtilityCard/UtilityCard";
import { ThemeProvider } from "@emotion/react";
import { Grid } from "@mui/material";
import "aos/dist/aos.css";

export default function Utilities({ dashboardData ,selectedDates}) {
  const utility = dashboardData?.companyListWithTickets;
  console.log(selectedDates,"ddddddate")

  return (
    
      <Grid container spacing={{ xs: 2, sm: 4 }}>
        {utility?.map((data, index) => (
          <UtilityCard key={index} data={data} selectedDates={selectedDates}/>
        ))}
      </Grid>
    
  );
}
