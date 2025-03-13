import styled from "styled-components";
import { JSX, RefObject, useEffect, useRef } from "react";
import axios, { AxiosResponse } from "axios";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  loadingStatusType,
  showError,
  showPeople,
} from "../app/features/loadingSlice";

import ufo from "../assets/images/requestError_ufo.png";

import type { PersonType } from "../types/PersonType";

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

  .image-container {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: linear-gradient(90deg, #f3f3f6 0%, #fafafa 100%);
    background-position: center;
    background-repeat: no-repeat;
  }

  .content {
    &.loading .title {
      background: linear-gradient(90deg, #f3f3f6 0%, #fafafa 100%);
      border-radius: 50px;
      width: 144px;
      height: 16px;
      margin-bottom: 6px;
    }
    &.loading .description {
      background: linear-gradient(90deg, #f3f3f6 0%, #fafafa 100%);
      border-radius: 50px;
      width: 80px;
      height: 12px;
    }
  }
`;

const LoadingError = styled.div`
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

const CardsList = (): JSX.Element => {
  const loadingStatus: loadingStatusType = useAppSelector(
    (state) => state.loading
  );
  const dispatch = useAppDispatch();

  const people: RefObject<PersonType[] | null> = useRef(null);
  let isNeedUpdate = true;

  useEffect(() => {
    if (isNeedUpdate && people.current === null) {
      axios
        .get(
          "https://stoplight.io/mocks/kode-frontend-team/koder-stoplight/86566464/users?__example=all"
        )
        .then(function (response: AxiosResponse) {
          people.current = response.data.items;
          dispatch(showPeople());
        })
        .catch(function () {
          dispatch(showError());
        });
    }
    return () => {
      isNeedUpdate = false;
    };
	}, []);

  return (
    <main>
      {loadingStatus.value === "failed" && (
        <LoadingError>
          <div className="image-container failed">
            <img src={ufo} alt="UFO" />
          </div>
          <div className="content failed">
            <h2 className="title">Какой-то сверхразум все сломал</h2>
            <p className="description">Постараемся быстро починить</p>
            <button className="try-again">Попробовать снова</button>
          </div>
        </LoadingError>
      )}
      <Cards>
        {loadingStatus.value === "loading" && (
          <div>
            <Card>
              <div className="image-container loading"></div>
              <div className="content loading">
                <h3 className="title"></h3>
                <p className="description"></p>
              </div>
            </Card>
            <Card>
              <div className="image-container loading"></div>
              <div className="content loading">
                <h3 className="title"></h3>
                <p className="description"></p>
              </div>
            </Card>
            <Card>
              <div className="image-container loading"></div>
              <div className="content loading">
                <h3 className="title"></h3>
                <p className="description"></p>
              </div>
            </Card>
            <Card>
              <div className="image-container loading"></div>
              <div className="content loading">
                <h3 className="title"></h3>
                <p className="description"></p>
              </div>
            </Card>
            <Card>
              <div className="image-container loading"></div>
              <div className="content loading">
                <h3 className="title"></h3>
                <p className="description"></p>
              </div>
            </Card>
            <Card>
              <div className="image-container loading"></div>
              <div className="content loading">
                <h3 className="title"></h3>
                <p className="description"></p>
              </div>
            </Card>
            <Card>
              <div className="image-container loading"></div>
              <div className="content loading">
                <h3 className="title"></h3>
                <p className="description"></p>
              </div>
            </Card>
            <Card>
              <div className="image-container loading"></div>
              <div className="content loading">
                <h3 className="title"></h3>
                <p className="description"></p>
              </div>
            </Card>
          </div>
        )}

        {loadingStatus.value === "idle" &&
          people.current?.map((person: PersonType) => (
            <Card key={person.id}>
              <div className="image-container">
                <img
                  src={person.avatarUrl}
                  alt="avatar"
                />
              </div>
              <div className="content">
                <Name>
                  {person.firstName + " " + person.lastName}
                  <span>{" " + person.userTag}</span>
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
