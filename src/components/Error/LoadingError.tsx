import styled from "styled-components";

import ufo from "../../assets/images/requestError_ufo.png";
import { departments } from "../../types/RequestParamsType";
import { fetchPeople } from "../../app/features/peopleSlice";
import { useAppDispatch } from "../../app/hooks";
import { MouseEvent } from "react";
import { Searching } from "./SearchError";

export const Loading = styled(Searching)`
  .content {
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