import { Suspense } from "react";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { forEach, get, includes, keys, size } from "lodash";

import { listingDetail } from "@/service/api";
import { decodeParams } from "@/utils/helper";
import { IDetail } from "@/app/[lang]/listing/[type]/[slug]/types";

import DataHandle from "@/components/atoms/dataHandle/DataHandle";
import AllDetail from "@/components/molecules/allDetail/AllDetail";
import MapSection from "@/components/molecules/mapSection/MapSection";
import DetailSection from "@/components/molecules/detailSection/DetailSection";
import ReviewSection from "@/components/molecules/reviewSection/ReviewSection";
import ArrangementSection from "@/components/molecules/arrangementSection/ArrangementSection";
import AvailabilitySection from "@/components/molecules/availabilitySection/AvailabilitySection";
import ListingReservationSummary from "@/components/molecules/listingReservationSummary/ListingReservationSummary";
import ListingDetailsSkeleton from "@/components/molecules/skeletons/listingDetailsSkeleton/ListingDetailsSkeleton";

import BodyHeartIcon from "../../../../../../public/images/variants/big_heart.svg";

// const GallerySection = dynamic(
//   () => import("@/components/organisms/gallerySection/GallerySection"),
//   {
//     ssr: false
//   }
// );
//
// const AmenitiesSection = dynamic(
//   () => import("@/components/molecules/amenitiesSection/AmenitiesSection"),
//   {
//     ssr: false
//   }
// );

const DistrictListing = async ({ params, searchParams }: IDetail) => {
  // const queryStringCheck = () => {
  //   const result = [];
  //   forEach(["check_in", "check_out"], (key) => {
  //     includes(keys(searchParams), key) && result.push(true);
  //   });
  //   return size(result) === 2;
  // };
  //
  // const listingDetailResponse = await listingDetail({
  //   slug: decodeParams(get(params, "slug")),
  //   params: queryStringCheck() ? searchParams : false
  // });
  //
  // if (!listingDetailResponse) return notFound();
  //
  // const {
  //   city,
  //   reviews,
  //   pictures,
  //   district,
  //   beds_list,
  //   approx_lat,
  //   approx_lng,
  //   house_rules,
  //   self_check_in,
  //   check_in_time,
  //   check_out_time,
  //   theNeighborhood,
  //   cancelation_policy
  // } = get(listingDetailResponse, "item");
  //
  // const allDetail = {
  //   house_rules,
  //   self_check_in,
  //   check_in_time,
  //   check_out_time,
  //   cancelation_policy
  // };
  //
  // const mapSection = {
  //   approx_lat,
  //   approx_lng,
  //   city: get(city, "name"),
  //   content: theNeighborhood,
  //   district: get(district, "name")
  // };
  //
  // return (
  //   <div className="pt-16 lg:pt-36">
  //     <Suspense fallback={<ListingDetailsSkeleton />}>
  //       <DataHandle
  //         res={{
  //           ...searchParams,
  //           ...listingDetailResponse
  //         }}
  //       />
  //       <header className="lg:mb-16 relative">
  //         <GallerySection images={pictures} />
  //         <BodyHeartIcon className="hidden lg:block absolute lg:bottom-[-5rem] left-0" />
  //       </header>
  //       <main className="flex flex-col lg:flex-row gap-x-10 p-4 pb-0 lg:p-9 lg:pt-0">
  //         <aside className="flex flex-col gap-y-8 lg:gap-y-16 lg:w-2/3">
  //           <DetailSection
  //             data={{
  //               breadCrumbs: get(listingDetailResponse, "item.breadcrumbs"),
  //               item: get(listingDetailResponse, "item")
  //             }}
  //           />
  //           <ArrangementSection items={beds_list} />
  //           <AmenitiesSection item={get(listingDetailResponse, "item")} />
  //           <AllDetail detail={allDetail} />
  //           <MapSection data={mapSection} />
  //           <AvailabilitySection />
  //           {size(get(reviews, "reviews")) ? (
  //             <ReviewSection
  //               review={{
  //                 comments: get(reviews, "reviews"),
  //                 total: size(get(reviews, "reviews")),
  //                 averageRate: get(reviews, "review_avg") || 0
  //               }}
  //             />
  //           ) : null}
  //
  //           {/*Other Houses You May Like*/}
  //           {/*todo: api entegrasyonu sonrası eklenecek*/}
  //         </aside>
  //         <aside className="w-1/3">
  //           <ListingReservationSummary
  //             resData={listingDetailResponse}
  //             searchParams={searchParams}
  //             slug={get(params, "slug")}
  //             hasQuery={queryStringCheck()}
  //           />
  //         </aside>
  //       </main>
  //     </Suspense>
  //   </div>
  // );

  return (
    <div className="pt-16 lg:pt-36">
      <h1>ilçe</h1>
    </div>
  );
};

export default DistrictListing;
