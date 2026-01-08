import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  loading: boolean;
  userData: any;
}

const initialState: InitialState = {
  loading: false,
  userData: null,
};

// This is the auth slice reducer for managing authentication-related state.
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state: Draft<InitialState>, action: PayloadAction<any>) => ({
      ...state,
      loading: action.payload,
    }),
    getLoginUser: (state: Draft<InitialState>, action: PayloadAction<any>) => ({
      ...state,
      userData: action.payload,
    }),
  },
});

export const { setLoading, getLoginUser } = authSlice.actions;

export default authSlice.reducer;
