import { createSlice } from "@reduxjs/toolkit";

export type ModalStateType = {
  isOpen: boolean;
};

const initialState: ModalStateType = {
  isOpen: false
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
	},
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
