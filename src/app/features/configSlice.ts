import { createSlice } from "@reduxjs/toolkit";

export type ModalStateType = {
  theme: "light" | "dark";
	networkStatus: boolean;
};

const isDark = window.matchMedia("(prefers-color-scheme: dark)");
const isOnline = navigator.onLine;

const initialState: ModalStateType = {
  theme: isDark.matches ? "dark" : "light",
  networkStatus: isOnline,
};

export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setNetworkOnline: (state) => {
      state.networkStatus = true;
    },
    setNetworkOffline: (state) => {
      state.networkStatus = false;
    },
  },
});

export const { setTheme, setNetworkOnline, setNetworkOffline } = configSlice.actions;
export default configSlice.reducer;
