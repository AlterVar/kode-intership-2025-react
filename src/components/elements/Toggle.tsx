import styled from "styled-components";
import { HiSun } from "react-icons/hi2";
import { HiMoon } from "react-icons/hi2";

const Switch = styled.label`
  position: relative;
  display: block;
  width: 54px;
  height: 28px;

  input {
    display: none;

    &:checked + .slider {
      background-color: #c3c3c6;
    }

    &:checked + .slider:before {
      transform: translateX(26px);
      background-color: #f7f7f8;
    }
  }

  .slider {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f7f7f8;
    transition: 0.4s;
    border-radius: 13px;
    cursor: pointer;

    &:before {
      position: absolute;
      content: "";
      height: 20px;
      width: 20px;
      left: 4px;
      bottom: 4px;
      background-color: #c3c3c6;
      transition: 0.4s;
      border-radius: 50%;
      z-index: 5;
    }

    svg {
      width: 18px;
      height: 18px;
      position: absolute;
      top: 5px;

      &:first-child {
        stroke: #0041af;
        fill: #0041af;
        left: 5px;
      }

      &:last-child {
        stroke: #ffc107;
        fill: #ffc107;
        right: 5px;
      }
    }
  }
`;

const Toggle = () => {
  return (
    <Switch>
      <input type="checkbox" />
      <span className="slider">
        <HiMoon />
        <HiSun />
      </span>
    </Switch>
  );
};

export default Toggle;
