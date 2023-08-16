import classNames from "classnames";
import { capitalize, get, map } from "lodash";

import {
  IBathroomsData,
  IBedsData
} from "@/components/molecules/bedAndBaths/types";
import { IBedAndBathItem } from "@/components/atoms/bedAndBathItem/types";

const BedAndBathItem = ({
  data,
  bedsData,
  handleFilter,
  bathroomsData,
  mockBedAndBathsData
}: IBedAndBathItem) => {
  const filterItemClass = ({ type, value }: IBedsData | IBathroomsData) => {
    return classNames(
      "text-base font-mi-sans-semi-bold flex items-center justify-center border rounded-3xl min-w-[36px] h-[36px] px-3 cursor-pointer hover:bg-primary-500 hover:text-white hover:border-primary-500 text-gray-700",
      {
        "bg-primary text-white border-primary":
          type === "beds"
            ? get(bedsData, "value") === value
            : get(bathroomsData, "value") === value
      }
    );
  };

  return (
    <>
      <span className="text-gray-600 text-lg">{capitalize(data)}</span>
      <div className="flex gap-2 lg:gap-3 items-center">
        {map(get(mockBedAndBathsData, data), (item, key) => {
          return (
            <div
              key={key}
              className={filterItemClass(item)}
              onClick={() => handleFilter(item)}>
              {get(item, "title")}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default BedAndBathItem;
