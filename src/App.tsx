import { BrowserRouter, Route, Routes } from "react-router";
import { useAppSelector } from "./app/hooks";

import { ThemeProvider } from "styled-components";
import GlobalStyles from "./assets/styles/GlobalStyles";

import Index from "./pages/Index";
import PersonPage from "./pages/Person";
import { darkTheme, lightTheme } from "./assets/styles/themes";

function App() {
  const basename = import.meta.env.BASE_URL;

  const config = useAppSelector((state) => state.config);

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
