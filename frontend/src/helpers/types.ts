// Define a TypeScript type called HeadersTypes which represents headers for API requests
export type HeadersTypes = {
  // Optional property indicating whether authorization is present
  authorization?: boolean | undefined;
};

// Define a TypeScript type called signInRequest which represents the request body for signing in
export type signInRequest = {
  // Email of the user signing in
  email: string;
  // Password of the user signing in
  password: string;
  // Optional property for navigation after signing in
  navigate?: any;
};

// Define a TypeScript type called signUpRequest which represents the request body for signing up
export type signUpRequest = {
  // Name of the user signing up
  name: string;
  // Email of the user signing up
  email: string;
  // Mobile number of the user signing up
  mobile_no: string;
  // Password of the user signing up
  password: string;
  // Confirmation password of the user signing up
  password_confirmation: string;
  // Optional property for navigation after signing up
  navigate?: any;
};

// Define a TypeScript type called signOutRequest which represents the request body for signing out
export type signOutRequest = {
  // Optional property for navigation after signing out
  navigate?: any;
};

// Define a TypeScript type called paymentIntent which represents the request body for creating a payment intent
export type paymentIntent = {
  // Amount for the payment intent
  amount: string;
  // Optional property for setting client secret
  setClientSecret?: any;
};

// Define a TypeScript type called simpleLoader which represents options for a simple loader component
export type simpleLoader = {
  // Optional property for size of the loader
  size?: string;
  // Optional property for color of the loader
  color?: string;
};
