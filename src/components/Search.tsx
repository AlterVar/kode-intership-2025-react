import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import { TbListTree } from "react-icons/tb";

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

const FilterIcon = styled.div`
  position: absolute;
  top: 8px;
  right: 12px;
  cursor: pointer;

  svg {
    stroke: #c3c3c6;
    width: 24px;
    height: 24px;
  }
`;

const Search = () => {
  return (
    <div>
      <H2>Поиск</H2>
      <div style={{ position: "relative" }}>
        <SearchIcon><FiSearch /></SearchIcon> 
        <SeachInput type="text" placeholder="Введи имя, тег, почту..." />
        <FilterIcon><TbListTree /></FilterIcon>
      </div>
    </div>
  );
};

export default Search;
