import styled from "styled-components";

import first from "../assets/images/People/1.png";
import second from "../assets/images/People/2.png";

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
`

const Profession = styled.p`
	font-family: "InterRegular", sans-serif;
	font-size: 1.3rem;
	color: #55555c;
`

const CardsList = () => {
  return (
    <main>
      <Cards>
        <Card>
          <div className="image-conteiner">
            <img src={first} alt="" />
          </div>
          <div className="content">
            <Name>
              Алексей Миногаров <span>mi</span>
            </Name>
            <Profession>Analyst</Profession>
          </div>
        </Card>
        <Card>
          <div className="image-conteiner">
            <img src={second} alt="" />
          </div>
          <div className="content">
            <Name>
              Алиса Иванова <span>al</span>
            </Name>
            <Profession>Designer</Profession>
          </div>
        </Card>
      </Cards>
    </main>
  );
};

export default CardsList;
