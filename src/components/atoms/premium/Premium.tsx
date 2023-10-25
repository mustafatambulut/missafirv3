import { get } from "lodash";
import { checkIsAuthenticated } from "@/utils/helper";

import Button from "@/components/atoms/button/Button";
import Loading from "@/components/atoms/loading/Loading";
import Typography from "@/components/atoms/typography/Typography";
import Banner from "@/components/molecules/banner/Banner";
import BannerSkeleton from "@/components/molecules/skeletons/bannerSkeleton/BannerSkeleton";

const Premium = ({ premium }: any) => {
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
          {checkIsAuthenticated() ? null : (
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
