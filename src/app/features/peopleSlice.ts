import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PersonType } from "../../types/PersonType";
import axios, { AxiosResponse } from "axios";
import RequestParamsType from "../../types/RequestParamsType";

export type loadingStatusType = {
	state: "idle" | "loading" | "failed",
	people: PersonType[] | [],
}

const initialState: loadingStatusType = {
	state: "loading",
	people: [],
};

export const fetchPeople = createAsyncThunk(
  "features/fetchPeople",
  async (params: RequestParamsType) => {
    return axios
      .get(
        "https://stoplight.io/mocks/kode-frontend-team/koder-stoplight/86566464/users",
        { params: params }
      )
      .then((response: AxiosResponse) => response.data.items);
  }
);

export const peopleSlice = createSlice({
  name: "people",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPeople.pending, (state) => {
      state.state = "loading";
    });
    builder.addCase(fetchPeople.fulfilled, (state, action) => {
      state.state = "idle";
      state.people = action.payload;
    });
    builder.addCase(fetchPeople.rejected, (state) => {
      state.state = "failed";
      state.people = [];
    });
  },
});

export default peopleSlice.reducer;