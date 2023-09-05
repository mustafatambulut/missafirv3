import { forEach, get, includes, keys, size } from "lodash";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

import { listingDetail } from "@/service/api";
import { decodeParams } from "@/utils/helper";
import { IDetail } from "@/app/[lang]/listing/[type]/[slug]/types";

import AllDetail from "@/components/molecules/allDetail/AllDetail";
import MapSection from "@/components/molecules/mapSection/MapSection";
import DetailSection from "@/components/molecules/detailSection/DetailSection";

import ReviewSection from "@/components/molecules/reviewSection/ReviewSection";
import ArrangementSection from "@/components/molecules/arrangementSection/ArrangementSection";
import AvailabilitySection from "@/components/molecules/availabilitySection/AvailabilitySection";
import ReservationCheckInCard from "@/components/molecules/reservationCheckInCard/ReservationCheckInCard";

import BodyHeartIcon from "../../../../../../public/images/variants/big_heart.svg";

const ReservationSummary = dynamic(
  () => import("@/components/atoms/reservationSummary/ReservationSummary"),
  {
    ssr: false
  }
);

const GallerySection = dynamic(
  () => import("@/components/organisms/gallerySection/GallerySection"),
  {
    ssr: false
  }
);

const AmenitiesSection = dynamic(
  () => import("@/components/molecules/amenitiesSection/AmenitiesSection"),
  {
    ssr: false
  }
);

const Detail = async ({ params, searchParams }: IDetail) => {
  const queryStringCheck = () => {
    const result = [];
    forEach(["check_in", "check_out"], (key) => {
      includes(keys(searchParams), key) && result.push(true);
    });
    return size(result) === 2;
  };

  const breadCrumbs = [
    { url: "/", label: "Home" },
    { url: "/listing", label: "Listing" },
    {
      label: get(params, "slug")
    }
  ];

  const res = await listingDetail({
    slug: decodeParams(get(params, "slug")),
    params: queryStringCheck() ? searchParams : false
  });

  if (!res) return notFound();

  return (
    <div className="mt-24">
      <header className="lg:mb-16">
        <GallerySection images={get(res, "item.pictures")} />
        <BodyHeartIcon className="hidden lg:block absolute lg:bottom-32 lg:bottom-0 2xl:bottom-0 left-0" />
      </header>
      <main className="flex flex-col lg:flex-row gap-x-10 p-4 lg:p-9 lg:pt-0">
        <aside className="flex flex-col gap-y-8 lg:gap-y-16 lg:w-2/3">
          <DetailSection
            data={{
              breadCrumbs,
              item: get(res, "item")
            }}
          />
          <ArrangementSection items={get(res, "item.beds_list")} />
          <AmenitiesSection item={get(res, "item")} />
          <AllDetail
            detail={{
              self_check_in: get(res, "item.self_check_in"),
              check_in_time: get(res, "item.check_in_time"),
              check_out_time: get(res, "item.check_out_time"),
              cancelation_policy: get(res, "item.cancelation_policy"),
              house_rules: get(res, "item.house_rules")
            }}
          />
          <MapSection
            data={{
              city: get(res, "item.city.name"),
              district: get(res, "item.district.name"),
              approx_lat: get(res, "item.approx_lat"),
              approx_lng: get(res, "item.approx_lng"),
              content: get(res, "item.theNeighborhood")
            }}
          />
          <AvailabilitySection />
          {size(get(res, "item.reviews.reviews")) > 0 && (
            <ReviewSection
              review={{
                comments: get(res, "item.reviews.reviews"),
                total: size(get(res, "item.reviews.reviews")),
                averageRate: get(res, "items.reviews.review_avg") || 0
              }}
            />
          )}

          {/*Other Houses You May Like*/}
          {/*todo: api entegrasyonu sonrası eklenecek*/}
        </aside>
        <aside className="w-1/3">
          {queryStringCheck() ? (
            <ReservationSummary
              hideCouponCode={true}
              isDateSummary={true}
              reservation={get(res, "item.reservation")}
            />
          ) : (
            <ReservationCheckInCard
              reservation={get(res, "item.reservation")}
            />
          )}
        </aside>
      </main>
    </div>
  );
};

export default Detail;
