import {
  Typography,
  Stack,
  Box,
  Grid,
  Button,
  Container,
  CssBaseline,
} from "@mui/material"; // Importing necessary components from Material-UI
import { useState } from "react"; // Importing useState hook from React
import { loadStripe } from "@stripe/stripe-js"; // Importing loadStripe function from Stripe
import { Elements } from "@stripe/react-stripe-js"; // Importing Elements component from Stripe
import { STRIPE_KEY } from "../helpers/constants"; // Importing STRIPE_KEY from constants
import LayoutContainer from "../components/layoutContainer"; // Importing LayoutContainer component
import CheckoutForm from "../components/CheckoutForm"; // Importing CheckoutForm component
import { createPaymentIntent } from "../store/thunk/authThunk"; // Importing createPaymentIntent action from authThunk
import { useAppDispatch } from "../store/store"; // Importing useAppDispatch hook from store

// Define a functional component called Payment
const Payment = () => {
  const dispatch = useAppDispatch(); // Initializing dispatch function using useAppDispatch hook
  const stripePromise = loadStripe(STRIPE_KEY || ""); // Loading Stripe promise using STRIPE_KEY
  const [clientSecret, setClientSecret] = useState<any>(""); // Initializing clientSecret state variable using useState hook
  const [finalAmount, setFinalAmount] = useState<any>(""); // Initializing finalAmount state variable using useState hook

  // Function to retrieve client secret and set final amount
  const getClientSecret = async (amount: any) => {
    setFinalAmount(amount); // Setting final amount
    dispatch(
      // Dispatching createPaymentIntent action
      createPaymentIntent({ amount: amount, setClientSecret: setClientSecret })
    );
  };

  return (
    // Rendering the LayoutContainer component
    <LayoutContainer>
      <Container component="main">
        <CssBaseline /> {/* Normalize CSS */}
        {/* Conditional rendering based on clientSecret */}
        {clientSecret ? (
          <Elements
            options={{
              clientSecret,
            }}
            stripe={stripePromise}
          >
            {/* Rendering CheckoutForm component */}
            <CheckoutForm clientSecret={clientSecret} amount={finalAmount} />
          </Elements>
        ) : (
          <Box
            sx={{
              maxWidth: "1000px",
              width: "100%",
              margin: "0 auto",
              marginTop: 8,
            }}
          >
            <Grid container columnSpacing={"20px"} sx={{ width: "100%" }}>
              {/* Grid item for Basic plan */}
              <Grid item xs={12.0} sm={6.0} md={6.0} lg={4.0} xl={4.0}>
                <Stack
                  sx={{
                    alignItems: "flex-start",
                    width: "100%",
                    boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.1)",
                    borderRadius: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    padding: "20px",
                    border: "1px solid rgb(242,242,242)",
                    height: "100%",
                  }}
                  spacing="30px"
                >
                  {/* Stack for Basic plan details */}
                  <Stack
                    sx={{
                      alignItems: "flex-start",
                      width: "100%",
                      height: "250px",
                      justifyContent: "space-between",
                    }}
                    spacing="18px"
                  >
                    {/* Stack for Basic plan title */}
                    <Stack
                      sx={{ alignItems: "center", width: "100%" }}
                      spacing="9px"
                    >
                      {/* Typography for Basic plan title */}
                      <Stack
                        sx={{ width: "100%", alignItems: "center" }}
                        spacing="20px"
                        direction="row"
                      >
                        <Typography
                          variant="h2"
                          sx={{
                            lineHeight: "normal",
                            fontSize: "20px",
                            color: "rgb(0, 0, 0)",
                            fontWeight: "bold",
                            alignSelf: "flex-start",
                          }}
                        >
                          Basic
                        </Typography>
                      </Stack>
                      {/* Typography for Basic plan description */}
                      <Typography
                        variant="h3"
                        sx={{
                          lineHeight: "normal",
                          fontSize: "15px",
                          color: "#4d4d4d",
                          fontWeight: "normal",
                        }}
                      >
                        For teams building apps to collaborate on shared
                        workflows
                      </Typography>
                    </Stack>
                    {/* Stack for Basic plan pricing */}
                    <Stack
                      sx={{ width: "100%", alignItems: "center" }}
                      spacing="15px"
                      direction="row"
                    >
                      {/* Typography for Basic plan price */}
                      <Typography
                        variant="h1"
                        sx={{
                          lineHeight: "normal",
                          fontSize: "30px",
                          color: "rgb(77,77,77)",
                          fontWeight: "600",
                        }}
                      >
                        $10
                      </Typography>
                      {/* Typography for Basic plan billing details */}
                      <Typography sx={{ lineHeight: "normal" }}>
                        per seat/month billed annually
                      </Typography>
                    </Stack>
                    {/* Stack for Basic plan billing frequency */}
                    <Stack
                      sx={{
                        lineHeight: "normal",
                        fontSize: "18px",
                        color: "rgb(0, 0, 0)",
                        alignItems: "center",
                      }}
                      spacing="10px"
                      direction="row"
                    >
                      {/* Typography for Basic plan monthly billing */}
                      <Typography
                        sx={{
                          lineHeight: "normal",
                          fontSize: "18px",
                          color: "rgb(0, 0, 0)",
                          fontWeight: "bold",
                        }}
                      >
                        $10{" "}
                      </Typography>
                      {/* Typography for Basic plan monthly billing */}
                      <Typography
                        sx={{
                          lineHeight: "normal",
                          fontSize: "17px",
                          color: "rgb(0, 0, 0)",
                          fontWeight: "600",
                        }}
                      >
                        billed monthly
                      </Typography>
                    </Stack>
                    {/* Button for selecting Basic plan */}
                    <Button
                      disableElevation
                      variant="contained"
                      onClick={() => getClientSecret("10")}
                      sx={{
                        "&:hover": { backgroundColor: "rgb(255, 255, 255)" },
                        gap: "8px",
                        color: "rgb(0, 0, 0)",
                        textTransform: "none",
                        borderRadius: "9999px",
                        backgroundColor: "rgb(255, 255, 255)",
                        border: "2px solid rgb(0, 0, 0)",
                        padding: "14px 20px",
                        width: "100%",
                        fontWeight: "600",
                        fontSize: "14px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        maxWidth: "300px",
                        transition: "background-color 0.5s ease-in",
                      }}
                    >
                      Choose Basic
                    </Button>
                  </Stack>
                </Stack>
              </Grid>
              {/* Grid item for Team plan */}
              <Grid item xs={12.0} sm={6.0} md={6.0} lg={4.0} xl={4.0}>
                <Stack
                  sx={{
                    alignItems: "flex-start",
                    width: "100%",
                    boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.1)",
                    borderRadius: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    padding: "20px",
                    border: "1px solid rgb(242,242,242)",
                    height: "100%",
                  }}
                  spacing="30px"
                >
                  {/* Stack for Team plan details */}
                  <Stack
                    sx={{
                      alignItems: "flex-start",
                      width: "100%",
                      height: "250px",
                      justifyContent: "space-between",
                    }}
                    spacing="18px"
                  >
                    {/* Stack for Team plan title */}
                    <Stack
                      sx={{ alignItems: "center", width: "100%" }}
                      spacing="9px"
                    >
                      {/* Typography for Team plan title */}
                      <Stack
                        sx={{ width: "100%", alignItems: "center" }}
                        spacing="20px"
                        direction="row"
                      >
                        <Typography
                          variant="h2"
                          sx={{
                            lineHeight: "normal",
                            fontSize: "20px",
                            color: "rgb(0, 0, 0)",
                            fontWeight: "bold",
                            alignSelf: "flex-start",
                          }}
                        >
                          Team
                        </Typography>
                      </Stack>
                      {/* Typography for Team plan description */}
                      <Typography
                        variant="h3"
                        sx={{
                          lineHeight: "normal",
                          fontSize: "15px",
                          color: "#4d4d4d",
                          fontWeight: "normal",
                        }}
                      >
                        For teams building apps to collaborate on shared
                        workflows
                      </Typography>
                    </Stack>
                    {/* Stack for Team plan pricing */}
                    <Stack
                      sx={{ width: "100%", alignItems: "center" }}
                      spacing="15px"
                      direction="row"
                    >
                      {/* Typography for Team plan price */}
                      <Typography
                        variant="h1"
                        sx={{
                          lineHeight: "normal",
                          fontSize: "30px",
                          color: "rgb(77,77,77)",
                          fontWeight: "600",
                        }}
                      >
                        $20
                      </Typography>
                      {/* Typography for Team plan billing details */}
                      <Typography sx={{ lineHeight: "normal" }}>
                        per seat/month billed annually
                      </Typography>
                    </Stack>
                    {/* Stack for Team plan billing frequency */}
                    <Stack
                      sx={{
                        lineHeight: "normal",
                        fontSize: "18px",
                        color: "rgb(0, 0, 0)",
                        alignItems: "center",
                      }}
                      spacing="10px"
                      direction="row"
                    >
                      {/* Typography for Team plan monthly billing */}
                      <Typography
                        sx={{
                          lineHeight: "normal",
                          fontSize: "18px",
                          color: "rgb(0, 0, 0)",
                          fontWeight: "bold",
                        }}
                      >
                        $20{" "}
                      </Typography>
                      {/* Typography for Team plan monthly billing */}
                      <Typography
                        sx={{
                          lineHeight: "normal",
                          fontSize: "17px",
                          color: "rgb(0, 0, 0)",
                          fontWeight: "600",
                        }}
                      >
                        billed monthly
                      </Typography>
                    </Stack>
                    {/* Button for selecting Team plan */}
                    <Button
                      disableElevation
                      variant="contained"
                      onClick={() => getClientSecret("20")}
                      sx={{
                        "&:hover": { backgroundColor: "rgb(255, 255, 255)" },
                        gap: "8px",
                        color: "rgb(0, 0, 0)",
                        textTransform: "none",
                        borderRadius: "9999px",
                        backgroundColor: "rgb(255, 255, 255)",
                        border: "2px solid rgb(0, 0, 0)",
                        padding: "14px 20px",
                        width: "100%",
                        fontWeight: "600",
                        fontSize: "14px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        maxWidth: "300px",
                        transition: "background-color 0.5s ease-in",
                      }}
                    >
                      Choose Team
                    </Button>
                  </Stack>
                </Stack>
              </Grid>
              {/* Grid item for Business plan */}
              <Grid item xs={12.0} sm={6.0} md={6.0} lg={4.0} xl={4.0}>
                <Stack
                  sx={{
                    alignItems: "flex-start",
                    width: "100%",
                    boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.1)",
                    borderRadius: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    padding: "20px",
                    border: "1px solid rgb(242,242,242)",
                    height: "100%",
                  }}
                  spacing="30px"
                >
                  {/* Stack for Business plan details */}
                  <Stack
                    sx={{
                      alignItems: "flex-start",
                      width: "100%",
                      height: "250px",
                      justifyContent: "space-between",
                    }}
                    spacing="18px"
                  >
                    {/* Stack for Business plan title */}
                    <Stack
                      sx={{ alignItems: "center", width: "100%" }}
                      spacing="9px"
                    >
                      {/* Typography for Business plan title */}
                      <Typography
                        variant="h2"
                        sx={{
                          lineHeight: "normal",
                          fontSize: "20px",
                          color: "rgb(0, 0, 0)",
                          fontWeight: "bold",
                          alignSelf: "flex-start",
                        }}
                      >
                        Business
                      </Typography>
                      {/* Typography for Business plan description */}
                      <Typography
                        variant="h3"
                        sx={{
                          lineHeight: "normal",
                          fontSize: "15px",
                          color: "#4d4d4d",
                          fontWeight: "normal",
                        }}
                      >
                        For teams and departments who need advanced features
                      </Typography>
                    </Stack>
                    {/* Stack for Business plan pricing */}
                    <Stack
                      sx={{ width: "100%", alignItems: "center" }}
                      spacing="15px"
                      direction="row"
                    >
                      {/* Typography for Business plan price */}
                      <Typography
                        variant="h1"
                        sx={{
                          lineHeight: "normal",
                          fontSize: "30px",
                          color: "rgb(77,77,77)",
                          fontWeight: "600",
                        }}
                      >
                        $30
                      </Typography>
                      {/* Typography for Business plan billing details */}
                      <Typography sx={{ lineHeight: "normal" }}>
                        per seat/month billed annually
                      </Typography>
                    </Stack>
                    {/* Stack for Business plan billing frequency */}
                    <Stack
                      sx={{
                        lineHeight: "normal",
                        fontSize: "18px",
                        color: "rgb(0, 0, 0)",
                        alignItems: "center",
                      }}
                      spacing="10px"
                      direction="row"
                    >
                      {/* Typography for Business plan monthly billing */}
                      <Typography
                        sx={{
                          lineHeight: "normal",
                          fontSize: "18px",
                          color: "rgb(0, 0, 0)",
                          fontWeight: "bold",
                        }}
                      >
                        $30
                      </Typography>
                      {/* Typography for Business plan monthly billing */}
                      <Typography
                        sx={{
                          lineHeight: "normal",
                          fontSize: "17px",
                          color: "rgb(0, 0, 0)",
                          fontWeight: "600",
                        }}
                      >
                        billed monthly
                      </Typography>
                    </Stack>
                    {/* Button for selecting Business plan */}
                    <Button
                      disableElevation
                      variant="contained"
                      onClick={() => getClientSecret("30")}
                      sx={{
                        "&:hover": { backgroundColor: "rgb(255, 255, 255)" },
                        gap: "8px",
                        color: "rgb(0, 0, 0)",
                        textTransform: "none",
                        borderRadius: "9999px",
                        backgroundColor: "rgb(255, 255, 255)",
                        border: "2px solid rgb(0, 0, 0)",
                        padding: "14px 20px",
                        width: "100%",
                        fontWeight: "600",
                        fontSize: "14px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        maxWidth: "300px",
                        transition: "background-color 0.5s ease-in",
                      }}
                    >
                      Choose Business
                    </Button>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        )}
      </Container>
    </LayoutContainer>
  );
};

export default Payment; // Exporting the Payment component
