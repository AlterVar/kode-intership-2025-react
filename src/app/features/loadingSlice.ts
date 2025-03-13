import { createSlice } from "@reduxjs/toolkit";

export type loadingStatusType = {
	value: "idle" | "loading" | "failed";
}

const initialState: loadingStatusType = { value: "loading" };

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    showError: (state) => {
      state.value = "failed";
    },
    showPeople: (state) => {
      state.value = "idle";
    },
    showLoading: (state) => {
      state.value = "loading";
    },
  },
});

export const { showError, showPeople, showLoading } = loadingSlice.actions;
export default loadingSlice.reducer;