import styled from "styled-components";
import { JSX } from "react";

import type { PersonType } from "../../../types/PersonType";
import { useAppSelector } from "../../../app/hooks";
import { sortingType } from "../../../types/SortingType";

type propsType = {
  person: PersonType;
  divider: boolean;
};

const Card = styled.li`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
  padding: 6px 0;

  cursor: pointer;

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
    }
  }

  .content {
    h3 {
      font-family: "InterMedium", sans-serif;
      font-size: 1.6rem;
      color: #050510;

      margin-bottom: 6px;

      span {
        font-size: 1.4rem;
        color: #97979b;
      }
    }

    p {
      font-family: "InterRegular", sans-serif;
      font-size: 1.3rem;
      color: #55555c;
    }
  }
`;

const Birthday = styled.div`
  color: #55555c;
  font-family: "IntelRegular", sans-serif;
  font-size: 1.5rem;

  margin-left: auto;
`;

const Divider = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  hr {
		width: 100%;
    margin: 24px;
    border-top: 1px solid #c3c3c6;
    border-radius: 1px;
  }
  p {
    font-family: "InterMedium", sans-serif;
    font-size: 1.5rem;
    color: #c3c3c6;
  }
`;

const IdleCard = ({ person, divider }: propsType): JSX.Element => {
  const peopleState = useAppSelector((state) => state.people);
  const birthday = new Date(person.birthday);

  const getBirthday = () => {
    const month = birthday
      .toLocaleString("ru-RU", { month: "short" })
      .slice(0, 3);
    const day = birthday.getDate();
    return day + " " + month;
  };

  const getYear = () => {
    return birthday.getFullYear();
  };

  return (
    <>
      <Card>
        <div className="image-container">
          <img src={person.avatarUrl} alt="avatar" />
        </div>
        <div className="content">
          <h3>
            {person.firstName + " " + person.lastName}
            <span>{" " + person.userTag}</span>
          </h3>
          <p>{person.position}</p>
        </div>
        {peopleState.sorting === sortingType.birthday && (
          <Birthday>{getBirthday()}</Birthday>
        )}
      </Card>
      {peopleState.sorting === sortingType.birthday && divider && (
        <Divider>
          <hr />
          <p>{getYear()}</p>
          <hr />
        </Divider>
      )}
    </>
  );
};

export default IdleCard;
