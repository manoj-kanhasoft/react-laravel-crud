// Define an object called 'messages' containing various error and success messages
const messages = {
  // Error messages
  ERROR: {
    REQUIRED_FIELD: "This field is required.", // Message for a required field
    ENTER_VALID_EMAIL: "Please add valid email address", // Message for invalid email address
    MINIMUM_LENGTH_6: "Password length should be minimum 6 characters", // Message for password length less than 6 characters
    PASSWORD_CONFIRM_NOT_MATCHED: "Password and confirm password did not match", // Message for password and confirm password mismatch
    SOMETHIN_WRONG: "Something Went Wrong Please Try Again,", // Message for generic error
  },
  // Success messages
  SUCCESS: {
    LOGIN: "login successfully!", // Message for successful login
    LOGOUT: "logout successfully", // Message for successful logout
    SIGNUP: "Sign up successfully", // Message for successful sign up
  },
};

// Export the 'messages' object as the default export
export default messages;
