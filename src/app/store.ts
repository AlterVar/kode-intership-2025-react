import { configureStore } from "@reduxjs/toolkit";
import peopleSlice from "./features/peopleSlice";
import sortingSlice from "./features/sortingSlice";

export const store = configureStore({
  reducer: {
		loading: peopleSlice,
		sorting: sortingSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
