import { store } from "./app/store";
import { Provider } from "react-redux";

import GlobalStyles from "./components/styles/GlobalStyles";

import Search from "./components/Search";
import Pagination from "./components/Pagination";
import CardsList from "./components/CardsList";

function App() {
  return (
    <Provider store={store}>
      <div className="container">
        <GlobalStyles />
        <Search />
        <Pagination />
        <CardsList />
      </div>
    </Provider>
  );
}

export default App;
