import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
	flex-wrap: wrap;
	position: relative;
	
	&::after {
		content: "";
		position: absolute;
		left: -16px;
		bottom: 0;
		width: calc(100% + 32px);
		border-bottom: 1px solid #c3c3c6;
	}
`;

const Button = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  padding: 8px 12px;
  box-sizing: border-box;
	cursor: pointer;

  font-family: "InterMedium", sans-serif;
  font-size: 1.5rem;
  color: #97979b;
`;
const ActiveButton = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  padding: 8px 12px;
  box-sizing: border-box;
	cursor: pointer;

	border-bottom: 2px solid #6534ff;
  font-family: "InterSemiBold", sans-serif;
	font-size: 1.5rem;
  color: #050510;
`;

const Pagination = () => {
  return (
    <Container>
      <ActiveButton>Все</ActiveButton>
      <Button>Designers</Button>
      <Button>Analysts</Button>
			<Button>Android</Button>
      <Button>iOS</Button>
			<Button>Managers</Button>
    </Container>
  );
};

export default Pagination;
