import Filter from "@/components/molecules/filter/Filter";
import ListingList from "@/components/molecules/listingList/ListingList";

const Listings = () => {
    //todo: ssr denemeleri için oluşturuldu, silinecek
  return (
    <div className="grid grid-cols-1 gap-y-3 px-4">
      <Filter />
      <ListingList />
    </div>
  );
};

export default Listings;
