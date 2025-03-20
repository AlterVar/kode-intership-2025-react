import { MouseEvent, RefObject, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import styled from "styled-components";
import { IoClose } from "react-icons/io5";

import { closeModal } from "../../app/features/modalSlice";
import { sortPeople } from "../../app/features/peopleSlice";

import { SortingType } from "../../types/sortingType";

const Dialog = styled.dialog`
  width: 373px;
  padding: 20px 23px 8px 17px;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.bgPrimary};
  border: none;
  border-radius: 20px;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  &::backdrop {
    background-color: ${(props) => props.theme.bgAdditional};
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

  .title {
    font-family: "InterSemiBold", sans-serif;
    font-size: 2rem;
    color: ${(props) => props.theme.textPrimary};
    text-align: center;
    flex-grow: 1;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    background-color: ${(props) => props.theme.bgSecondary};
    width: 24px;
    height: 24px;

    border: none;
    outline: none;
    border-radius: 50%;

    cursor: pointer;

    svg {
      fill: ${(props) => props.theme.bgTertiary};
      width: 16px;
      height: 16px;
    }
  }
`;

const RadioInput = styled.label`
  padding: 19px 0;
  display: flex;
  align-items: center;
  gap: 13px;

  font-family: "InterMedium", sans-serif;
  color: ${(props) => props.theme.textPrimary};
  font-size: 1.6rem;

  cursor: pointer;

  input {
    display: none;

    &:checked + span {
      border-width: 8px;
    }
  }

  span {
    display: inline-block;
    width: 23px;
    height: 23px;
    border-radius: 50%;
    border: 3px solid ${(props) => props.theme.highlight};
    box-sizing: border-box;
  }
`;

const SortModal = () => {
  const dialog: RefObject<HTMLDialogElement | null> = useRef(null);
  const peopleState = useAppSelector((state) => state.people);
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
    const value = e.currentTarget.getAttribute("value");
    if (peopleState.sorting !== value) {
      dispatch(sortPeople(value));
    }
    dispatch(closeModal());
  };

  return (
    <div className={modalState.isOpen ? "modalOpen" : "modalClose"}>
      <Dialog ref={dialog} onClick={hideModalUsingBackdrop}>
        <Content>
          <Header>
            <h2 className="title">Сортировка</h2>
            <button onClick={hideModal}>
              <IoClose />
            </button>
          </Header>
          <div>
            <RadioInput>
              <input
                type="radio"
                name="sort"
                value={SortingType.alphabetic}
                onClick={chooseSort}
                defaultChecked={peopleState.sorting === SortingType.alphabetic}
              />
              <span />
              По алфавиту
            </RadioInput>
            <RadioInput>
              <input
                type="radio"
                name="sort"
                value={SortingType.birthday}
                onClick={chooseSort}
                defaultChecked={peopleState.sorting === SortingType.birthday}
              />
              <span />
              По дню рождения
            </RadioInput>
          </div>
        </Content>
      </Dialog>
    </div>
  );
};

export default SortModal;
