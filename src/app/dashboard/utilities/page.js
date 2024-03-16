import UtilityCard from "@/components/UtilityCard/UtilityCard";
import { Grid } from "@mui/material";
import Aos from "aos";
import "aos/dist/aos.css";


export default function Utilities({ dashboardData }) {
  const utility = dashboardData?.companyListWithTickets;

  return (
    <Grid container spacing={{ xs: 2, sm: 3 }}>
      {utility?.map((data, index) => (
        <UtilityCard key={index} data={data} />
      ))}
    </Grid>
  );
}
