import styled from "styled-components";
import { JSX, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchPeople, loadingStatusType } from "../../app/features/peopleSlice";

import IdleCard from "./Cards/IdleCard";
import LoadingCard from "./Cards/LoadingCard";
import LoadingError from "../Error/LoadingError";

import type { PersonType } from "../../types/PersonType";
import { departments } from "../../types/RequestParamsType";

const Cards = styled.ul`
  display: flex;
  flex-direction: column;
`;

const CardsList = (): JSX.Element => {
  const loadingStatus: loadingStatusType = useAppSelector(
    (state) => state.people
	);
	const dispatch = useAppDispatch();
		let isNeedUpdate = true;
	
		useEffect(() => {
			if (isNeedUpdate) {
				dispatch(fetchPeople({ __example: departments["Все"] }))
				return () => {
					// eslint-disable-next-line react-hooks/exhaustive-deps
					isNeedUpdate = false;
				};
			}
		}, []);

  return (
    <main>
      {loadingStatus.state === "failed" && <LoadingError />}

      <Cards>
        {loadingStatus.state === "loading" && (
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

        {loadingStatus.state === "idle" &&
          loadingStatus.people.length > 0 &&
          loadingStatus.people.map((person: PersonType) => (
            <IdleCard key={person.id} person={person} />
          ))}
      </Cards>
    </main>
  );
};

export default CardsList;
