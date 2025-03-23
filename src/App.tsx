import { BrowserRouter, Route, Routes } from "react-router";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { setTheme } from "./app/features/configSlice";

import { ThemeProvider } from "styled-components";
import GlobalStyles from "./assets/styles/GlobalStyles";
import { darkTheme, lightTheme } from "./assets/styles/themes";

import Index from "./pages/Index";
import PersonPage from "./pages/Person";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const config = useAppSelector((state) => state.config);
	const dispatch = useAppDispatch();

  const isDark: MediaQueryList = window.matchMedia(
    "(prefers-color-scheme: dark)"
	);

	useEffect(() => {
		const changeTheme = () => {
			if (isDark.matches) {
				dispatch(setTheme("dark"));
				localStorage.setItem("theme", "dark");
      } else {
				dispatch(setTheme("light"));
				localStorage.setItem("theme", "light");
      }
		}

		isDark.addEventListener("change", changeTheme);
		return () => isDark.removeEventListener("change", changeTheme);
	}, [dispatch, isDark])

  return (
    <ThemeProvider theme={config.theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route index element={<Index />} />
          <Route path="/:id" element={<PersonPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;