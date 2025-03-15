import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PersonType } from "../../types/PersonType";
import axios from "axios";
import RequestParamsType from "../../types/RequestParamsType";
import { sortingType } from "../../types/SortingType";

export type loadingStatusType = {
  state: "idle" | "loading" | "failed";
  sorting: sortingType;
  people: PersonType[] | [];
};

const initialState: loadingStatusType = {
  state: "loading",
  sorting: sortingType.alphabetic,
  people: [],
};

export const fetchPeople = createAsyncThunk<PersonType[], RequestParamsType>(
  "features/fetchPeople",
  async (params: RequestParamsType) => {
    return axios
      .get(
        "https://stoplight.io/mocks/kode-frontend-team/koder-stoplight/86566464/users",
        { params: params }
      )
      .then((response) => response.data.items);
  }
);

export const peopleSlice = createSlice({
  name: "people",
  initialState,
  reducers: {
    changeSorting: (state, action) => {
			state.sorting = action.payload;
			peopleSlice.caseReducers.sortPeople(state, action)
    },
    sortPeople: (state, action) => {
      if (action.payload === sortingType.alphabetic) {
        state.people = state.people.slice().sort((a, b) => {
          const first = a.firstName + " " + a.lastName;
          const second = b.firstName + " " + b.lastName;
          if (first > second) {
            return 1;
          }
          if (first < second) {
            return -1;
          }
          return 0;
        });
      }
      if (action.payload === sortingType.birthday) {
        state.people = state.people.slice().sort((a, b) => {
          const first = Date.parse(a.birthday);
          const second = Date.parse(b.birthday);
          return second - first;
        });
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPeople.pending, (state) => {
      state.state = "loading";
    });
    builder.addCase(fetchPeople.fulfilled, (state, action) => {
      state.state = "idle";
			state.people = action.payload;
			peopleSlice.caseReducers.sortPeople(state, { type: "people/sortPeople", payload: state.sorting});
    });
    builder.addCase(fetchPeople.rejected, (state) => {
      state.state = "failed";
      state.people = [];
    });
  },
});

export const { sortPeople, changeSorting } = peopleSlice.actions;
export default peopleSlice.reducer;
