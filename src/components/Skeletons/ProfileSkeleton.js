import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/material";

export default function ProfileSkeleton() {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Skeleton variant="circular" width={35} height={35} />
      <Box  sx={{ display: { xs: "none", md: "block" } }}>
        <Skeleton sx={{mb:0.5}} animation="wave" variant="rounded" width={130} height={30} />
        <Skeleton animation="wave" variant="rounded" width={130} height={20} />
   
      </Box>
    </Stack>
  );
}
