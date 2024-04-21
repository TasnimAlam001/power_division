import webTheme from "@/app/theme";
import UtilityCard from "@/components/UtilityCard/UtilityCard";
import { ThemeProvider } from "@emotion/react";
import { Grid } from "@mui/material";
import "aos/dist/aos.css";

export default function Utilities({ dashboardData }) {
  const utility = dashboardData?.companyListWithTickets;

  return (
    
      <Grid container spacing={{ xs: 2, sm: 4 }}>
        {utility?.map((data, index) => (
          <UtilityCard key={index} data={data} />
        ))}
      </Grid>
    
  );
}
