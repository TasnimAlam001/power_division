import { Grid } from "@mui/material";

import BarCharts from "../barCharts/BarCharts";
import PieChars from "../pieCharts/PieCharts";
import AreaCharts from "../areaCharts/AreaCharts";
import RowCharts from "../rowCharts/RowCharts";


export default function AllCharts({dashboardData}) {


  return (

      <Grid container spacing={3}>
        
            <Grid item xs={12} lg={5}>
              <PieChars dashboardData={dashboardData} />
            </Grid>

            <Grid item xs={12} lg={7}>
              <BarCharts dashboardData={dashboardData} />
            </Grid>
            <Grid item xs={12} lg={5}>
              <AreaCharts dashboardData={dashboardData} />
            </Grid>
            <Grid item xs={12} lg={7}>
              <RowCharts dashboardData={dashboardData} />
            </Grid>
      
      
      </Grid>

  );
}
