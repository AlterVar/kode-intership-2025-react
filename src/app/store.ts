import { configureStore } from "@reduxjs/toolkit";
import peopleSlice from "./features/peopleSlice";
import modalSlice from "./features/modalSlice";

export const store = configureStore({
  reducer: {
    people: peopleSlice,
    modal: modalSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
