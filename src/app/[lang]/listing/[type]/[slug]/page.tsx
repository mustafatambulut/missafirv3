import { get, size } from "lodash";

import { listingDetail } from "@/service/api";
import { decodeParams } from "@/utils/helper";
import { IDetail } from "@/app/[lang]/listing/[type]/[slug]/types";

import ReservationSummary from "@/components/atoms/reservationSummary/ReservationSummary";
import AllDetail from "@/components/molecules/allDetail/AllDetail";
import MapSection from "@/components/molecules/mapSection/MapSection";
import DetailSection from "@/components/molecules/detailSection/DetailSection";
import ImageCarousel from "@/components/molecules/imageCarousel/ImageCarousel";
import ReviewSection from "@/components/molecules/reviewSection/ReviewSection";
import AmenitiesSection from "@/components/molecules/amenitiesSection/AmenitiesSection";
import ArrangementSection from "@/components/molecules/arrangementSection/ArrangementSection";
import AvailabilitySection from "@/components/molecules/availabilitySection/AvailabilitySection";

import BodyHeartIcon from "../../../../../../public/images/contact_heart.svg";

const Detail = async ({ params }: IDetail) => {
  const breadCrumbs = [
    { url: "/", label: "Home" },
    { url: "/listing", label: "Listing" },
    {
      label: get(params, "slug")
    }
  ];

  const mockReviews = [
    {
      name: "John",
      date: "July 2022",
      comment: `Great stay at a wonderful apartment. Very quiet, clean and the pool and the setting is fantastic. About a 15 minute walk to downtown and the water with`,
      rate: 4
    },
    {
      name: "Scarlet",
      date: "July 2022",
      comment: `Inside we had all our necessities, cleanliness was very good. If you need help, they are at a distance where they can come to you in 1-2 minutes.`,
      rate: 5
    },
    {
      name: "Melissa",
      date: "July 2022",
      comment: `It was very nice, there was netflix and TV, the bed was comfortable, it was clean inside, you feel rested, thanks when you are at home`,
      rate: 3
    },
    {
      name: "Phillip",
      date: "July 2022",
      comment: `We were greeted by friendly people. We were directed to a clean and tidy house. Peaceful and quiet area. Definitely a place we would like to stay at when we visit Antalya again.`,
      rate: 4
    },
    {
      name: "Test user",
      date: "July 2023",
      comment: `We were greeted by friendly people. We were directed to a clean and tidy house. Peaceful and quiet area. Definitely a place we would like to stay at when we visit Antalya again.`,
      rate: 5
    }
  ];

  const res = await listingDetail(decodeParams(get(params, "slug")));

  return (
    <div className="mt-24">
      <header className="mb-40">
        <ImageCarousel
          width={600}
          height={600}
          images={get(res, "item.pictures")}
        />
        <BodyHeartIcon className="hidden lg:block absolute bottom-20 2xl:-bottom-36 left-0" />
      </header>
      <main className="flex gap-x-10 p-9 pt-0">
        <aside className="flex flex-col gap-y-16 w-2/3">
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
              house_rules: get(res, "item.house_rules[0]")
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
          <ReviewSection
            review={{
              comments: mockReviews,
              total: size(get(res, "item.reviews")),
              averageRate: 4.9
            }}
          />
        </aside>
        <aside className="w-1/3">
          <ReservationSummary hideCouponCode={true} isDateSummary={true} />
        </aside>
      </main>

      {/*todo: api entegrasyonu sonrası eklenecek*/}
      {/*Other Houses You May Like*/}
      <footer>Other Houses You May Like</footer>
      {/*Other Houses You May Like*/}
    </div>
  );
};

export default Detail;
