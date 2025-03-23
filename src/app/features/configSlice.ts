import { createSlice } from "@reduxjs/toolkit";

export type ModalStateType = {
  theme: "light" | "dark";
	networkStatus: boolean;
	language: string;
};

const isDark = window.matchMedia("(prefers-color-scheme: dark)");
const isOnline = navigator.onLine;
const language = navigator.language.slice(0, 2) || navigator.languages[0].slice(0, 2);


const initialState: ModalStateType = {
  theme: isDark.matches ? "dark" : "light",
  networkStatus: isOnline,
  language: language,
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
    changeLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { setTheme, setNetworkOnline, setNetworkOffline, changeLanguage } =
  configSlice.actions;
export default configSlice.reducer;
