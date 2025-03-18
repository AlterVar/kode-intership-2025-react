import { store } from "./app/store";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router";
import { useState } from "react";

import { ThemeProvider } from "styled-components";
import GlobalStyles from "./assets/styles/GlobalStyles";
import { darkTheme, lightTheme } from "./assets/styles/themes/themes";

import Index from "./pages/Index";
import PersonPage from "./pages/Person";




function App() {
	const [theme, setTheme] = useState("light");

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route index element={<Index />} />
            <Route path="/:id" element={<PersonPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
