import Search from "../components/Search";
import Filter from "../components/Filter";
import CardsList from "../components/People/CardsList";
import SortPopup from "../components/modals/SortModal";

const Index = () => {
  return (
    <div className="container">
      <SortPopup />
      <Search />
      <Filter />
      <CardsList />
    </div>
  );
};

export default Index;
