import { configureStore } from "@reduxjs/toolkit";
import peopleSlice from "./features/peopleSlice";
import modalSlice from "./features/modalSlice";
import searchSlice from "./features/searchSlice";
import configSlice from "./features/configSlice";

export const store = configureStore({
  reducer: {
    people: peopleSlice,
    modal: modalSlice,
    search: searchSlice,
    config: configSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
