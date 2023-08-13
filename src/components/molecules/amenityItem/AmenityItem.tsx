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
      <div className="flex flex-col h-36 flex-wrap gap-y-3 gap-x-10 content-start">
        {map(data.items, (item, key) => (
          <div key={key} className="justify-self-start m-0">
            <Checkbox
              data={item}
              handleChange={() => handleFilter(item)}
              isChecked={checkIsIncludes(amenitiesData, get(item, "value"))}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AmenityItem;
