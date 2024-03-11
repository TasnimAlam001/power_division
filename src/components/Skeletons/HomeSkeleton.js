import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { Box, Grid} from "@mui/material";


export default function Variants() {
  return (
   
      <Stack spacing={1}>
        <Grid container spacing={{ xs: 2, sm: 3 }}>
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
        </Grid>
        <Box  sx={{ display: { xs: "none", lg: "block" } , pl:3}}>
        <Grid container spacing={3}>
          <Grid item xs={5}>

            <Skeleton
              animation="wave"
              variant="rounded"
              width="100%"
              height={440}
            />
          </Grid>
          <Grid item xs={7}>
            <Skeleton
              animation="wave"
              variant="rounded"
              width="100%"
              height={440}
            />
          </Grid>
        </Grid>
        </Box>
      </Stack>
 
  );
}
