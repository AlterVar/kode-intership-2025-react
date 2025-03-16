import { JSX } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { FaRegStar } from "react-icons/fa6";
import { LuPhone } from "react-icons/lu";
import styled from "styled-components";

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
  return (
    <section>
      <Header>
        <a href="#">
          <IoIosArrowBack />
        </a>
        <div className="image-container">
          <img src="" alt="avatar" />
        </div>
        <div className="content">
          <h2 className="person-name">
            Алиса Иванова<span> al</span>
          </h2>
          <p>profession</p>
        </div>
      </Header>
      <Main>
        <Info>
          <div>
            <FaRegStar />
          </div>
          <p className="description">birthday</p>
          <Age>age</Age>
        </Info>
        <Info>
          <div>
            <LuPhone />
          </div>
          <a href="tel:79999009090" className="description">
            +7 (999) 900 90 90
          </a>
        </Info>
      </Main>
    </section>
  );
};

export default PersonPage;
