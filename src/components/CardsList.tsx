import styled from "styled-components";

import { RefObject, useEffect, useRef, useState} from "react";
import axios, { AxiosError, AxiosResponse } from "axios";

import { PersonType } from "../types/PersonType";

const Cards = styled.ul`
  display: flex;
  flex-direction: column;
`;

const Card = styled.li`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
  padding: 6px 0;

  cursor: pointer;
`;

const Name = styled.h3`
  font-family: "InterMedium", sans-serif;
  font-size: 1.6rem;
  color: #050510;

  margin-bottom: 5px;

  span {
    font-size: 1.4rem;
    color: #97979b;
  }
`;

const Profession = styled.p`
  font-family: "InterRegular", sans-serif;
  font-size: 1.3rem;
  color: #55555c;
`;

const CardsList = () => {
	const people: RefObject<PersonType[] | null> = useRef(null);
	let isNeedUpdate = true;
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (isNeedUpdate && people.current === null) {
      axios
        .get(
          "https://stoplight.io/mocks/kode-frontend-team/koder-stoplight/86566464/users?__example=all"
        )
        .then(function (response: AxiosResponse) {
          //обновляем стейт данных, стейт загрузки и перерисовываем данные
          people.current = response.data.items;
          setLoading(false);
        })
        .catch(function (error: AxiosError) {
          //обновляем стейт и выводим экран ошибки
          console.log(error);
        });
    }
		return () => { isNeedUpdate = false };
  }, []);

	return (
    <main>
      <Cards>
        {!loading &&
          people.current?.map((person: PersonType) => (
            <Card key={person.id}>
              <div className="image-conteiner">
                <img src={person.avatarUrl} alt="avatar" />
              </div>
              <div className="content">
                <Name>
                  {person.firstName + " " + person.lastName}{" "}
                  <span>{person.userTag}</span>
                </Name>
                <Profession>{person.position}</Profession>
              </div>
            </Card>
          ))}
      </Cards>
    </main>
  );
};

export default CardsList;
