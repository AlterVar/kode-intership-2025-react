import styled from "styled-components";

import type { PersonType } from "../../../types/PersonType";
import { JSX } from "react";

type propsType = {
  person: PersonType;
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

const IdleCard = ({ person }: propsType): JSX.Element => {
  return (
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
    </Card>
  );
};

export default IdleCard;
