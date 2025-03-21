import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setupCache } from "axios-cache-interceptor";

import { PersonType } from "../../types/personType";
import RequestParamsType, { FilterType } from "../../types/requestParamsType";
import { SortingType } from "../../types/sortingType";

export type loadingState = "idle" | "loading" | "failed";
export type PeopleStateType = {
  state: loadingState;
  sorting: SortingType;
  search: string;
  people: PersonType[] | [];
  peopleOnFilter: PersonType[] | [];
  filter: RequestParamsType;
};

const initialState: PeopleStateType = {
  state: "loading",
  people: [],
  peopleOnFilter: [],
  sorting: SortingType.alphabetic,
  search: "",
  filter: {
    __example: FilterType["Все"],
  },
};

const instance = axios.create();
const axiosRequest = setupCache(instance, {
  ttl: 1000 * 60 * 5,
  cachePredicate: {
    statusCheck: (status) => status >= 200 && status < 300,
  },
});

export const fetchPeople = createAsyncThunk<PersonType[], RequestParamsType>(
  "features/fetchPeople",
  async (params: RequestParamsType) => {
    return axiosRequest
      .get(
        "https://stoplight.io/mocks/kode-frontend-team/koder-stoplight/86566464/users",
        { params: params }
      )
			.then((response) => {
				return response.data.items
			});
  }
);

const sort = (state: PeopleStateType, action: {payload: string, type: string}) => {
	if (action.payload === SortingType.alphabetic) {
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
  if (action.payload === SortingType.birthday) {
    const today = new Date();
    const currentYear = today.getFullYear();

    state.people = state.people.slice().sort((a, b) => {
      const firstDate = new Date(a.birthday);
      firstDate.setFullYear(currentYear);
      const secondDate = new Date(b.birthday);
      secondDate.setFullYear(currentYear);

      if (firstDate < today) firstDate.setFullYear(currentYear + 1);
      if (secondDate < today) secondDate.setFullYear(currentYear + 1);

      return firstDate.getTime() - secondDate.getTime();
    });
  }
}

export const peopleSlice = createSlice({
  name: "people",
  initialState,
	reducers: {
		setFilter: (state, action) => {
			state.filter = { ...action.payload };
		},
		setSearchText: (state, action) => {
			state.search = action.payload;
		},
		searchPeople: (state) => {
			state.people = state.peopleOnFilter.filter((person) => {
				const name =
					person.firstName + " " + person.lastName + " " + person.userTag;
				return name.includes(state.search);
			});
			sort(state, {
        type: "people/sortPeople",
        payload: state.sorting,
      });
		},
		sortPeople: (state, action) => {
			state.sorting = action.payload;
			sort(state, action);
		},
	},
  extraReducers: (builder) => {
    builder.addCase(fetchPeople.pending, (state) => {
      state.state = "loading";
    });
    builder.addCase(fetchPeople.fulfilled, (state, action) => {
      state.state = "idle";
      state.people = action.payload;
      state.peopleOnFilter = action.payload;
			if (state.search.length > 0) {
				peopleSlice.caseReducers.searchPeople(state);
			} else {
				sort(state, {
        type: "people/sortPeople",
        payload: state.sorting,
			});
			}
    });
    builder.addCase(fetchPeople.rejected, (state) => {
			state.state = "failed";
			/* if (state.people.length > 0)
      state.people = []; */
    });
  },
});

export const {
  sortPeople,
  setSearchText,
  setFilter,
  searchPeople,
} = peopleSlice.actions;
export default peopleSlice.reducer;