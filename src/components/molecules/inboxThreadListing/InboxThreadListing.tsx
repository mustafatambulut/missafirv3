"use client";
import { ReactNode, useEffect, useState } from "react";
import { get, isEqual, map } from "lodash";
import { isMobile } from "react-device-detect";

import { changeFavored } from "@/redux/features/inboxSlice/inboxSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import Badge from "@/components/atoms/badge/Badge";
import Button from "@/components/atoms/button/Button";
import Loading from "@/components/atoms/loading/Loading";
import InboxThreadListingSkeleton from "@/components/molecules/skeletons/inboxThreadListingSkeleton/InboxThreadListingSkeleton";
import Card from "@/components/organisms/card/Card";

import NextIcon from "../../../../public/images/variants/chevron_right.svg";
import CalendarIcon from "../../../../public/images/calendar.svg";
import Typography from "@/components/atoms/typography/Typography";
import { useTranslations } from "next-intl";

const InboxThreadListing = () => {
  const dispatch = useAppDispatch();
  const [isFav, setIsFav] = useState(false);
  const t = useTranslations();
  const { selectedThread, threadListLoading, threadDetailsLoading } =
    useAppSelector((state) => state.inboxReducer, isEqual);
  useEffect(() => {
    dispatch(changeFavored(isFav));
  }, [isFav]);

  const TitleComponent = (): ReactNode => {
    return (
      <div className="flex flex-col gap-y-2">
        <Badge
          className="p-3 rounded-md text-base text-white border-none"
          style={{
            backgroundColor: get(selectedThread, "reservation.status.hex")
          }}>
          {get(selectedThread, "reservation.status.title")}
        </Badge>
        <Typography variant="h6" element="h6" className="line-clamp-2">
          {get(selectedThread, "reservation.listing.title")}
        </Typography>
        <Typography
          variant="p4"
          element="p"
          className="text-gray-400 line-clamp-2">
          {get(selectedThread, "reservation.listing.address")}
        </Typography>
      </div>
    );
  };

  return (
    <aside
      className={`bg-white lg:w-1/4 rounded-xl mt-5 lg:mt-0 ${
        isMobile && !selectedThread && "hidden"
      }`}>
      <Loading
        isLoading={threadListLoading || threadDetailsLoading}
        loader={<InboxThreadListingSkeleton />}>
        <Card
          setIsFav={setIsFav}
          showBadge={true}
          badgeTitle="Home"
          bodyClass="p-3 pt-0"
          titleClass="p-3"
          className="rounded-xl"
          title={<TitleComponent />}
          sliderOptions={{
            mobileSlidesPerView : 1,
            desktopSlidesPerView : 1,
            mobileSpaceBetween : 0,
            desktopSpaceBetween : 0,
            desktopLargeSlidesPerView:1,
            desktopLargeSpaceBetween:0,
            withPagination: true,
            sliderIdentifier: "message-detail-images",
            sliderWrapperClassName: "rounded-t-lg w-full h-64 2xl:h-80"
          }}
          badgeClass="bg-primary-100 text-primary"
          images={map(
            get(selectedThread, "reservation.listing.pictures"),
            (image) => image.path
          )}>
          <div className="flex justify-between items-center">
            <div className="flex gap-x-2 items-start text-base">
              <CalendarIcon className="scale-95 fill-gray-600" />
              <div className="flex flex-col">
                <Typography
                  variant="p3"
                  element="span"
                  className="text-gray-700">
                  {t("check_in")}
                </Typography>
                <Typography
                  variant="p4"
                  element="span"
                  className="text-gray-800">
                  {get(selectedThread, "reservation.check_in")}
                </Typography>
              </div>
            </div>
            <div className="flex gap-x-2 items-start text-base">
              <CalendarIcon className="scale-95 fill-gray-600" />
              <div className="flex flex-col">
                <Typography
                  variant="p3"
                  element="span"
                  className="text-gray-700">
                  {t("check_out")}
                </Typography>
                <Typography
                  variant="p4"
                  element="span"
                  className="text-gray-800">
                  {get(selectedThread, "reservation.check_out")}
                </Typography>
              </div>
            </div>
          </div>
          <div className="flex text-black items-center justify-between border-t border-t-gray-200 mt-3 pt-3">
            <div className="text-lg">
              <Typography variant="p3" element="span">
                {t("total_amount") + " "}
              </Typography>
              <Typography
                variant="p3"
                element="span"
                className="font-mi-sans text-gray-400">
                ({get(selectedThread, "reservation.total_nights")} {t("nights")}
                )
              </Typography>
            </div>
            <div className="text-primary text-28">
              {get(selectedThread, "reservation.price.final")}
            </div>
          </div>
          <Button
            variant="btn-link"
            link={`/${get(
              selectedThread,
              "reservation.listing.slug"
            )}`}
            className="flex w-full justify-between text-primary text-lg underline px-0">
            <Typography variant="p3" element="span" className="cursor-pointer">
              {t("see_details")}
            </Typography>
            <NextIcon className="cursor-pointer" />
          </Button>
        </Card>
      </Loading>
    </aside>
  );
};

export default InboxThreadListing;
