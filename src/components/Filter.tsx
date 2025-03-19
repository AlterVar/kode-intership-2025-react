import styled from "styled-components";
import { MouseEvent } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  fetchPeople,
  setFilter,
  setSearchText,
} from "../app/features/peopleSlice";
import { disabled } from "../app/features/searchSlice";

import RequestParamsType, { FilterType } from "../types/requestParamsType";

type departmentsType = keyof typeof FilterType;

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    left: -16px;
    bottom: 0;
    width: calc(100% + 32px);
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

  border-bottom: ${(props) => (props.$active ? "2px solid #6534ff" : "none")};
  font-size: 1.5rem;
  font-family: ${(props) =>
    props.$active
      ? "'InterSemiBold', sans-serif"
      : "'InterMedium', sans-serif"};
  color: ${(props) =>
    props.$active
      ? `${props.theme.textPrimary}`
      : `${props.theme.textSecondary}`};
`;

const Filter = () => {
  const filterState: RequestParamsType = useAppSelector(
    (state) => state.people.filter
  );
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
      dispatch(
        fetchPeople({
          __example: FilterType[filterDepartment as departmentsType],
        })
      );
    }
  };

  return (
    <Container>
      {departmentsValues.map((item: [string, FilterType], index: number) => {
        if (item[1] === filterState.__example) {
          return (
            <Button key={index} $active onClick={loadDepartment}>
              {item[0]}
            </Button>
          );
        }
        return (
          <Button key={index} onClick={loadDepartment}>
            {item[0]}
          </Button>
        );
      })}
    </Container>
  );
};

export default Filter;
