import {get, map, size} from "lodash";
import ListingListItem from "@/components/molecules/listingListItem/ListingListItem";
import {IListingSection} from "@/components/organisms/listingSection/types";

const ListingSection = ({listings,searchLocation}: IListingSection) => {
  return (
      <div className="flex flex-col gap-y-4">
          <div>
              <div className="font-base lg:text-28">

                  {/*todo: location alanı dianamikleştirilecek*/}
                  {searchLocation && (
                      <h1>
                <span className="font-mi-sans-semi-bold mr-1">
                  {get(searchLocation, "district.name")}
                </span>
                          <span>lokasyonundaki evler</span>
                      </h1>
                  )}
              </div>
              <div className="text-sm lg:text-lg">{size(listings)} homes</div>
          </div>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-4 h-screen">
              {size(listings) &&
                  map(listings, (listing, key) => (
                      <ListingListItem listing={listing} key={key} />
                  ))}
          </div>
      </div>
  );
};

export default ListingSection;
