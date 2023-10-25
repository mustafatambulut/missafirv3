import get from "lodash/get";
import map from "lodash/map";
import keys from "lodash/keys";
import find from "lodash/find";
import clone from "lodash/clone";
import head from "lodash/head";
import isEmpty from "lodash/isEmpty";
import includes from "lodash/includes";
import endsWith from "lodash/endsWith";

import { Route } from "@/utils/route";
import { ISlug } from "@/app/[lang]/[...slug]/types";
import { cities, districts } from "@/utils/locationsMap";

import Search from "@/app/pages/search/page";
import Login from "@/app/pages/auth/login/page";
import StaticPage from "@/app/pages/static/page";
import TextPage from "@/app/pages/textpage/page";
import Signup from "@/app/pages/auth/signup/page";
import NewPassword from "@/app/pages/auth/new-password/page";
import ForgotPassword from "@/app/pages/auth/forgot-password/page";
import ListingDetail from "@/components/templates/listingDetail/ListingDetail";

const Routing = ({ params, searchParams }: ISlug) => {
  const route = Route;
  const lang = get(params, "lang");
  const textPagesRoutes = map(get(route, "textPagesRoutes"), lang);
  const authRoutes = map(get(route, "authPagesRoutes"), lang);
  const staticRoutes = map(get(route, "staticPagesRoutes"), lang);
  const categoryRoutes = map(get(route, "categoryRoutes"), lang);
  const baseListingRoutes = map(get(route, "baseListingRoutes"), lang);
  const listingDetailSuffix = map(get(route, "listingDetailSuffix"), lang);

  const queryParams = clone(searchParams);
  const findCity = (slug: any) => {
    const founded = find(cities, { slug });
    return !isEmpty(founded) ? founded : null;
  };
  const findDistrictWithCity = (slug: any, city_id: any) => {
    const founded = find(districts, {
      slug,
      city_id
    });
    return !isEmpty(founded) ? founded : null;
  };

  // console.log("test----->",get(params, "slug[0]"));
  // console.log("test--2--->",keys(textPagesRoutes[0]));
  // console.log("test--2--->",keys(authRoutes[0]));

  if (includes(keys(textPagesRoutes[0]), get(params, "slug[0]"))) {
    // Text Pages - e.g. /tr/gizlilik-politikasi
    return getRoutes(
      "textPage",
      lang,
      get(textPagesRoutes[0], get(params, "slug[0]")),
      null,
      null,
      textPagesRoutes[0]
    );
  } else if (includes(keys(authRoutes[0]), get(params, "slug[0]"))) {
    // console.log("58------------->",keys(authRoutes[0]));
    // console.log("59------------->",get(params, "slug[0]"));
    // console.log("60---------------->",includes(keys(authRoutes[0]), get(params, "slug[0]")));
    // Auth Pages - e.g. /tr/giris-yap
    return getRoutes(
      "auth",
      lang,
      get(authRoutes[0], get(params, "slug[0]")),
      null,
      null,
      authRoutes[0]
    );
  } else if (includes(keys(staticRoutes[0]), get(params, "slug[0]"))) {
    // Static Pages - e.g. /tr/biz-kimiz
    // console.log("Route:------------------------------------>");
    // console.log("routes->",keys(staticRoutes[0]));
    // console.log("params->",get(params, "slug[0]"));
    // console.log("params 2->",get(params, "slug"));
    // console.log("----------------------");
    // console.log("routes--->",getRoutes(
    //   "static",
    //   lang,
    //   get(params, "slug"),
    //   null,
    //   null,
    //   staticRoutes[0]
    // ));
    // console.log("Route:------------------------------------>");
    const routeType = get(params, "slug[0]") === "list" ? "list" : "static";
    return getRoutes(
      routeType,
      lang,
      get(params, "slug"),
      null,
      null,
      staticRoutes[0]
    );
  } else if (includes(keys(categoryRoutes[0]), get(params, "slug[0]"))) {
    // Category Pages
    queryParams["category"] = get(categoryRoutes[0], get(params, "slug[0]"));

    // Category Pages w/ City - e.g. /tr/kiralik-villa/istanbul
    if (get(params, "slug[1]") && !!findCity(get(params, "slug[1]"))) {
      var city = findCity(get(params, "slug[1]"));
      queryParams["city_id"] = get(city, "id");
      // TODO: city yoksa show_404
      // Category Pages w/ City & District - e.g. /tr/kiralik-villa/istanbul/beyoglu
      if (
        get(params, "slug[2]") &&
        !!findDistrictWithCity(get(params, "slug[2]"), get(city, "id"))
      ) {
        var district = findDistrictWithCity(
          get(params, "slug[2]"),
          get(city, "id")
        );
        queryParams["district_id"] = get(district, "id");
        // TODO: district yoksa show_404
      }
    }
    return getRoutes(
      "search",
      lang,
      get(params, "slug"),
      params,
      queryParams,
      categoryRoutes[0]
    );
  } else if (includes(keys(baseListingRoutes[0]), get(params, "slug[0]"))) {
    // Base Listing Page
    // TODO: if slug[2] or more is exist, it should show 404!
    if (get(params, "slug[1]")) {
      const baseListingCountryRoutes = map(
        get(route, "baseListingCountryRoutes"),
        lang
      );
      if (includes(keys(baseListingCountryRoutes[0]), get(params, "slug[1]"))) {
        // Base Listing Page w/ Country - e.g. /tr/kiralik-ev/turkiye
        queryParams["countryId"] = get(
          baseListingCountryRoutes[0],
          get(params, "slug[1]")
        );
        // TODO: Country yoksa show_404
      }
    }
    return getRoutes(
      "search",
      lang,
      get(params, "slug"),
      params,
      queryParams,
      baseListingRoutes[0]
    );
  } else if (!!findCity(get(params, "slug[0]"))) {
    var city = findCity(get(params, "slug[0]"));
    // City Pages
    if (!!findDistrictWithCity(get(params, "slug[1]"), get(city, "id"))) {
      // City Pages w/ District - e.g. /tr/istanbul/beyoglu
      var district = findDistrictWithCity(
        get(params, "slug[1]"),
        get(city, "id")
      );
      queryParams["city_id"] = get(city, "id");
      queryParams["district_id"] = get(district, "id");
    } else {
      // City Pages - e.g. /tr/istanbul
      queryParams["city_id"] = get(city, "id");
    }
    return getRoutes(
      "search",
      lang,
      get(params, "slug"),
      params,
      queryParams,
      null
    );
  } else if (get(params, "slug[0]") === "list") {
    // Default Listing Page
    return getRoutes(
      "search",
      lang,
      get(params, "slug"),
      null,
      queryParams,
      null
    );
  } else if (endsWith(get(params, "slug[0]"), head(listingDetailSuffix))) {
    // Listing Detail Page - e.g. /tr/glavani-king-detay
    params["slug"] = get(params, "slug[0]").replace(
      "-" + listingDetailSuffix[0],
      ""
    );
    return getRoutes(
      "listingDetail",
      lang,
      get(params, "slug"),
      params,
      queryParams,
      null
    );
  } else {
    show404();
  }
};

function show404() {
  // TODO: show 404 page!
  console.log("Route: 404");
}

function getRoutes(routeType, lang, slug, params, searchParams, arr) {
  switch (routeType) {
    case "textPage":
      return <TextPage pageId={slug} lang={lang} />;
    case "auth":
      switch (slug) {
        case "login":
          console.log("Route: Auth Login");
          return <Login />;
        case "signup":
          console.log("Route: Auth Signup");
          return <Signup />;
        case "forgot-password":
          console.log("Route: Auth Forgot Password");
          return <ForgotPassword />;
        case "new-password":
          console.log("Route: Auth New Password");
          return <NewPassword />;
        default:
          break;
      }
      show404();
      break;
    case "list":
      return <Search lang={lang} params={params} searchParams={searchParams} />;
    case "static":
      console.log("Route: Static");
      return <StaticPage lang={lang} targetPageVariable={arr[slug[0]]} />;
    case "listingDetail":
      return <ListingDetail params={params} searchParams={searchParams} />;
    default:
      return <Search lang={lang} params={params} searchParams={searchParams} />;
  }
}

export default Routing;
