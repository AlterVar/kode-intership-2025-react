import styled from "styled-components";
import magnifier from "../../assets/images/searchError_magnifier.svg"

export const Searching = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;

  height: 100%;

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;

    .title {
      font-family: "InterBold", sans-serif;
      font-size: 1.7rem;
      color: #050510;
    }

    .description {
      font-family: "InterRegular", sans-serif;
      font-size: 1.6rem;
      color: #97979b;
    }
  }
`;

const SearchError = () => {
	return (
    <Searching>
      <div className="image-container">
        <img src={magnifier} alt="Magnifier" />
      </div>
      <div className="content">
        <h2 className="title">Мы никого не нашли</h2>
        <p className="description">Попробуй скорректировать запрос</p>
      </div>
    </Searching>
  );
}

export default SearchError