import { BrowserRouter, Route, Routes } from "react-router";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { setTheme } from "./app/features/configSlice";

import { ThemeProvider } from "styled-components";
import GlobalStyles from "./assets/styles/GlobalStyles";
import { darkTheme, lightTheme } from "./assets/styles/themes";

import Index from "./pages/Index";
import PersonPage from "./pages/Person";

function App() {
  const basename = import.meta.env.BASE_URL;

  const config = useAppSelector((state) => state.config);
	const dispatch = useAppDispatch();

  const isDark: MediaQueryList = window.matchMedia(
    "(prefers-color-scheme: dark)"
	);

  isDark.addEventListener("change", () => {
    if (isDark.matches) {
      dispatch(setTheme("dark"));
    } else {
      dispatch(setTheme("light"));
    }
  });

  return (
    <ThemeProvider theme={config.theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <BrowserRouter basename={basename}>
        <Routes>
          <Route index element={<Index />} />
          <Route path="/:id" element={<PersonPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
