import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { Box, Grid } from "@mui/material";

export default function UserSkeleton() {
  return (
    <Stack spacing={1}>
      <Skeleton animation="wave" variant="rounded" width="100%" height={60} />
      <Skeleton animation="wave" variant="rounded" width="100%" height={60} />
      <Skeleton animation="wave" variant="rounded" width="100%" height={60} />
      <Skeleton animation="wave" variant="rounded" width="100%" height={60} />
      <Skeleton animation="wave" variant="rounded" width="100%" height={60} />
    </Stack>
  );
}
