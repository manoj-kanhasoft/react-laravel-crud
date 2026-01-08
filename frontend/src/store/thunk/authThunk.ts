import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { setLoading } from "../slices/authSlice";
import {
  paymentIntent,
  signInRequest,
  signOutRequest,
  signUpRequest,
} from "../../helpers/types";
import messages from "../../helpers/messages";
import apiClient from "../../helpers/apiClient";

// Async thunk for user login
export const login = createAsyncThunk(
  "login",
  async (_request: signInRequest, { dispatch }) => {
    const { navigate, email, password } = _request;
    dispatch(setLoading(true)); // Set loading state to true
    await apiClient({ authorization: false })
      .post("login", { email, password })
      .then(async (response) => {
        dispatch(setLoading(false)); // Set loading state to false
        if (response?.data?.status) {
          localStorage.setItem(
            "userData",
            JSON.stringify(response?.data?.data)
          );
          toast.success(messages.SUCCESS.LOGIN); // Show success message
          if (navigate) {
            navigate("/"); // Redirect to home page
          }
        } else {
          toast.error(response?.data?.message || messages.ERROR.SOMETHIN_WRONG); // Show error message
        }
      })
      .catch((error) => {
        dispatch(setLoading(false)); // Set loading state to false
        toast.error(
          error?.response?.data?.message || messages.ERROR.SOMETHIN_WRONG
        ); // Show error message
      });
  }
);

// Async thunk for user signout
export const signout = createAsyncThunk(
  "signout",
  async (_request: signOutRequest, { dispatch }) => {
    const { navigate } = _request;
    dispatch(setLoading(true)); // Set loading state to true
    await apiClient({ authorization: true })
      .post("logout", {})
      .then(async (response) => {
        dispatch(setLoading(false)); // Set loading state to false
        if (response?.data?.status) {
          localStorage.removeItem("userData");
          toast.success(messages.SUCCESS.LOGOUT); // Show success message
          if (navigate) {
            navigate("/"); // Redirect to home page
          }
        } else {
          toast.error(response?.data?.message || messages.ERROR.SOMETHIN_WRONG); // Show error message
        }
      })
      .catch((error) => {
        dispatch(setLoading(false)); // Set loading state to false
        toast.error(
          error?.response?.data?.message || messages.ERROR.SOMETHIN_WRONG
        ); // Show error message
      });
  }
);

// Async thunk for user signup
export const signup = createAsyncThunk(
  "signup",
  async (_request: signUpRequest, { dispatch }) => {
    const {
      navigate,
      name,
      email,
      mobile_no,
      password,
      password_confirmation,
    } = _request;
    dispatch(setLoading(true)); // Set loading state to true
    await apiClient({ authorization: false })
      .post("register", {
        name,
        email,
        mobile_no,
        password,
        password_confirmation,
      })
      .then(async (response) => {
        dispatch(setLoading(false)); // Set loading state to false
        if (response?.data?.status) {
          toast.success(messages.SUCCESS.SIGNUP); // Show success message
          if (navigate) {
            navigate("/sign-in"); // Redirect to sign-in page
          }
        } else {
          toast.error(response?.data?.message || messages.ERROR.SOMETHIN_WRONG); // Show error message
        }
      })
      .catch((error) => {
        dispatch(setLoading(false)); // Set loading state to false
        toast.error(
          error?.response?.data?.message || messages.ERROR.SOMETHIN_WRONG
        ); // Show error message
      });
  }
);

// Async thunk for creating payment intent
export const createPaymentIntent = createAsyncThunk(
  "createPaymentIntent",
  async (_request: paymentIntent) => {
    const { amount, setClientSecret } = _request;
    await apiClient({ authorization: true })
      .post("create-payment-intent", { amount })
      .then(async (response) => {
        if (setClientSecret && response?.data?.data?.client_secret) {
          setClientSecret(response?.data?.data?.client_secret);
        }
        if (!response?.data?.status) {
          toast.error(response?.data?.message || messages.ERROR.SOMETHIN_WRONG); // Show error message
        }
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.message || messages.ERROR.SOMETHIN_WRONG
        ); // Show error message
      });
  }
);

// This section contains asynchronous functions for handling user authentication, sign-out, sign-up, and creating payment intent.
