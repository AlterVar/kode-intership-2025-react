import GlobalStyles from "./components/styles/GlobalStyles";

import Search from "./components/Search";
import Pagination from "./components/Pagination";
import CardsList from "./components/CardsList";

function App() {
  return (
    <div className="container">
      <GlobalStyles />
      <Search />
			<Pagination />
			<CardsList />
    </div>
  );
}

export default App;
