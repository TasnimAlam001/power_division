import UtilityCard from "@/components/UtilityCard/UtilityCard";
import { Grid } from "@mui/material";
import "aos/dist/aos.css";

export default function Utilities({ dashboardData ,selectedDates}) {
  const utility = dashboardData?.companyListWithTickets;
  console.log(selectedDates,"in utility page")

  return (
    
      <Grid container spacing={{ xs: 2, sm: 4 }}>
        {utility?.map((data, index) => (
          <UtilityCard key={index} data={data} selectedDates={selectedDates}/>
        ))}
      </Grid>
    
  );
}
