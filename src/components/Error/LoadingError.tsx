import styled from "styled-components";

import ufo from "../../assets/images/requestError_ufo.png";
import { departments } from "../../types/RequestParamsType";
import { fetchPeople } from "../../app/features/peopleSlice";
import { useAppDispatch } from "../../app/hooks";
import { MouseEvent } from "react";

const Loading = styled.div`
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

    .try-again {
      font-family: "InterSemiBold", sans-serif;
      font-size: 1.6rem;
      color: #6534ff;
      background-color: transparent;
      outline: none;
      border: none;
      cursor: pointer;
    }
  }
`;

const LoadingError = () => {
	const dispatch = useAppDispatch();

	const reloadPeople = (e: MouseEvent) => {
			e.preventDefault();
			dispatch(fetchPeople({ __example: departments["Все"] }));
		};

  return (
    <Loading>
      <div className="image-container">
        <img src={ufo} alt="UFO" />
      </div>
      <div className="content">
        <h2 className="title">Какой-то сверхразум все сломал</h2>
        <p className="description">Постараемся быстро починить</p>
        <button className="try-again" onClick={reloadPeople}>
          Попробовать снова
        </button>
      </div>
    </Loading>
  );
};

export default LoadingError;