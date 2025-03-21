import styled from "styled-components";
import { MouseEvent } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  setFilter,
  setSearchText,
} from "../app/features/peopleSlice";
import { disabled } from "../app/features/searchSlice";

import { FilterType } from "../types/requestParamsType";

type departmentsType = keyof typeof FilterType;

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
  const departmentsValues = Object.entries(FilterType);

  const loadDepartment = (e: MouseEvent) => {
    e.preventDefault();
    const filterDepartment = e.currentTarget.innerHTML;
    if (filterDepartment in FilterType) {
      dispatch(setSearchText(""));
      dispatch(disabled());
      dispatch(
        setFilter({
          __example: FilterType[filterDepartment as departmentsType],
        })
      );
    }
  };

  return (
    <Container>
      {departmentsValues.map((item: [string, FilterType], index: number) => {
        return (
          <Button
            key={index}
            $active={item[1] === peopleState.filter.__example}
            onClick={loadDepartment}
            disabled={peopleState.state === "loading"}
          >
            {item[0]}
          </Button>
        );
      })}
    </Container>
  );
};

export default Filter;
