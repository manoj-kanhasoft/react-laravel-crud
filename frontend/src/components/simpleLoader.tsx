import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { simpleLoader } from "../helpers/types";

// SimpleLoader component displays a circular progress indicator.

export default function SimpleLoader(props: simpleLoader) {
  // Destructure the size and color props from the props object
  const { size, color } = props;
  
  return (
    <Box sx={{ display: "flex" }}>
      {/* Render a CircularProgress component with optional size and color */}
      <CircularProgress size={size || 20} style={{ color: color || "#fff" }} />
    </Box>
  );
}
