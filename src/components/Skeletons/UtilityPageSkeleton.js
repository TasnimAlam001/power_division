import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { Grid } from "@mui/material";

export default function Variants() {
  return (
    <Stack
      spacing={1}
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Skeleton animation="wave" variant="rounded" width={272} height={180} />
      <Skeleton animation="wave" variant="rounded" width={372} height={40} />
      <Skeleton animation="wave" variant="rounded" width="100%" height={400} />
    </Stack>
  );
}
