import styled from "styled-components";
import { JSX } from "react";
import { Link } from "react-router";
import { useAppSelector } from "../../../app/hooks";
import {
  loadingState,
  PeopleStateType,
} from "../../../app/features/peopleSlice";

import goose from "../../../assets/images/goose.svg";

import type { PersonType } from "../../../types/personType";
import { SortingType } from "../../../types/sortingType";

type CardType = Exclude<loadingState, "failed">;

type propsType =
  | {
      type: Extract<CardType, "loading">;
      person?: PersonType;
    }
  | {
      type: Extract<CardType, "idle">;
      person: PersonType;
    };

const LoadingCard = styled.li`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
  padding: 6px 0;

  .image-container {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: linear-gradient(90deg, #f3f3f6 0%, #fafafa 100%);
  }

  .content {
    h3 {
      background: linear-gradient(90deg, #f3f3f6 0%, #fafafa 100%);
      border-radius: 50px;
      width: 144px;
      height: 16px;

      margin-bottom: 6px;
    }

    p {
      background: linear-gradient(90deg, #f3f3f6 0%, #fafafa 100%);
      border-radius: 50px;
      width: 80px;
      height: 12px;
    }
  }
`;

const IdleCard = styled.li`
  padding: 6px 0;
  list-style: none;

  a {
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 16px;
    padding: 6px 0;
    cursor: pointer;
  }

  .image-container {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 72px;
    height: 72px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      text-decoration: none;
      color: ${(props) => props.theme.textPrimary};
    }
  }

  .content {
    .person-name {
      font-family: "InterMedium", sans-serif;
      font-size: 1.6rem;
      color: ${(props) => props.theme.textPrimary};

      margin-bottom: 6px;

      .person-tag {
        font-size: 1.4rem;
        color: ${(props) => props.theme.textSecondary};
      }
    }

    .person-position {
      font-family: "InterRegular", sans-serif;
      font-size: 1.3rem;
      color: ${(props) => props.theme.textAdditional};
    }
  }
`;

const Birthday = styled.div`
  color: ${(props) => props.theme.textAdditional};
  font-family: "IntelRegular", sans-serif;
  font-size: 1.5rem;

  margin-left: auto;
`;

const Card = ({ person, type }: propsType): JSX.Element => {
  const peopleState: PeopleStateType = useAppSelector((state) => state.people);

  const getBirthday = () => {
    const birthday = new Date(person!.birthday);
    const month = birthday
      .toLocaleString("ru-RU", { month: "short" })
      .slice(0, 3);
    const day = birthday.getDate();
    return day + " " + month;
  };

  if (type === "loading") {
    return (
      <LoadingCard>
        <div className="image-container"></div>
        <div className="content">
          <h3></h3>
          <p></p>
        </div>
      </LoadingCard>
    );
  }

  return (
    <IdleCard>
      <Link to={person.id}>
        <div className="image-container">
          <img src={person.avatarUrl || goose} alt="avatar" />
        </div>
        <div className="content">
          <h3 className="person-name">
            {person.firstName + " " + person.lastName}
            <span className="person-tag">{" " + person.userTag}</span>
          </h3>
          <p className="person-position">{person.position}</p>
        </div>
        {person && peopleState.sorting === SortingType.birthday && (
          <Birthday>{getBirthday()}</Birthday>
        )}
      </Link>
    </IdleCard>
  );
};

export default Card;
