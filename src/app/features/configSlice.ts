import { createSlice } from "@reduxjs/toolkit";

export type ModalStateType = {
  theme: "light" | "dark";
};

const isDark = window.matchMedia("(prefers-color-scheme: dark)");

const initialState: ModalStateType = {
  theme: isDark.matches ? "dark" : "light",
};

export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = configSlice.actions;
export default configSlice.reducer;
