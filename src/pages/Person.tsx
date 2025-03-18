import { JSX, useEffect } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchPeople } from "../app/features/peopleSlice";

import { IoIosArrowBack } from "react-icons/io";
import { FaRegStar } from "react-icons/fa6";
import { LuPhone } from "react-icons/lu";

import { FilterType } from "../types/requestParamsType";

import ErrorScreen from "../components/errors/ErrorScreen";

const Container = styled.section`
  min-height: 100vh;
  max-width: 1280px;
  margin: 0 auto;
  box-shadow: 0 0 50px 10px #f5f5f6;
`;

const Header = styled.header`
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  background-color: #f7f7f8;

  a {
    display: block;
    align-self: flex-start;
    width: 24px;
    height: 24px;

    svg {
      fill: #050510;
      width: 18px;
      height: 16px;
    }
  }

  .image-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 104px;
    height: 104px;
    background-color: #f7f7f8;

    img {
      border-radius: 50%;
      width: 100%;
      height: 100%;
    }
  }

  .content {
    text-align: center;
    h2 {
      font-family: "InterBold", sans-serif;
      font-size: 2.4rem;
      color: #050510;
      padding: 12px 0;

      span {
        font-family: "InterRegular", sans-serif;
        font-size: 1.7rem;
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

const Main = styled.main`
  padding: 26px 16px;
  background-color: #fff;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 13px 0;

  font-family: "InterMedium", sans-serif;
  font-size: 1.6rem;

  div {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 85%;
      height: 85%;
      stroke: #050510;
    }
  }

  a {
    text-decoration: none;
  }

  .description {
    color: #050510;
  }
`;

const Age = styled.p`
  margin-left: auto;
  color: #97979b;
`;

const PersonPage = (): JSX.Element | null => {
  const params = useParams();
  const id = params.id;
  const peopleState = useAppSelector((state) => state.people);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (peopleState.people.length === 0) {
      /* dispatch(fetchPeople({ __code: "500" })); */
      dispatch(fetchPeople({ __example: FilterType["Все"] }));
    }
  }, [dispatch, peopleState.people.length]);

  if (peopleState.state === "idle") {
    const person = peopleState.people.filter((person) => person.id === id)[0];
    const birthday = new Date(person.birthday);

    const getFormattedAge = () => {
      const today = new Date();
      let age = today.getFullYear() - birthday.getFullYear();
      let result = age.toString();

      if (
        today.getMonth() < birthday.getMonth() ||
        (today.getMonth() === birthday.getMonth() &&
          today.getDate() < birthday.getDate())
      ) {
        age--;
      }

      if (age % 10 === 1) {
        result = age + " год";
      } else if (age % 10 < 5) {
        result = age + " года";
      } else {
        result = age + " лет";
      }

      return result;
    };

    const formatBirthday = () => {
      return birthday
        .toLocaleString("ru-RU", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
        .slice(0, -2);
    };

    const formatPhone = () => {
      const phone = person.phone;
      //+7 (900) 900 90 09
      return (
        phone.slice(0, 2) +
        " (" +
        phone.slice(2, 5) +
        ") " +
        phone.slice(5, 8) +
        " " +
        phone.slice(8, 10) +
        " " +
        phone.slice(10)
      );
    };

    return (
      <Container>
        <Header>
          <Link to="/">
            <IoIosArrowBack />
          </Link>
          <div className="image-container">
            <img src={person.avatarUrl} alt="avatar" />
          </div>
          <div className="content">
            <h2 className="person-name">
              {person.firstName + " " + person.lastName}
              <span>{" " + person.userTag}</span>
            </h2>
            <p>{person.department}</p>
          </div>
        </Header>
        <Main>
          <Info>
            <div>
              <FaRegStar />
            </div>
            <p className="description">{formatBirthday()}</p>
            <Age>{getFormattedAge()}</Age>
          </Info>
          <Info>
            <div>
              <LuPhone />
            </div>
            <a href={"tel:" + person.phone} className="description">
              {formatPhone()}
            </a>
          </Info>
        </Main>
      </Container>
    );
  }

  if (peopleState.state === "failed")
    return (
      <div className="container">
        <ErrorScreen type="person" />
      </div>
    );

  return null;
};

export default PersonPage;
