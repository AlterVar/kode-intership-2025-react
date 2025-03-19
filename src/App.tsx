import { store } from "./app/store";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router";

import GlobalStyles from "./assets/styles/GlobalStyles";

import Index from "./pages/Index";
import PersonPage from "./pages/Person";

function App() {
	const basename = import.meta.env.BASE_URL;

  return (
    <Provider store={store}>
      <GlobalStyles />
			<BrowserRouter basename={ basename }>
        <Routes>
          <Route index element={<Index />} />
          <Route path="/:id" element={<PersonPage />} />
        </Routes>
      </BrowserRouter>
      {}
    </Provider>
  );
}

export default App;
