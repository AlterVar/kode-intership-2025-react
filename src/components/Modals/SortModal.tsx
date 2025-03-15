import { MouseEvent, RefObject, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { IoClose } from "react-icons/io5";

const Container = styled.dialog`
  width: 373px;
  padding: 20px 23px 8px 17px;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 20px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: none;
  z-index: 15;

  &::backdrop {
    background-color: rgba(5, 5, 16, 0.16);
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Header = styled.div`
  display: flex;
  justify-content: end;

  h2 {
    font-family: "InterSemiBold", sans-serif;
    font-size: 2rem;
    color: #050510;
    text-align: center;
    flex-grow: 1;
  }

  button {
    flex-shrink: 0;
    background-color: #f7f7f8;
    width: 24px;
    height: 24px;

    border: none;
    outline: none;
    border-radius: 50%;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    svg {
      fill: #c3c3c6;
      width: 16px;
      height: 16px;
    }
  }
`;

const InputContainer = styled.label`
  padding: 19px 0;
  display: flex;
  align-items: center;
  gap: 13px;

  font-family: "InterMedium", sans-serif;
  color: #050510;
  font-size: 1.6rem;

  cursor: pointer;

  input {
    display: none;

    &:checked + span {
      border-width: 8px;
    }
  }
`;

const CustomRadio = styled.span`
  display: inline-block;
  width: 23px;
  height: 23px;
  border-radius: 50%;
  border: 3px solid #6534ff;
  box-sizing: border-box;
`;

const SortModal = () => {
  const dialog: RefObject<HTMLDialogElement | null> = useRef(null);
  const chosenRadio: RefObject<HTMLInputElement | null> = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dialog.current?.showModal();
  }, [isOpen]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const closeModalUsingBackdrop = (event: MouseEvent) => {
    if (event.target === dialog.current) {
      event.stopPropagation();
      setIsOpen(false);
    }
  };

  return (
    <div>
      <button onClick={openModal}>Show</button>
      {isOpen && (
        <Container ref={dialog} onClick={closeModalUsingBackdrop}>
          <Content>
            <Header>
              <h2>Сортировка</h2>
              <button onClick={closeModal}>
                <IoClose />
              </button>
            </Header>
            <div>
              <InputContainer>
                <input
                  type="radio"
                  name="people"
                  value="alphabetic"
                  ref={chosenRadio}
                />
                <CustomRadio />
                По алфавиту
              </InputContainer>
              <InputContainer>
                <input
                  type="radio"
                  name="people"
                  value="birthday"
                  ref={chosenRadio}
                />
                <CustomRadio />
                По дню рождения
              </InputContainer>
            </div>
          </Content>
        </Container>
      )}
    </div>
  );
};

export default SortModal;
