import styled from "styled-components";
import { JSX, RefObject, useEffect, useRef } from "react";
import axios, { AxiosResponse } from "axios";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  loadingStatusType,
  showError,
  showPeople,
} from "../../app/features/loadingSlice";

import IdleCard from "./Cards/IdleCard";
import LoadingCard from "./Cards/LoadingCard";
import LoadingError from "../Error/LoadingError";

import type { PersonType } from "../../types/PersonType";

const Cards = styled.ul`
  display: flex;
  flex-direction: column;
`;

const CardsList = (): JSX.Element => {
  const loadingStatus: loadingStatusType = useAppSelector(
    (state) => state.loading
  );
  const dispatch = useAppDispatch();

  const people: RefObject<PersonType[] | null> = useRef(null);
  let isNeedUpdate = true;

  useEffect(() => {
    if (isNeedUpdate && people.current === null) {
      axios
        .get(
          "https://stoplight.io/mocks/kode-frontend-team/koder-stoplight/86566464/users?__example=all"
        )
        .then(function (response: AxiosResponse) {
          people.current = response.data.items;
          dispatch(showPeople());
        })
        .catch(function () {
          dispatch(showError());
        });
    }
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      isNeedUpdate = false;
    };
  }, []);

  return (
    <main>
      {loadingStatus.value === "failed" && <LoadingError />}

      <Cards>
        {loadingStatus.value === "loading" && (
          <>
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
          </>
        )}

        {loadingStatus.value === "idle" &&
          people.current?.map((person: PersonType) => (
            <IdleCard key={person.id} person={person} />
          ))}
      </Cards>
    </main>
  );
};

export default CardsList;
