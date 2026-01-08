import axios from "axios";
import { HeadersTypes } from "./types";
import { API_URL } from "./constants";
import { getLoginUser } from "./services";

// Define a function called apiClient which takes options as input
const apiClient = (options: HeadersTypes) => {
  // Retrieve user data by calling getLoginUser() function
  const userData = getLoginUser();
  console.log("userData ", userData);

  // Define the base URL for the API
  const baseURL = API_URL;

  // Extract the 'authorization' property from the 'options' object
  const { authorization } = options;

  // Initialize an empty 'headers' object
  const headers = {};
  if (authorization) {

    // If authorization is provided, add Authorization header with token to the headers object
    Object.assign(headers, {
      Authorization: `Bearer ${userData?.token || ""}`,
    });
  }

  // Create and return an axios instance with the specified baseURL and headers
  return axios.create({
    baseURL,
    headers,
  });
};
export default apiClient;
