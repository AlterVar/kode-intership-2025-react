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
  let dividerIsRendered = false;

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

  const checkYear = (person: PersonType) => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentDate = new Date(person.birthday);
    currentDate.setFullYear(currentYear);

		if (currentDate < today) {
			currentDate.setFullYear(currentYear + 1);
		}
    return currentDate.getFullYear() === currentYear;
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
          peopleState.people.map((person: PersonType) => {
						if (!checkYear(person) && !dividerIsRendered) {
							dividerIsRendered = true;
							return <IdleCard key={person.id} person={person} divider={true} />;
            }
            return <IdleCard key={person.id} person={person} divider={false} />;
          })}
      </Cards>
    </main>
  );
};

export default CardsList;
