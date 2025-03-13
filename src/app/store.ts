import { configureStore } from "@reduxjs/toolkit";
import peopleSlice from "./features/peopleSlice";

export const store = configureStore({
  reducer: {
    loading: peopleSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
