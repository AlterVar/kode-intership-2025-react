import styled from "styled-components";
import { MouseEvent } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  setFilter,
  setSearchText,
} from "../app/features/peopleSlice";
import { disabled } from "../app/features/searchSlice";

import { Departments } from "../types/requestParamsType";
import { t } from "i18next";

type FilterType = Departments | "all";

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  position: relative;
  padding: 0 16px;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    border-bottom: 1px solid ${(props) => props.theme.bgTertiary};
  }
`;

const Button = styled.button<{ $active?: boolean }>`
  border: none;
  outline: none;
  background-color: transparent;
  padding: 8px 12px;
  box-sizing: border-box;
  cursor: pointer;

  border-bottom: ${(props) =>
    props.$active ? `2px solid ${props.theme.highlight}` : "none"};
  font-size: 1.5rem;
  font-family: ${(props) =>
    props.$active
      ? "'InterSemiBold', sans-serif"
      : "'InterMedium', sans-serif"};
  color: ${(props) =>
    props.$active
      ? `${props.theme.textPrimary}`
		: `${props.theme.textSecondary}`};
			
			&:disabled {
				opacity: 70%;
				cursor: default;
			}
`;

const Filter = () => {
  const peopleState = useAppSelector((state) => state.people);
  const dispatch = useAppDispatch();
	const filtersValues = Object.entries(t("filter"));

  const loadDepartment = (e: MouseEvent, index: number) => {
    e.preventDefault();
    const filterDepartment = e.currentTarget.innerHTML;
    if (filterDepartment as FilterType) {
      dispatch(setSearchText(""));
      dispatch(disabled());
      dispatch(
        setFilter({
          __example: filtersValues[index][0],
        })
      );
    }
  };

  return (
    <Container>
      {filtersValues.map((item: [string, string], index: number) => {
        return (
          <Button
            key={index}
            $active={item[0] === peopleState.filter.__example}
            onClick={(e: MouseEvent) => loadDepartment(e, index)}
            disabled={peopleState.state === "loading"}
          >
            {item[1]}
          </Button>
        );
      })}
    </Container>
  );
};

export default Filter;
