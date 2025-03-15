import { MouseEvent, RefObject, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import styled from "styled-components";

import { IoClose } from "react-icons/io5";
import { closeModal } from "../../app/features/modalSlice";
import { changeSorting } from "../../app/features/peopleSlice"; 

import { sortingType } from "../../types/SortingType";

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
    cursor: pointer;
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
  const chosenRadio: RefObject<EventTarget | null> = useRef(null);
  const modalState = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (+modalState.isOpen === 1) {
      dialog.current?.showModal();
    } else {
      dialog.current?.close();
    }
  }, [modalState.isOpen]);

  const hideModal = (event: MouseEvent) => {
    event.stopPropagation();
    dispatch(closeModal());
  };

  const hideModalUsingBackdrop = (event: MouseEvent) => {
    if (event.target === dialog.current) {
      event.stopPropagation();
      dispatch(closeModal());
    }
  };

  const chooseSort = (e: MouseEvent) => {
    if (chosenRadio.current !== e.target) {
      chosenRadio.current = e.target;
      const value = e.currentTarget.getAttribute("value");
      dispatch(changeSorting(value));
		}
		dispatch(closeModal());
  };

  return (
    <div className={modalState.isOpen ? "modalOpen" : "modalClose"}>
      <Container ref={dialog} onClick={hideModalUsingBackdrop}>
        <Content>
          <Header>
            <h2>Сортировка</h2>
            <button onClick={hideModal}>
              <IoClose />
            </button>
          </Header>
          <div>
            <InputContainer>
              <input
                type="radio"
                name="people"
                value={sortingType.alphabetic}
                onClick={chooseSort}
                defaultChecked
              />
              <CustomRadio />
              По алфавиту
            </InputContainer>
            <InputContainer>
              <input
                type="radio"
                name="people"
                value={sortingType.birthday}
                onClick={chooseSort}
              />
              <CustomRadio />
              По дню рождения
            </InputContainer>
          </div>
        </Content>
      </Container>
    </div>
  );
};

export default SortModal;
