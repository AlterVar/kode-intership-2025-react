import { JSX, useEffect } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchPeople } from "../app/features/peopleSlice";

import { IoIosArrowBack } from "react-icons/io";
import { FaRegStar } from "react-icons/fa6";
import { LuPhone } from "react-icons/lu";

import ErrorScreen from "../components/errors/ErrorScreen";
import { t } from "i18next";

const Container = styled.section`
  min-height: 100vh;
  max-width: 1280px;
  margin: 0 auto;
  box-shadow: 0 0 50px 10px ${props => props.theme.bgSecondary};
`;

const Header = styled.header`
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  background-color: ${(props) => props.theme.bgSecondary};

  a {
    display: block;
    align-self: flex-start;
    width: 24px;
    height: 24px;

    svg {
      fill: ${(props) => props.theme.textPrimary};
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
    background-color: ${(props) => props.theme.bgSecondary};

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
      color: ${(props) => props.theme.textPrimary};
      padding: 12px 0;

      span {
        font-family: "InterRegular", sans-serif;
        font-size: 1.7rem;
        color: ${(props) => props.theme.textSecondary};
      }
    }

    p {
      font-family: "InterRegular", sans-serif;
      font-size: 1.3rem;
      color: ${(props) => props.theme.textAdditional};
    }
  }
`;

const Main = styled.main`
  padding: 26px 16px;
  background-color: ${(props) => props.theme.bgPrimary};
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
      stroke: ${(props) => props.theme.textPrimary};
    }
  }

  a {
    text-decoration: none;
  }

  .description {
    color: ${(props) => props.theme.textPrimary};
  }
`;

const Age = styled.p`
  margin-left: auto;
  color: ${(props) => props.theme.textSecondary};
`;

const PersonPage = (): JSX.Element | null => {
  const params = useParams();
  const id = params.id;
	const peopleState = useAppSelector((state) => state.people);
	const language = useAppSelector((state) => state.config.language);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (peopleState.people.length === 0) {
      /* dispatch(fetchPeople({params: { __code: "500" }})); */
      dispatch(fetchPeople({ params: { __example: "all"} }));
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
        result = age + " " + t("date.singular");
      } else if (age % 10 < 5 && language.includes("ru")) {
        result = age + " года";
      } else {
        result = age + " " + t('date.plural');
      }

      return result;
    };

		const formatBirthday = () => {
			const formattedBirthday = birthday.toLocaleString(language, {
        day: "numeric",
        month: "long",
        year: "numeric",
			});
			if (language.includes("ru")) {
				return formattedBirthday.slice(0, -3);
			}
			return formattedBirthday;
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
