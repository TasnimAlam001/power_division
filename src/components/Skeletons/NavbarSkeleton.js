import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { Box, Grid } from "@mui/material";

export default function NavbarSkeleton() {
  return (
    <Box>
      <Skeleton animation="wave" variant="rounded" width={100} height={380} />
      
    </Box>
  );
}
