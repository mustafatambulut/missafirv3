import { get } from "lodash";

import { IGuestDrawer } from "@/components/atoms/guestDrawer/types";

import Button from "@/components/atoms/button/Button";

import GuestsIcon from "../../../../public/images/guests.svg";
import SearchIconWhite from "../../../../public/images/search_white.svg";

const GuestDrawer = ({
  onClick,
  guest,
  className = "",
  handleFilterListings
}: IGuestDrawer) => {
  return (
    <div className={`flex-1 mb-3 lg:mb-0 w-full ${className}`}>
      <div className="flex">
        <label
          htmlFor="msfr-search-drawer"
          onClick={onClick}
          className="drawer-button py-1 px-4 !h-[58px] bg-white cursor-pointer w-full rounded-2xl flex items-center text-gray-700">
          <div className="flex">
            <div className="flex items-center text-base">
              <GuestsIcon className="mr-3 fill-gray-700" />
              <div className="flex flex-col items-start">
                <span>Guests</span>
                {(get(guest, "adults") > 0 ||
                  get(guest, "kids") > 0 ||
                  get(guest, "pets")) && (
                  <div className="flex text-lg font-mi-sans-semi-bold">
                    {get(guest, "adults") > 0 && (
                      <span className="mr-2">
                        {get(guest, "adults")} Adults
                      </span>
                    )}
                    {get(guest, "kids") > 0 && (
                      <span className="mr-2">{get(guest, "kids")} Kids</span>
                    )}
                    {get(guest, "pets") && <span className="mr-2">Pets</span>}
                  </div>
                )}
              </div>
            </div>
          </div>
        </label>
        <Button
          onClick={handleFilterListings}
          variant="btn-primary"
          className="rounded-2xl !h-[58px] ml-3 w-[72px] lg:w-auto">
          <SearchIconWhite />
        </Button>
      </div>
    </div>
  );
};

export default GuestDrawer;
