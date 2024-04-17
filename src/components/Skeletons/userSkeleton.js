import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { grey } from "@mui/material/colors";
import { Box, Grid } from "@mui/material";

export default function UserSkeleton() {
  return (
    <Stack spacing={1} sx={{ mt: 6 }}>
      <Skeleton animation="wave" variant="rounded" width="10%" height={40} />
      <Stack spacing={1} sx={{ border: 1, color: grey[200], p: 2}}>
        <Skeleton animation="wave" variant="rounded" width="100%" height={80} />
        <Skeleton animation="wave" variant="rounded" width="100%" height={60} />
        <Skeleton animation="wave" variant="rounded" width="100%" height={60} />
        <Skeleton animation="wave" variant="rounded" width="100%" height={60} />
        <Skeleton animation="wave" variant="rounded" width="100%" height={60} />
      </Stack>
    </Stack>
  );
}
