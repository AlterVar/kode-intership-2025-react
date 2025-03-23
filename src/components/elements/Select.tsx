import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { changeLanguage } from "../../app/features/configSlice";
import i18next from "i18next";

const SelectLang = styled.select`
  border: none;
  outline: none;
  width: 60px;
  height: 28px;
  padding: 5px;
  box-sizing: border-box;
  border-radius: 13px;
  background-color: ${(props) => props.theme.bgSecondary};

  font-family: "InterMedium", sans-serif;
  font-size: 1.3rem;
  color: ${(props) => props.theme.textPrimary};
`;

const Select = () => {
  const config = useAppSelector((state) => state.config);
  const dispatch = useAppDispatch();

  const setLanguage = (value: string) => {
		dispatch(changeLanguage(value));
		i18next.changeLanguage(value);
  };

  return (
    <SelectLang
      name="language"
      value={config.language === "en" ? "en" : "ru"}
      onChange={(e) => setLanguage(e.target.value)}
		>
      <option value="en">Eng</option>
      <option value="ru">Rus</option>
    </SelectLang>
  );
};

export default Select;
