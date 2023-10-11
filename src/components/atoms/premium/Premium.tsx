"use client";
import { get } from "lodash";
import { checkAuth } from "@/utils/helper";

import { BODY } from "@/app/constants";
import { PREMIUM_SECTION } from "@/components/atoms/premium/constants";
import useFetchData from "@/app/hooks/useFetchData";
import { IPremium } from "@/components/atoms/premium/types";

import Button from "@/components/atoms/button/Button";
import Loading from "@/components/atoms/loading/Loading";
import BannerSkeleton from "@/components/molecules/skeletons/bannerSkeleton/BannerSkeleton";
import Typography from "@/components/atoms/typography/Typography";
import Banner from "@/components/molecules/banner/Banner";

const Premium = () => {
  const premium = useFetchData<IPremium>(BODY, PREMIUM_SECTION);

  return (
    <Loading isLoading={!premium} loader={<BannerSkeleton />}>
      <div className="px-2 lg:px-8 mt-14">
        <Banner
          title=""
          body=""
          type="primary"
          useCustomBg={true}
          className="text-white rounded-xl p-8 bg-cover bg-no-repeat"
          style={{ backgroundImage: `url(${get(premium, "body.image")})` }}>
          <Typography element="h4" variant="h4" className="text-white">
            {get(premium, "header.title")}
          </Typography>
          <Typography element="p" variant="p2" className="my-5 text-white">
            {get(premium, "body.title")}
          </Typography>
          {checkAuth() ? null : (
            <Button
              variant="btn-white"
              className="w-40 text-2xl"
              link={get(premium, "footer.link")}>
              <Typography element="h6" variant="h6">
                {get(premium, "footer.label")}
              </Typography>
            </Button>
          )}
        </Banner>
      </div>
    </Loading>
  );
};

export default Premium;
