import { get, map, includes } from "lodash";

import { Route } from "@/utils/route";
import { ISlug } from "@/app/[lang]/[...slug]/types";

import HouseForRent from "@/components/templates/houseForRent/HouseForRent";
import ListingDetail from "@/components/templates/listingDetail/ListingDetail";

const Routing = ({ params, searchParams }: ISlug) => {
  if (!get(params, "slug[0]") || get(params, "slug[0]") === "undefined") return;

  const route = Route;
  const lang = get(params, "lang");
  const staticRoutes = map(get(route, "statics"), lang);
  const categories = [
    ...get(route, "houseForRent"),
    ...get(route, "villaForRent"),
    ...get(route, "furnishedFlatForRent"),
    ...get(route, "listing")
  ];

  if (includes(map(categories, lang), get(params, "slug[0]"))) {
    return <HouseForRent params={params} searchParams={searchParams} />;
  }

  if (!includes(staticRoutes, get(params, "slug[0]"))) {
    return <ListingDetail params={params} searchParams={searchParams} />;
  }
};

export default Routing;
