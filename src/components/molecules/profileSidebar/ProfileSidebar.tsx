"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { get, map } from "lodash";
import classNames from "classnames";
import { isMobile } from "react-device-detect";

import FileIcon from "../../../../public/images/file.svg";
import UserIcon from "../../../../public/images/user_dark.svg";
import CommentIcon from "../../../../public/images/comment.svg";
import SettingIcon from "../../../../public/images/setting.svg";
import HeartIcon from "../../../../public/images/heart_outline.svg";

const ProfileSidebar = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isMobileDevice, setIsMobileDevice] = useState<boolean>(false);
  const tabMenuIconClass = (index: number): string => {
    return classNames("scale-125 fill-gray hover:text-gray-600", {
      "fill-primary": activeTab === index
    });
  };

  // todo: test amacıyla eklenmiştir, silinecek
  const mockUserData = {
    avatar: "https://i.ibb.co/dm4mntF/avatar.jpg",
    fullName: "John Doe",
    email: "johndoe@missafir.com"
  };

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
  const tabMenuItemClass = (index: number): string => {
    return classNames(
      "tab lg:border-gray-50 lg:px-5 pb-3 lg:py-4 h-auto whitespace-nowrap lg:flex-wrap w-full before:hidden flex justify-start items-center border-b-none text-gray-600 text-sm lg:text-xl font-mi-sans-semi-bold px-0 border-b-transparent",
      {
        "tab-active text-primary": activeTab === index
      }
    );
  };

  useEffect(() => {
    setIsMobileDevice(isMobile);
  }, []);

  return (
    <div className="lg:w-80 flex flex-col gap-y-3 lg:gap-y-8">
      <div className="lg:shadow-base-blur-10 lg:rounded-xl flex items-center gap-2 lg:p-3 overflow-hidden">
        <div className="avatar">
          <div className="w-12 lg:w-16 rounded-full relative">
            <Image
              src={get(mockUserData, "avatar")}
              alt="user"
              fill={true}
              className="object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col items-start justify-center">
          <span className="text-22 lg:text-xl text-gray-800 font-mi-sans-semi-bold">
            {get(mockUserData, "fullName")}
          </span>
          <span className="text-base lg:text-lg text-gray-700 whitespace-nowrap max-w-full overflow-hidden">
            {get(mockUserData, "email")}
          </span>
        </div>
      </div>
      <div className="tabs max-w-full lg:divide-y overflow-x-auto no-scrollbar flex flex-row flex-nowrap lg:flex-col gap-3 lg:gap-0 lg:items-start lg:shadow-base-blur-10 lg:rounded-xl">
        {map(get(tabData, "tabItems"), (listingTab, key) => (
          <div
            key={key}
            className={tabMenuItemClass(key)}
            onClick={() => setActiveTab(key)}>
            <div className="flex gap-3 items-center">
              <div className="hidden lg:block">
                <div>{get(listingTab, "icon")}</div>
              </div>
              <span>{get(listingTab, "label")}</span>
            </div>
            {key === activeTab && isMobileDevice && (
              <div className="absolute bottom-0 left-0 w-full bg-primary rounded-t-xl h-1"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileSidebar;
