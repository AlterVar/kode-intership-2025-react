import styled from "styled-components";
import { MouseEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchPeople } from "../../app/features/peopleSlice";

import ufo from "../../assets/images/requestError_ufo.png";
import magnifier from "../../assets/images/searchError_magnifier.svg";

type propsType = { type: errorType };
type errorType = "loading" | "search" | "person" | "empty result";

type contentType = {
  image: string;
  title: string;
  description: string;
  button?: string;
};

const errorState: Record<errorType, contentType> = {
  loading: {
    image: ufo,
    title: "Какой-то сверхразум все сломал",
    description: "Постараемся быстро починить",
    button: "Попробовать снова",
  },
  search: {
    image: magnifier,
    title: "Мы никого не нашли",
    description: "Попробуй скорректировать запрос",
  },
  person: {
    image: magnifier,
    title: "Кажется, такого человека не существует",
    description: "Возможно, он потерялся",
    button: "Попробовать найти снова",
  },
  "empty result": {
    image: magnifier,
    title: "Здесь пока никого",
    description: "Добавьте сотрудников, чтобы мы могли кого-нибудь найти",
  },
};

const Error = styled.main<{ $image: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;

  height: 100%;

  .image-container {
    width: 56px;
    height: 56px;
    background: url(${(props) => props.$image});
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;

    .title {
      font-family: "InterBold", sans-serif;
      font-size: 1.7rem;
      color: ${(props) => props.theme.textPrimary};
    }

    .description {
      font-family: "InterRegular", sans-serif;
      font-size: 1.6rem;
      color: ${(props) => props.theme.textSecondary};
    }

    .try-again {
      font-family: "InterSemiBold", sans-serif;
      font-size: 1.6rem;
      color: ${(props) => props.theme.highlight};
      background-color: transparent;
      outline: none;
      border: none;
      cursor: pointer;
    }
  }
`;

const ErrorScreen = (props: propsType) => {
  const state = errorState[props.type];
	const image = state.image;
	const peopleState = useAppSelector((state) => state.people);
  const dispatch = useAppDispatch();

  const reloadPeople = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(fetchPeople(peopleState.filter,));
  };

  return (
    <Error $image={image}>
      <div className="image-container"></div>
      <div className="content">
        <h2 className="title">{state.title}</h2>
        <p className="description">{state.description}</p>
        {state.button && (
          <button className="try-again" onClick={reloadPeople}>
            {state.button}
          </button>
        )}
      </div>
    </Error>
  );
};

export default ErrorScreen;
