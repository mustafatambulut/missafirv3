import classNames from "classnames";
import { capitalize, get, map } from "lodash";

import { IBedAndBathItem } from "@/components/atoms/bedAndBathItem/types";

const BedAndBathItem = ({ data }: IBedAndBathItem) => {
  const filterItemClass = () => {
    return classNames(
      "text-base font-mi-sans-semi-bold flex items-center justify-center border rounded-3xl min-w-[36px] h-[36px] px-3 cursor-pointer hover:bg-primary-500 hover:text-white hover:border-primary-500 text-gray-700"
    );
  };
  return (
    <>
      <span className="text-gray-600 text-lg">
        {capitalize(get(data, "title"))}
      </span>
      <div className="flex gap-2 lg:gap-3 items-center">
        {map(get(data, "items"), (subItem, key) => {
          return (
            <div
              key={key}
              className={filterItemClass(subItem)}
              //onClick={() => handleFilter(subItem)}
            >
              {subItem}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default BedAndBathItem;
