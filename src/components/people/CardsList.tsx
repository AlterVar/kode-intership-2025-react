import { JSX, useEffect } from "react";
import styled from "styled-components";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchPeople, PeopleStateType } from "../../app/features/peopleSlice";
import { searchStateType } from "../../app/features/searchSlice";

import type { PersonType } from "../../types/personType";
import { SortingType } from "../../types/sortingType";

import ErrorScreen from "../errors/ErrorScreen";
import Card from "./cards/Card";
import Divider from "../elements/Divider";

const List = styled.ul`
	padding: 10px 16px;
`

const CardsList = (): JSX.Element => {
  const peopleState: PeopleStateType = useAppSelector((state) => state.people);
  const searchState: searchStateType = useAppSelector((state) => state.search);

  const dispatch = useAppDispatch();
  let dividerIsRendered = false;

  useEffect(() => {
    dispatch(fetchPeople({ params: peopleState.filter }));
    //*Uncomment to see the error screen on reload or on filter change
    //*dispatch(fetchPeople({params: { __code: "500" }}));
  }, [dispatch, peopleState.filter]);

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
  <Card type="loading" />;

  if (peopleState.state === "failed") return <ErrorScreen type="loading" />;

  if (searchState.active && peopleState.people.length === 0)
    return <ErrorScreen type="search" />;

  if (peopleState.state === "loading")
    return (
      <main>
        <List>
					{Array.from({ length: 8 }, (_, index) => (
            <Card key={index} type="loading" />
          ))}
        </List>
      </main>
    );

  if (peopleState.state === "idle" && peopleState.people.length === 0)
    return <ErrorScreen type="empty result" />;

  return (
    <main>
      <List>
        {peopleState.people.map((person: PersonType) => {
          if (
            peopleState.sorting === SortingType.birthday &&
            !checkYear(person) &&
            !dividerIsRendered
          ) {
            dividerIsRendered = true;
            return (
              <>
                <Divider />
                <Card key={person.id} person={person} type="idle" />
              </>
            );
          }
          return <Card key={person.id} person={person} type="idle" />;
        })}
      </List>
    </main>
  );
};

export default CardsList;
