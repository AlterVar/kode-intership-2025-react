import { store } from "./app/store";
import { Provider } from "react-redux";

import GlobalStyles from "./assets/styles/GlobalStyles";

import { BrowserRouter, Route, Routes } from "react-router";
import Index from "./pages/Index";
import PersonPage from "./pages/PersonPage";

function App() {
  return (
    <Provider store={store}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route index element={<Index />} />
          <Route path="/:id" element={<PersonPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
