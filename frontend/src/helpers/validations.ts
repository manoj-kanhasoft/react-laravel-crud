import Messages from "./messages"; // Importing Messages module for error messages
import { signInRequest, signUpRequest } from "./types"; // Importing signInRequest and signUpRequest types from types module

// Regular expression for email validation
const emailRegex =
  /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Function to validate sign-in data
export const validateSignIn = (data: signInRequest) => {
  const errors: any = {}; // Initialize an empty object to store errors
  const { email, password } = data; // Destructuring email and password from data

  // Check if email is empty or whitespace
  if (!email?.trim()) {
    errors.email = Messages.ERROR.REQUIRED_FIELD; // Set error message for email as required field
  } else if (!emailRegex.test(email?.trim())) { // Check if email is in valid format using regex
    errors.email = Messages.ERROR.ENTER_VALID_EMAIL; // Set error message for invalid email format
  }

  // Check if password is empty or whitespace
  if (!password?.trim()) {
    errors.password = Messages.ERROR.REQUIRED_FIELD; // Set error message for password as required field
  }

  return errors; // Return the errors object
};

// Function to validate sign-up data
export const validateSignUp = (data: signUpRequest) => {
  const errors: any = {}; // Initialize an empty object to store errors
  const { name, email, mobile_no, password, password_confirmation } = data; // Destructuring properties from data

  // Check if name is empty or whitespace
  if (!name?.trim()) {
    errors.name = Messages.ERROR.REQUIRED_FIELD; // Set error message for name as required field
  }

  // Check if email is empty or whitespace
  if (!email?.trim()) {
    errors.email = Messages.ERROR.REQUIRED_FIELD; // Set error message for email as required field
  } else if (!emailRegex.test(email?.trim())) { // Check if email is in valid format using regex
    errors.email = Messages.ERROR.ENTER_VALID_EMAIL; // Set error message for invalid email format
  }

  // Check if mobile number is empty or whitespace
  if (!mobile_no?.trim()) {
    errors.mobile_no = Messages.ERROR.REQUIRED_FIELD; // Set error message for mobile number as required field
  }

  // Check if password is empty or whitespace and if it meets minimum length requirement
  if (!password?.trim()) {
    errors.password = Messages.ERROR.REQUIRED_FIELD; // Set error message for password as required field
  } else if (password?.trim()?.length < 6) { // Check if password length is less than 6 characters
    errors.password = Messages.ERROR.MINIMUM_LENGTH_6; // Set error message for password length less than 6 characters
  }

  // Check if password confirmation is empty or whitespace
  if (!password_confirmation?.trim()) {
    errors.password_confirmation = Messages.ERROR.REQUIRED_FIELD; // Set error message for password confirmation as required field
  }

  // Check if password and password confirmation match
  if (
    password?.trim() &&
    password_confirmation?.trim() &&
    password?.trim() !== password_confirmation?.trim()
  ) {
    errors.confirmation_not_matched = Messages.ERROR.PASSWORD_CONFIRM_NOT_MATCHED; // Set error message for password and confirmation mismatch
  }

  return errors; // Return the errors object
};
