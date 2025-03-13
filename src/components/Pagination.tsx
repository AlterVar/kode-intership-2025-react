import styled from "styled-components";
import { MouseEvent, RefObject, useRef, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { fetchPeople } from "../app/features/peopleSlice";
import { departments } from "../types/RequestParamsType";

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
	const dispatch = useAppDispatch();
  const activeDepartment: RefObject<departmentsType> = useRef(
    Object.keys(departments)[0] as departmentsType
  );
  const [department, setDepartment] = useState(activeDepartment.current);

  const loadDepartment = (e: MouseEvent) => {
		e.preventDefault();
		const filterDepartment = e.currentTarget.innerHTML as departmentsType;
		dispatch(fetchPeople({ __example: departments[filterDepartment] }));
    setDepartment(filterDepartment);
  };

  return (
    <Container>
      {Object.keys(departments).map((item, index) => {
        if (item === department) {
          return (
            <Button key={index} $active>
              {item}
            </Button>
          );
        }
        return (
          <Button key={index} onClick={loadDepartment}>
            {item}
          </Button>
        );
      })}
    </Container>
  );
};

export default Pagination;
