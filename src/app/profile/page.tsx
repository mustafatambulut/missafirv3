"use client";
import React, { useState } from "react";
import { get, map } from "lodash";
import { isMobile } from "react-device-detect";

import Button from "@/components/atoms/button/Button";
import SelectSort from "@/components/atoms/selectSort/SelectSort";
import SelectFilter from "@/components/atoms/selectFilter/SelectFilter";
import ReservationList from "@/components/molecules/reservationList/ReservationList";
import ReservationDetail from "@/components/molecules/reservationDetail/ReservationDetail";

import AllIcon from "../../../public/images/allicon.svg";
import UserIcon from "../../../public/images/user-dark.svg";
import FileIcon from "../../../public/images/fileicon.svg";
import CommentIcon from "../../../public/images/commenticon.svg";
import HeartIcon from "../../../public/images/hearticon.svg";
import SettingIcon from "../../../public/images/settingicon.svg";
import PlaneIcon from "../../../public/images/planeicon.svg";
import ConfirmedIcon from "../../../public/images/confirmedicon.svg";
import CancelledIcon from "../../../public/images/cancelledicon.svg";

const Profile = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeFilter, setActiveFilter] = useState(0);

  const filterOptions = [
    {
      attributes: {
        type: "filter",
        value: "all",
        label: "All",
        icon: (
          <AllIcon
            className={`fill-gray ${activeFilter === 0 && "fill-primary"}`}
          />
        )
      }
    },
    {
      attributes: {
        type: "filter",
        value: "confirmed",
        label: "Confirmed",
        icon: (
          <ConfirmedIcon
            className={`fill-gray ${activeFilter === 1 && "fill-primary"}`}
          />
        )
      }
    },
    {
      attributes: {
        type: "filter",
        value: "pending",
        label: "Pending",
        icon: (
          <PlaneIcon
            className={`fill-gray ${activeFilter === 2 && "fill-primary"}`}
          />
        )
      }
    },
    {
      attributes: {
        type: "filter",
        value: "cancelled",
        label: "Cancelled",
        icon: (
          <CancelledIcon
            className={`fill-gray ${activeFilter === 3 && "fill-primary"}`}
          />
        )
      }
    }
  ];

  const tabData = {
    tabItems: [
      {
        icon: (
          <UserIcon
            className={`scale-125 fill-gray ${
              activeTab === 0 && "fill-primary"
            }`}
          />
        ),
        label: "Temel Bilgiler"
      },
      {
        icon: (
          <FileIcon
            className={`scale-125 fill-gray ${
              activeTab === 1 && "fill-primary"
            }`}
          />
        ),
        label: "Geçmiş Rezervasyonlar"
      },
      {
        icon: (
          <CommentIcon
            className={`scale-125 fill-gray ${
              activeTab === 2 && "fill-primary"
            }`}
          />
        ),
        label: "Değerlendirmeler"
      },
      {
        icon: (
          <HeartIcon
            className={`scale-125 fill-gray ${
              activeTab === 3 && "fill-primary"
            }`}
          />
        ),
        label: "İstek Listelerim"
      },
      {
        icon: (
          <SettingIcon
            className={`scale-125 fill-gray ${
              activeTab === 4 && "fill-primary"
            }`}
          />
        ),
        label: "Ayarlar"
      }
    ]
  };

  return (
    <div className="tab-container flex flex-col lg:flex-row pt-28 px-5 lg:px-40 lg:gap-x-7">
      <div className="lg:w-1/4">
        <div className="tabs lg:divide-y flex-nowrap overflow-x-auto no-scrollbar flex flex-row lg:flex-col gap-3 lg:gap-0 lg:items-start lg:shadow-[0px_1px_10px_0px_#00000014] lg:rounded-xl">
          {map(get(tabData, "tabItems"), (listingTab, key) => (
            <div
              key={key}
              className={`tab lg:border-gray-50 lg:px-5 pb-3 lg:py-4 h-auto whitespace-nowrap lg:flex-wrap w-full before:hidden flex justify-start items-center border-b-none text-grey-600 text-sm lg:text-xl font-mi-sans-semi-bold px-0 ${
                key === activeTab
                  ? "tab-active text-primary"
                  : "border-b-transparent"
              }`}
              onClick={() => setActiveTab(key)}>
              <div className="flex gap-3 items-center">
                <div className="hidden lg:block">{listingTab.icon}</div>
                <span>{listingTab.label}</span>
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
                className={`outline-none px-0 text-xl cursor-pointer flex gap-x-3 items-center hover:text-gray text-gray transition-none ${
                  activeFilter === key && "text-primary hover:text-primary"
                }`}
                variant="btn-ghost"
                onClick={() => setActiveFilter(key)}>
                {filter.attributes.icon} <span>{filter.attributes.label}</span>
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
