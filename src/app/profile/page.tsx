"use client";
import React, { useState } from "react";
import { get, map } from "lodash";
import classNames from "classnames";
import { isMobile } from "react-device-detect";

import Button from "@/components/atoms/button/Button";
import SelectSort from "@/components/atoms/selectSort/SelectSort";
import SelectFilter from "@/components/atoms/selectFilter/SelectFilter";
import ReservationList from "@/components/molecules/reservationList/ReservationList";
import ReservationDetail from "@/components/molecules/reservationDetail/ReservationDetail";

import FileIcon from "../../../public/images/file.svg";
import AllIcon from "../../../public/images/circles.svg";
import PlaneIcon from "../../../public/images/plane.svg";
import UserIcon from "../../../public/images/user_dark.svg";
import CommentIcon from "../../../public/images/comment.svg";
import SettingIcon from "../../../public/images/setting.svg";
import HeartIcon from "../../../public/images/heart_outline.svg";
import ConfirmedIcon from "../../../public/images/confirmed.svg";
import CancelledIcon from "../../../public/images/cancelled.svg";

const Profile = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [activeFilter, setActiveFilter] = useState<number>(0);

  const filterOptionIconClass = (index: number): string => {
    return classNames("fill-gray", {
      "fill-primary": activeFilter === index
    });
  };

  const filterOptionButtonClass = (index: number): string => {
    return classNames(
      "outline-none px-0 text-xl cursor-pointer flex gap-x-3 items-center hover:text-gray text-gray transition-none",
      {
        "text-primary hover:text-primary": activeFilter === index
      }
    );
  };

  const tabMenuItemClass = (index: number): string => {
    return classNames(
      "tab lg:border-gray-50 lg:px-5 pb-3 lg:py-4 h-auto whitespace-nowrap lg:flex-wrap w-full before:hidden flex justify-start items-center border-b-none text-gray-600 text-sm lg:text-xl font-mi-sans-semi-bold px-0 border-b-transparent",
      {
        "tab-active text-primary": activeTab === index
      }
    );
  };

  const tabMenuIconClass = (index: number): string => {
    return classNames("scale-125 fill-gray hover:text-gray-600", {
      "fill-primary": activeTab === index
    });
  };
  // todo: dil seçeneği ekleyince güncellenecek
  const filterOptions = [
    {
      attributes: {
        type: "filter",
        value: "all",
        label: "All",
        icon: <AllIcon className={filterOptionIconClass(0)} />
      }
    },
    {
      attributes: {
        type: "filter",
        value: "confirmed",
        label: "Confirmed",
        icon: <ConfirmedIcon className={filterOptionIconClass(1)} />
      }
    },
    {
      attributes: {
        type: "filter",
        value: "pending",
        label: "Pending",
        icon: <PlaneIcon className={filterOptionIconClass(2)} />
      }
    },
    {
      attributes: {
        type: "filter",
        value: "cancelled",
        label: "Cancelled",
        icon: <CancelledIcon className={filterOptionIconClass(3)} />
      }
    }
  ];

  // todo: dil seçeneği ekleyince güncellenecek
  const tabData = {
    tabItems: [
      {
        icon: <UserIcon className={tabMenuIconClass(0)} />,
        label: "Temel Bilgiler"
      },
      {
        icon: <FileIcon className={tabMenuIconClass(1)} />,
        label: "Geçmiş Rezervasyonlar"
      },
      {
        icon: <CommentIcon className={tabMenuIconClass(2)} />,
        label: "Değerlendirmeler"
      },
      {
        icon: <HeartIcon className={tabMenuIconClass(3)} />,
        label: "İstek Listelerim"
      },
      {
        icon: <SettingIcon className={tabMenuIconClass(4)} />,
        label: "Ayarlar"
      }
    ]
  };

  return (
    <div className="tab-container flex flex-col lg:flex-row pt-28 px-5 lg:px-40 lg:gap-x-7">
      <div className="lg:w-1/4">
        <div className="tabs lg:divide-y flex-nowrap overflow-x-auto no-scrollbar flex flex-row lg:flex-col gap-3 lg:gap-0 lg:items-start lg:shadow-base-blur-10 lg:rounded-xl">
          {map(get(tabData, "tabItems"), (listingTab, key) => (
            <div
              key={key}
              className={tabMenuItemClass(key)}
              onClick={() => setActiveTab(key)}>
              <div className="flex gap-3 items-center">
                <div className="hidden lg:block">{get(listingTab, "icon")}</div>
                <span>{get(listingTab, "label")}</span>
              </div>
              {key === activeTab && isMobile && (
                <div className="absolute bottom-0 left-0 w-full bg-primary rounded-t-xl h-1"></div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="tab-content flex-1 grid grid-cols-1 gap-y-4">
        <div className="hidden lg:flex justify-between items-center">
          <h1 className="text-gray-800 font-mi-sans-semi-bold text-28">
            Geçmiş Rezervasyonlar
          </h1>
          <div className="relative">
            <SelectSort />
          </div>
        </div>
        <div className="mt-4 lg:mt-0">
          <div className="hidden lg:flex gap-4">
            {map(filterOptions, (filter, key) => (
              <Button
                className={filterOptionButtonClass(key)}
                variant="btn-ghost"
                onClick={() => setActiveFilter(key)}>
                {get(filter, "attributes.icon")}
                <span>{get(filter, "attributes.label")}</span>
              </Button>
            ))}
          </div>
          <div className="lg:hidden flex justify-between">
            <SelectFilter />
            <SelectSort />
          </div>
        </div>
        <ReservationList />
        <ReservationDetail />
      </div>
    </div>
  );
};

export default Profile;
