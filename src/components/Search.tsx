import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import { TbListTree } from "react-icons/tb";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { openModal } from "../app/features/sortingSlice";
import { sortingType } from "../types/SortingType";

const H2 = styled.h2`
  font-family: "InterBold", sans-serif;
  font-size: 2.4rem;
  color: #050510;
  margin-bottom: 18px;
	margin-left: 8px;
`;

const SeachInput = styled.input`
  width: 100%;
  padding: 12px;
  padding-left: 45px;
  border-radius: 16px;
	font-family: "InterRegular", sans-serif;
	color: #050510;
	font-size: 1.5rem;
	line-height: 1.1;
  background-color: #f7f7f8;
  box-sizing: border-box;
  outline: none;
  border: none;

  &::placeholder {
    color: #c3c3c6;
		font-family: "InterMedium", sans-serif;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  top: 8px;
  left: 12px;

	svg {
		stroke: #c3c3c6;
		width: 20px;
		height: 20px;
	}
`;

const SortIcon = styled.div<{ $birthdaySort?: boolean }>`
  position: absolute;
  top: 8px;
  right: 12px;
  cursor: pointer;

  svg {
    /* stroke: #c3c3c6; */
		stroke: ${(props) => (props.$birthdaySort ? "#6534ff" : "#c3c3c6")};
    width: 24px;
    height: 24px;
  }
`;

const Search = () => {
	const modalState = useAppSelector((state) => state.sorting.sortingType);
	const dispatch = useAppDispatch(); 

	const showModal = () => {
    dispatch(openModal());
  };

	return (
    <div>
      <H2>Поиск</H2>
      <div style={{ position: "relative" }}>
        <SearchIcon>
          <FiSearch />
        </SearchIcon>
        <SeachInput type="text" placeholder="Введи имя, тег, почту..." />
        {modalState === sortingType.birthday ? (
          <SortIcon onClick={showModal} $birthdaySort>
            <TbListTree />
          </SortIcon>
        ) : (
          <SortIcon onClick={showModal}>
            <TbListTree />
          </SortIcon>
        )}
      </div>
    </div>
  );
};

export default Search;
