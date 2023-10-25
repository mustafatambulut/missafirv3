"use client";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { get, map, size } from "lodash";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import {
  fetchRecentReservations,
  fetchRecentReservationsByPage
} from "@/redux/features/profileSlice";
import { useTranslations } from "next-intl";

import Button from "@/components/atoms/button/Button";
import Loading from "@/components/atoms/loading/Loading";
import SelectFilter from "@/components/atoms/selectFilter/SelectFilter";
import ReservationItem from "@/components/molecules/reservationItem/ReservationItem";
import ReservationListSkeleton from "@/components/molecules/skeletons/reservationListSkeleton/ReservationListSkeleton";

import PlaneIcon from "../../../../public/images/plane.svg";
import AllIcon from "../../../../public/images/circles.svg";
import ConfirmedIcon from "../../../../public/images/confirmed.svg";
import CancelledIcon from "../../../../public/images/cancelled.svg";
import InfiniteScroll from "react-infinite-scroll-component";
import Typography from "@/components/atoms/typography/Typography";

const ReservationList = () => {
  const dispatch = useAppDispatch();
  const t = useTranslations();
  const [recentReservationsPromise, setRecentReservationsPromise] = useState();
  const { reservations, loading, pagination, reservationsLoaded } =
    useAppSelector((state) => state.profileReducer);
  const [activeFilter, setActiveFilter] = useState<string>("");
  const filterOptionIconClass = (type: string): string => {
    return classNames("fill-gray", {
      "fill-primary": activeFilter === type
    });
  };

  const filterOptionButtonClass = (type: string): string => {
    return classNames(
      "relative outline-none px-0 pb-2 text-xl cursor-pointer flex gap-x-3 items-center hover:text-gray text-gray transition-none",
      {
        "text-primary hover:text-primary": type === activeFilter
      }
    );
  };

  const tabMenuBorderClass = (type: string): string => {
    return classNames(
      "absolute bottom-0 left-0 w-full bg-primary rounded-xl h-1",
      {
        block: activeFilter === type,
        hidden: activeFilter !== type
      }
    );
  };

  // todo: dil seçeneği ekleyince güncellenecek
  const filterOptions = [
    {
      attributes: {
        type: "filter",
        value: "",
        label: t("all"),
        icon: <AllIcon className={filterOptionIconClass("")} />
      }
    },
    {
      attributes: {
        type: "filter",
        value: "confirmed",
        label: t("confirmed"),
        icon: <ConfirmedIcon className={filterOptionIconClass("confirmed")} />
      }
    },
    {
      attributes: {
        type: "filter",
        value: "pending",
        label: t("pending"),
        icon: <PlaneIcon className={filterOptionIconClass("pending")} />
      }
    },
    {
      attributes: {
        type: "filter",
        value: "cancelled",
        label: t("cancelled"),
        icon: <CancelledIcon className={filterOptionIconClass("cancelled")} />
      }
    }
  ];

  const handleLoadNextPage = () => {
    pagination.current !== pagination.total &&
      dispatch(
        fetchRecentReservationsByPage({
          activeFilter,
          page: pagination.current + 1
        })
      );
  };

  const handleGetRecentReservations = (filter: string) => {
    setActiveFilter(filter);
    if (recentReservationsPromise) {
      recentReservationsPromise?.abort();
    }
    const promise = dispatch(fetchRecentReservations(activeFilter));
    setRecentReservationsPromise(promise);
  };

  useEffect(() => {
    handleGetRecentReservations(activeFilter);
  }, []);

  return (
    <div className="flex flex-col gap-y-3">
      <div className="hidden lg:flex justify-between items-center">
        <Typography
          variant="h4"
          element="h4"
          className="text-gray-800 font-mi-sans-semi-bold">
          {t("past_reservations")}
        </Typography>
      </div>
      <div className="grid grid-cols-1 gap-y-2">
        <div>
          <div className="hidden lg:flex gap-4">
            {map(filterOptions, (filter, key) => (
              <Button
                key={key}
                className={filterOptionButtonClass(filter.attributes.value)}
                variant="btn-ghost"
                onClick={() =>
                  handleGetRecentReservations(filter.attributes.value)
                }>
                {get(filter, "attributes.icon")}
                <Typography variant="p3" element="span">
                  {get(filter, "attributes.label")}
                </Typography>
                <div
                  className={tabMenuBorderClass(
                    get(filter, "attributes.value")
                  )}></div>
              </Button>
            ))}
          </div>
          <div className="lg:hidden w-[60%] border border-gray-400 rounded-lg">
            <SelectFilter onChange={setActiveFilter} />
          </div>
        </div>
      </div>
      <Loading isLoading={loading} loader={<ReservationListSkeleton />}>
        <InfiniteScroll
          scrollThreshold={0.6}
          next={handleLoadNextPage}
          hasMore={pagination.current !== pagination.total}
          loader={<ReservationListSkeleton />}
          dataLength={size(reservations)}
          className="relative gap-y-5 py-2 pr-1 flex flex-col">
          {size(reservations) === 0 && reservationsLoaded ? (
            <div className="text-sm lg:text-lg h-screen">
              {t("no_reservation_found")}
            </div>
          ) : (
            map(reservations, (reservation, key) => (
              <ReservationItem reservation={reservation} key={key} />
            ))
          )}
        </InfiniteScroll>
      </Loading>
    </div>
  );
};

export default ReservationList;
