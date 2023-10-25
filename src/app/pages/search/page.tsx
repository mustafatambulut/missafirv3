import get from "lodash/get";
import size from "lodash/size";
import { getTranslator } from "next-intl/server";

import { SUCCESS } from "@/app/enum";
import { getListings } from "@/service/api";
import { ISearch } from "@/app/pages/search/types";

import UpdateMinifyButtonsDataHandle from "@/components/atoms/updateMinifyButtonsDataHandle/UpdateMinifyButtonsDataHandle";
import Filter from "@/components/molecules/filter/Filter";
import ListingList from "@/components/molecules/listingList/ListingList";
import ListingSeoContent from "@/components/molecules/listingSeoContent/ListingSeoContent";
import UpdateLoadingDataHandle from "@/components/atoms/updateLoadingDataHandle/UpdateLoadingDataHandle";

const Search = async ({ lang, searchParams }: ISearch) => {
  const t = await getTranslator(lang);
  const res = await getListings({ lang, params: searchParams });

  return (
    <div className="pt-16 lg:pt-40">
      <UpdateMinifyButtonsDataHandle />
      <div className="flex flex-col gap-y-3 lg:px-4">
        <Filter lang={lang} searchParams={searchParams} />
        {get(res, "data.code") === SUCCESS &&
        size(get(res, "data.data.items")) ? (
          <>
            <ListingSeoContent lang={lang} content={res} />
            <ListingList lang={lang} data={get(res, "data.data")} />
          </>
        ) : (
          <>
            <UpdateLoadingDataHandle />
            <h1>{t("not_found")}</h1>
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
