import { notFound } from "next/navigation";
import { get, includes, startCase } from "lodash";

import { decodeParams } from "@/utils/helper";
import Filter from "@/components/molecules/filter/Filter";
import ListingList from "@/components/molecules/listingList/ListingList";

const CityListing = ({ params }: any) => {
  // const allowed = ["kiralik-villa", "kiralik-ev"];
  // const path = decodeParams(get(params, "type"));
  //
  // !includes(allowed, path) && notFound();
  //
  // return (
  //   <div className="h-40 mt-40 w-full">
  //     <h1 className="text-3xl">
  //       {startCase(get(params, "type"))} ve Daire Seçenekleri
  //     </h1>
  //     <div className="flex flex-col gap-y-3 lg:px-4">
  //       <Filter />
  //       <ListingList />
  //     </div>
  //   </div>
  // );

  return (
    <div>
      <h1>şehir</h1>
    </div>
  );
};

export default CityListing;
