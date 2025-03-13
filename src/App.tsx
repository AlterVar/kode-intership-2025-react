import { store } from "./app/store";
import { Provider } from "react-redux";

import GlobalStyles from "./assets/styles/GlobalStyles";

import Search from "./components/Search";
import Pagination from "./components/Pagination";
import CardsList from "./components/People/CardsList";

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
