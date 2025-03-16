import { JSX } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { FaRegStar } from "react-icons/fa6";
import { LuPhone } from "react-icons/lu";
import styled from "styled-components";
import { Link, useParams } from "react-router";
import { useAppSelector } from "../app/hooks";

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
    border-radius: 50%;
    background-color: #f7f7f8;

    img {
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

const PersonPage = (): JSX.Element => {
	const params = useParams();
	const id = params.id;
	const peopleState = useAppSelector((state) => state.people);
	const person = peopleState.people.filter(person => person.id === id)[0];
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
	}

	const formatBirthday = () => {
		return birthday.toLocaleString("ru-RU", {
			day: "numeric",
			month: "long",
			year: "numeric",
		}).slice(0, -2);
	}

	const formatPhone = () => {
		const phone = person.phone;
		//+7 (900) 900 90 09
		return phone.slice(0, 2) + " (" + phone.slice(2, 5) + ") " + phone.slice(5, 8) + " " + phone.slice(8, 10) + " " + phone.slice(10);
	}

  return (
    <section>
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
    </section>
  );
};

export default PersonPage;
