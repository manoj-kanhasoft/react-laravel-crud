import { Box, Container, CssBaseline, Typography } from "@mui/material"; // Importing necessary components from Material-UI

import LayoutContainer from "../components/layoutContainer"; // Importing the LayoutContainer component

// Define a functional component called Home
function Home(): JSX.Element {
  return (
    // Render the LayoutContainer component
    <LayoutContainer>
      {/* Container for the main content */}
      <Container component="main" maxWidth="xs">
        {/* Normalize CSS */}
        <CssBaseline />
        {/* Box component for layout */}
        <Box
          sx={{
            marginTop: 8, // Top margin
            display: "flex", // Display as flex container
            flexDirection: "column", // Arrange children in column
            alignItems: "center", // Center align children
          }}
        >
          {/* Typography component for displaying a heading */}
          <Typography component="h1" variant="h3">
            Welcome!
          </Typography>
        </Box>
      </Container>
    </LayoutContainer>
  );
}

// Export the Home component as the default export
export default Home;
