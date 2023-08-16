import { get, map } from "lodash";

import { IAmenityItem } from "@/components/molecules/amenityItem/types";

import Checkbox from "@/components/atoms/checkbox/Checkbox";

const AmenityItem = ({
  data,
  handleFilter,
  amenitiesData,
  checkIsIncludes
}: IAmenityItem) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-lg">{get(data, "title")}</div>
      <div className="flex flex-col h-36 flex-wrap gap-y-3 gap-x-7 content-start">
        {map(data.items, (item, key) => (
          <div key={key} className="justify-self-start m-0">
            <Checkbox
              value="confirmation_form"
              name="confirmationForm"
              checked={checkIsIncludes(amenitiesData, get(item, "value"))}
              onChange={() => handleFilter(item)}
              label={get(item, "title")}
              //labelClass="text-sm lg:text-base items-start lg:items-center"
              position="right"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AmenityItem;
