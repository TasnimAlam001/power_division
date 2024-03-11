import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { Grid} from "@mui/material";


export default function Variants() {
  return (
   
      <Stack spacing={1}>
         <Skeleton animation="wave" variant="rounded" width={272} height={240}/>
         <Skeleton animation="wave" variant="rounded" width={372} height={40}/>
         <Skeleton animation="wave" variant="rounded" width="100%" height={400}/>


        {/* <Grid container spacing={{ xs: 2, sm: 3 }}>
          <Grid item xs={12} sm={6} lg={4} xl={2}>
            <Skeleton animation="wave" variant="rounded" width={172}
              height={240}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={4} xl={2}>
            <Skeleton
              animation="wave"
              variant="rounded"
              width={172}
              height={240}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={4} xl={2}>
            <Skeleton
              animation="wave"
              variant="rounded"
              width={172}
              height={240}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={4} xl={2}>
            <Skeleton
              animation="wave"
              variant="rounded"
              width={172}
              height={240}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={4} xl={2}>
            <Skeleton
              animation="wave"
              variant="rounded"
              width={172}
              height={240}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={4} xl={2}>
            <Skeleton
              animation="wave"
              variant="rounded"
              width={172}
              height={240}
            />
          </Grid>
        </Grid> */}
      
      </Stack>
 
  );
}
