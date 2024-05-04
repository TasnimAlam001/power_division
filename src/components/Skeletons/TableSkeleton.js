import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { grey } from "@mui/material/colors";

export default function TableSkeleton() {
  return (
    <Stack sx={{ p: 3, pt: 3 }}>
      <Stack spacing={1} sx={{ border: 1, color: grey[200], p: 1, borderRadius: 1 }}>
        <Skeleton animation="wave" variant="rounded" width="100%" height={80} />
        <Skeleton animation="wave" variant="rounded" width="100%" height={60} />
        <Skeleton animation="wave" variant="rounded" width="100%" height={60} />
        <Skeleton animation="wave" variant="rounded" width="100%" height={60} />
        <Skeleton animation="wave" variant="rounded" width="100%" height={60} />
        <Skeleton animation="wave" variant="rounded" width="100%" height={60} />
        <Skeleton animation="wave" variant="rounded" width="100%" height={60} />
      </Stack>
    </Stack>
  );
}
