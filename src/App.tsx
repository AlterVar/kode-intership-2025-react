import { store } from "./app/store";
import { Provider } from "react-redux";

import GlobalStyles from "./assets/styles/GlobalStyles";

import Search from "./components/Search";
import Pagination from "./components/Pagination";
import CardsList from "./components/People/CardsList";
import SortPopup from "./components/Modals/SortModal";
/* import PersonPage from "./components/People/Cards/PersonPage"; */

function App() {
  return (
    <Provider store={store}>
      <GlobalStyles />
{/*       <PersonPage /> */}
      <div className="container">
        <SortPopup />
        <Search />
        <Pagination />
        <CardsList />
      </div>
    </Provider>
  );
}

export default App;
