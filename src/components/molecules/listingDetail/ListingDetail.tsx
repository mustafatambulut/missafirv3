import get from "lodash/get";
import size from "lodash/size";
import { getTranslator } from "next-intl/server";

import {
  getLandingListingTabs,
  getLandingListingTabDetails
} from "@/service/api";
import { SUCCESS } from "@/app/enum";
import { IListingDetail } from "@/components/molecules/listingDetail/types";

import DetailCards from "@/components/organisms/detailCards/DetailCards";
import ListingSeoContent from "@/components/molecules/listingSeoContent/ListingSeoContent";

const ListingDetail = async ({ lang }: IListingDetail) => {
  const t = await getTranslator(lang);

  const res = await getLandingListingTabs();
  if (get(res, "data.code") !== SUCCESS || !size(get(res, "data.data"))) return;
  const firstTab = get(res, "data.data[0].id");

  const content = await getLandingListingTabDetails(firstTab);
  const header = {
    title: t("listing_data_title"),
    description: t("listing_data_description")
  };

  return (
    <div>
      <ListingSeoContent lang={lang} header={header} content={content} />
      <DetailCards lang={lang} tabs={get(res, "data.data")} header={header} />
    </div>
  );
};

export default ListingDetail;
