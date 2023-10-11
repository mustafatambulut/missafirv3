import ListingList from "@/components/molecules/listingList/ListingList";

import Filter from "@/components/molecules/filter/Filter";

const Listing = () => {
  return (
    <div className="pt-16 lg:pt-40">
      <div className="flex flex-col gap-y-3 lg:px-4">
        <Filter />
        <ListingList />
      </div>
    </div>
  );
};

export default Listing;
