import {
  find,
  get,
  head,
  includes,
  lowerCase,
  tail,
  without
} from "lodash";

import { Route } from "@/utils/route";
import { getLocations } from "@/service/api";
import { IHouseForRent } from "@/components/templates/houseForRent/types";

const HouseForRent = async ({
  params,
  searchParams,
  className = ""
}: IHouseForRent) => {
  const route = Route;
  const { data } = await getLocations();

  const cityParam = head(tail(get(params, "slug")));
  const checkCityParam = includes(get(route, "cities"), cityParam);
  if (!checkCityParam) return;

  const districtParam = head(without(tail(get(params, "slug")), cityParam));

  const getInfoByLocation = find(get(data, "data"), (item) => {
    if (
      get(item, "slug") === districtParam &&
      lowerCase(get(item, "city")) === cityParam
    ) {
      return item;
    }
  });


  // console.log(getInfoByLocation);

  return (
    <div className={`${className}`}>
      Kiralık ev {head(tail(get(params, "slug")))}
    </div>
  );
};

export default HouseForRent;
