import { createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../firebase/firebase.config";

const initialState = {
  user: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const userSignUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const { setLoading, setUser } = authSlice.actions;
export default authSlice.reducer;
