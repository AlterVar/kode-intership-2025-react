import styled from "styled-components";
import { JSX, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchPeople, peopleStateType } from "../../app/features/peopleSlice";

import IdleCard from "./Cards/IdleCard";
import LoadingCard from "./Cards/LoadingCard";
import LoadingError from "../Error/LoadingError";

import type { PersonType } from "../../types/PersonType";
import SearchError from "../Error/SearchError";
import { searchStateType } from "../../app/features/searchSlice";

const Cards = styled.ul`
  display: flex;
  flex-direction: column;
`;

const CardsList = (): JSX.Element => {
  const peopleState: peopleStateType = useAppSelector((state) => state.people);
  const searchState: searchStateType = useAppSelector((state) => state.search);

  const dispatch = useAppDispatch();
  let isNeedUpdate = true;

  useEffect(() => {
    if (isNeedUpdate) {
			dispatch(fetchPeople({ ...peopleState.filter }));
			
      //*Uncomment to see the error screen on reload
      //*dispatch(fetchPeople({ __code: "500" }));
      return () => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        isNeedUpdate = false;
      };
    }
  }, []);

  const checkYear = (
    person: PersonType,
    index: number,
    array: PersonType[]
  ) => {
    if (index !== 0) {
      const current = new Date(person.birthday).getFullYear();
      const prev = new Date(array[index - 1].birthday).getFullYear();

      return current === prev;
		}
		return true;
  };

  return (
    <main>
      {peopleState.state === "failed" && <LoadingError />}
      {+searchState.active == 1 && peopleState.people.length === 0 && (
        <SearchError />
      )}

      <Cards>
        {peopleState.state === "loading" && (
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

        {peopleState.state === "idle" &&
          peopleState.people.length > 0 &&
          peopleState.people.map((person: PersonType, index, array) => {
            if (checkYear(person, index, array)) {
              return (
                <IdleCard key={person.id} person={person} divider={false} />
              );
            } else {
              return (
                <div key={person.id}>
                  <IdleCard person={person} divider={true} />
                </div>
              );
            }
          })}
      </Cards>
    </main>
  );
};

export default CardsList;
