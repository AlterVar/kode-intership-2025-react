import styled from "styled-components";
import { MouseEvent } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchPeople, setFilter, setSearchText } from "../app/features/peopleSlice";
import RequestParamsType, { departments } from "../types/RequestParamsType";
import { disabled } from "../app/features/searchSlice";

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
    border-bottom: 1px solid #c3c3c6;
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
  color: ${(props) => (props.$active ? "#050510" : "#97979b")};
`;

type departmentsType = keyof typeof departments;

const Pagination = () => {
	const filterState: RequestParamsType = useAppSelector(state => state.people.filter);
	const dispatch = useAppDispatch();
	const departmentsValues = Object.entries(departments);

  const loadDepartment = (e: MouseEvent) => {
		e.preventDefault();
		const filterDepartment = e.currentTarget.innerHTML as departmentsType;
		dispatch(setSearchText(""));
		dispatch(disabled());
		dispatch(setFilter({ __example: departments[filterDepartment] }));
		dispatch(fetchPeople({ __example: departments[filterDepartment] }));
	};

  return (
    <Container>
      {departmentsValues.map((item: [string, departments], index: number) => {
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

export default Pagination;
