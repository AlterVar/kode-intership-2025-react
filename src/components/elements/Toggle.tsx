import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setTheme } from "../../app/features/configSlice";

import { HiSun } from "react-icons/hi2";
import { HiMoon } from "react-icons/hi2";
import { useEffect } from "react";

const Switch = styled.label`
  position: relative;
  display: block;
  width: 54px;
  height: 28px;

  input {
    display: none;

    &:checked + .slider:before {
      transform: translateX(26px);
    }
  }

  .slider {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${(props) => props.theme.bgSecondary};
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
      background-color: ${(props) => props.theme.bgTertiary};
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
  const config = useAppSelector((state) => state.config);
	const dispatch = useAppDispatch();

	const isDark: MediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
	isDark.addEventListener("change", () => {
		if (isDark) {
			dispatch(setTheme("dark"));
			return;
		}
		dispatch(setTheme("light"));
	})

	useEffect(() => {
		
	}, [dispatch, isDark])
	
	const changeTheme = () => {
		return config.theme === "light" ? dispatch(setTheme("dark")) : dispatch(setTheme("light"));
	}
	
	return (
    <Switch>
      <input
        type="checkbox"
        onChange={changeTheme}
        checked={config.theme === "dark"}
      />
      <span className="slider">
        <HiMoon />
        <HiSun />
      </span>
    </Switch>
  );
};

export default Toggle;
