import { FormEvent, JSX } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { openModal } from "../app/features/modalSlice";
import { active, disabled } from "../app/features/searchSlice";
import { setSearchText, searchPeople } from "../app/features/peopleSlice";

import { FiSearch } from "react-icons/fi";
import { TbListTree } from "react-icons/tb";

import Toggle from "./elements/Toggle";

import { SortingType } from "../types/sortingType";

const Container = styled.div`
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      font-family: "InterBold", sans-serif;
      font-size: 2.4rem;
      color: ${(props) => props.theme.textPrimary};
      margin-bottom: 18px;
      margin-left: 8px;
    }
  }

  .input-container {
    position: relative;
  }
`;

const SeachInput = styled.input`
  width: 100%;
  padding: 12px;
  padding-left: 45px;
  border-radius: 16px;
  font-family: "InterRegular", sans-serif;
  color: ${(props) => props.theme.textPrimary};
  font-size: 1.5rem;
  line-height: 1.1;
  background-color: ${(props) => props.theme.bgSecondary};
  caret-color: ${(props) => props.theme.highlight};
  box-sizing: border-box;
  outline: none;
  border: none;

  &::placeholder {
    color: ${(props) => props.theme.textTertiary};
    font-family: "InterMedium", sans-serif;
  }
`;

const SearchIcon = styled.div<{ $active?: boolean }>`
  position: absolute;
  top: 8px;
  left: 12px;

  svg {
    stroke: ${(props) =>
      props.$active
        ? `${props.theme.textPrimary}`
        : `${props.theme.textTertiary}`};
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
    stroke: ${(props) =>
      props.$birthdaySort
        ? `${props.theme.highlight}`
        : `${props.theme.textTertiary}`};
    width: 24px;
    height: 24px;
  }
`;

const Search = (): JSX.Element => {
  const modalState = useAppSelector((state) => state.people.sorting);
  const searchState = useAppSelector((state) => state.search);
  const peopleState = useAppSelector((state) => state.people);

  const dispatch = useAppDispatch();

  const blur = (e: FocusEvent | FormEvent) => {
    e.preventDefault();
    if (peopleState.search.length === 0 && peopleState.people.length === 0) {
      dispatch(setSearchText(" "));
      dispatch(searchPeople());
      dispatch(setSearchText(""));
    }
    if (peopleState.search.length > 0) {
      dispatch(searchPeople());
      return;
    }
    dispatch(disabled());
  };

  const showModal = () => {
    dispatch(openModal());
  };

  return (
    <Container>
      <div className="header">
        <h2 className="title">Поиск</h2>
        <Toggle />
      </div>
      <div className="input-container">
        {searchState.active ? (
          <SearchIcon $active>
            <FiSearch />
          </SearchIcon>
        ) : (
          <SearchIcon>
            <FiSearch />
          </SearchIcon>
        )}
        <form onSubmit={blur}>
          <SeachInput
            type="text"
            placeholder="Введи имя, тег, почту..."
            value={searchState.active ? peopleState.search : ""}
            onChange={(e) => dispatch(setSearchText(e.target.value))}
            onFocus={() => dispatch(active())}
            onBlur={blur}
          />
        </form>
        {modalState === SortingType.birthday ? (
          <SortIcon onClick={showModal} $birthdaySort>
            <TbListTree />
          </SortIcon>
        ) : (
          <SortIcon onClick={showModal}>
            <TbListTree />
          </SortIcon>
        )}
      </div>
    </Container>
  );
};

export default Search;
