// Define a function called getLoginUser which retrieves user data from localStorage
export const getLoginUser = () => {
  // Retrieve user data from localStorage using the key "userData"
  const userDataString = localStorage.getItem("userData");
  // Parse the retrieved user data string into a JavaScript object
  // If userDataString is null (indicating no data found in localStorage), set userData to null
  const userData = userDataString ? JSON.parse(userDataString) : null;

  // Return the parsed user data
  return userData;
};
