import { get } from "lodash";
import { ISearchDrawer } from "@/components/atoms/searchDrawer/types";

import SearchIcon from "../../../../public/images/search.svg";

const SearchDrawer = ({
  onClick,
  destination,
  className = ""
}: ISearchDrawer) => {
  return (
    <div className={`flex-1 mb-3 lg:mb-0 w-full ${className}`}>
      <label
        htmlFor="msfr-search-drawer"
        onClick={onClick}
        className="drawer-button py-1 px-4 h-[58px] bg-white cursor-pointer w-full rounded-2xl flex items-center text-gray-700">
        <div className="ml-1 flex items-center text-base">
          <SearchIcon className="mr-3" />
          <div className="flex flex-col items-start">
            <span>Where?</span>
            {destination && (
              <div className="text-lg font-mi-sans-semi-bold">
                {get(destination, "label")}
              </div>
            )}
          </div>
        </div>
      </label>
    </div>
  );
};

export default SearchDrawer;
