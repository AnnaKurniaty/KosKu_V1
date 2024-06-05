import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  userId: '',
  loading: false
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "dark" ? "light" : "dark";
    },
    setUser: (state, action) => {
      state.userId = action.payload
    },
    setLoading: (state) => {
      state.loading = !state.loading;
    }
  },
});

export const { setMode, setUser, setLoading } = globalSlice.actions;

export default globalSlice.reducer;