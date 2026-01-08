import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Box, Button, Card, Container } from "@mui/material";
import { SITE_URL } from "../helpers/constants";

const CheckoutForm = (props: any) => {
  const { clientSecret, amount } = props;
  const stripe: any = useStripe();
  const elements: any = useElements();

  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    // Trigger form validation and wallet collection
    const { error: submitError }: any = await elements.submit();
    if (submitError) {
      // Show error to your customer
      setErrorMessage(submitError.message);
      return;
    }

    const { error } = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${SITE_URL}payment-success`,
      },
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <Container maxWidth={"sm"}>
      <Box p={2} display={"flex"} justifyContent={"center"}>
        <Card sx={{ padding: 2, textAlign: "center" }}>
          <form onSubmit={handleSubmit}>
            <PaymentElement />
            <Button
              type="submit"
              variant="contained"
              disabled={!stripe || !elements}
              sx={{ mt: 2 }}
            >
              <strong>Pay (${amount})</strong>
            </Button>
            {/* Show error message to your customers */}
            {errorMessage && <div>{errorMessage}</div>}
          </form>
        </Card>
      </Box>
    </Container>
  );
};

export default CheckoutForm;
