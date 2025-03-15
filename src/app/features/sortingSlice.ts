import { createSlice } from "@reduxjs/toolkit";
import { sortingType } from "../../types/SortingType";

export type sortingStateType = {
	isOpen: boolean,
	sortingType: sortingType
};

const initialState: sortingStateType = {
  isOpen: false,
  sortingType: sortingType.alphabetic,
};

export const sortingSlice = createSlice({
  name: "sorting",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
    changeSorting: (state, action) => {
      state.sortingType = action.payload;
    },
  },
});

export const { openModal, closeModal, changeSorting } = sortingSlice.actions;
export default sortingSlice.reducer;
