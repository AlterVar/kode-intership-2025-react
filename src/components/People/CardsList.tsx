import styled from "styled-components";
import { JSX, RefObject } from "react";

import { useAppSelector, /* useAppDispatch */ } from "../../app/hooks";
import { loadingStatusType } from "../../app/features/loadingSlice";

import IdleCard from "./Cards/IdleCard";
import LoadingCard from "./Cards/LoadingCard";
import LoadingError from "../Error/LoadingError";

import type { PersonType } from "../../types/PersonType";
import useAxios from "../../utils/requestUtil";
import { departments } from "../../types/requestParamsType";

const Cards = styled.ul`
  display: flex;
  flex-direction: column;
`;

const CardsList = (): JSX.Element => {
  const loadingStatus: loadingStatusType = useAppSelector(
    (state) => state.loading
  );

    const people: RefObject<PersonType[] | null> = useAxios({
      __example: departments["Все"],
    });

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
