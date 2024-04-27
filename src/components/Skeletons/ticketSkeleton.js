import { Box } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { grey } from "@mui/material/colors";

export default function TicketSkeleton() {
  return (
    <Box sx={{ p: 2, pt: 3 }}>
      <Stack spacing={1} sx={{ border: 1, color: grey[200], p: 2 }}>
        <Skeleton animation="wave" variant="rounded" width="100%" height={80} />
        <Skeleton animation="wave" variant="rounded" width="100%" height={50} />
        <Skeleton animation="wave" variant="rounded" width="100%" height={50} />
        <Skeleton animation="wave" variant="rounded" width="100%" height={50} />
        <Skeleton animation="wave" variant="rounded" width="100%" height={50} />
        <Skeleton animation="wave" variant="rounded" width="100%" height={50} />
        <Skeleton animation="wave" variant="rounded" width="100%" height={50} />
        <Skeleton animation="wave" variant="rounded" width="100%" height={50} />
        <Skeleton animation="wave" variant="rounded" width="100%" height={50} />
        <Skeleton animation="wave" variant="rounded" width="100%" height={50} />
      </Stack>
    </Box>
  );
}
