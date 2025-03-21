import { FormEvent, JSX, useEffect, useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { openModal } from "../app/features/modalSlice";
import { active, disabled } from "../app/features/searchSlice";
import {
  setSearchText,
  searchPeople,
  fetchPeople,
} from "../app/features/peopleSlice";

import { FiSearch } from "react-icons/fi";
import { TbListTree } from "react-icons/tb";

import Toggle from "./elements/Toggle";

import { SortingType } from "../types/sortingType";
import {
  setNetworkOffline,
  setNetworkOnline,
} from "../app/features/configSlice";

const Container = styled.div<{ $loading: boolean }>`
  padding: 16px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      font-family: "InterBold", sans-serif;
      font-size: 2.4rem;
      color: ${(props) => props.theme.textPrimary};
      padding: 0 8px 14px 8px;
    }
  }

  .input-container {
    position: relative;
  }

  &:has(p) {
    background-color: ${(props) =>
      props.$loading ? props.theme.bgLoading : props.theme.bgError};
    .header .title {
      color: ${(props) => props.theme.textStatus};
    }
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

const ConnectionStatus = styled.p`
  font-family: "InterMedium", sans-serif;
  font-size: 1.3rem;
  color: ${(props) => props.theme.textStatus};
  padding: 9px;
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
  const config = useAppSelector((state) => state.config);
  const [loading, setLoading] = useState(false);
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

	useEffect(() => {
		const handleOnline = async () => {
			dispatch(setNetworkOnline());
      setLoading(true);
			await dispatch(
        fetchPeople({ params: peopleState.filter, cache: { override: true } })
      );
      setLoading(false);
    };

		const handleOffline = () => dispatch(setNetworkOffline());
		
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [dispatch, peopleState.filter, config.networkStatus]);

  return (
    <Container $loading={loading}>
      <div className="header">
        <h2 className="title">Поиск</h2>
        <Toggle />
      </div>
      {loading && peopleState.state === "loading" && (
        <ConnectionStatus>Секундочку, гружусь...</ConnectionStatus>
      )}
      {config.networkStatus && !loading && (
        <div className="input-container">
            <SearchIcon $active={searchState.active}>
              <FiSearch />
            </SearchIcon>
          <form onSubmit={blur}>
            <SeachInput
              type="text"
              placeholder="Введи имя, тег, почту..."
              value={peopleState.search}
              onChange={(e) => dispatch(setSearchText(e.target.value))}
              onFocus={() => dispatch(active())}
							onBlur={blur}
							disabled={peopleState.state === "loading"}
            />
          </form>
          {modalState === SortingType.birthday ? (
            <SortIcon onClick={() => dispatch(openModal())} $birthdaySort>
              <TbListTree />
            </SortIcon>
          ) : (
            <SortIcon onClick={() => dispatch(openModal())}>
              <TbListTree />
            </SortIcon>
          )}
        </div>
      )}
      {!config.networkStatus && !loading && (
        <ConnectionStatus>
          Не могу обновить данные. Проверь соединение с интернетом.
        </ConnectionStatus>
      )}
    </Container>
  );
};

export default Search;
