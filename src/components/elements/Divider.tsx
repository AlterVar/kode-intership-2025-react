import { JSX } from "react";
import styled from "styled-components";

const Conteiner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  hr {
    width: 100%;
    margin: 24px;
    border-top: 1px solid ${(props) => props.theme.bgTertiary};
    border-radius: 1px;
  }
  p {
    font-family: "InterMedium", sans-serif;
    font-size: 1.5rem;
    color: ${(props) => props.theme.textTertiary};
  }
`;

const Divider = (): JSX.Element => {
	const getYear = () => {
    return new Date().getFullYear() + 1;
  };

  return (
    <Conteiner>
      <hr />
      <p>{getYear()}</p>
      <hr />
    </Conteiner>
  );
};

export default Divider;
