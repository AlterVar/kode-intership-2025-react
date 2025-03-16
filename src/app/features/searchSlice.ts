import { createSlice } from "@reduxjs/toolkit";

type stateType = {
  active: boolean;
};

const initialState: stateType = {
  active: false,
};

export const searchSlice = createSlice({
	name: "search",
	initialState,
	reducers: {
		active: (state) => {
			state.active = true;
		},
		disabled: (state) => {
			state.active = false;
		}
	}
})

export const { active, disabled } = searchSlice.actions;
export default searchSlice.reducer;