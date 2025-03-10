import GlobalStyles from "./components/styles/GlobalStyles";

import Search from "./components/Search";
import Pagination from "./components/Pagination";

function App() {
  return (
    <div className="container">
      <GlobalStyles />
      <Search />
			<Pagination />
    </div>
  );
}

export default App;
