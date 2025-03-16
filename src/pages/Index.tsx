import Search from "../components/Search";
import Pagination from "../components/Pagination";
import CardsList from "../components/People/CardsList";
import SortPopup from "../components/Modals/SortModal";

const Index = () => {
  return (
    <div className="container">
      <SortPopup />
      <Search />
      <Pagination />
      <CardsList />
    </div>
  );
};

export default Index;
