"use client";
import Link from "next/link";
import get from "lodash/get";
import map from "lodash/map";
import includes from "lodash/includes";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

import UserInfo from "@/components/atoms/userInfo/UserInfo";
import Typography from "@/components/atoms/typography/Typography";

import FileIcon from "../../../../public/images/file.svg";
import LockIcon from "../../../../public/images/lock.svg";
import UserIcon from "../../../../public/images/user_dark.svg";
//import CommentIcon from "../../../../public/images/comment.svg";
//import SettingIcon from "../../../../public/images/setting.svg";
//import HeartIcon from "../../../../public/images/heart_outline.svg";

const ProfileSidebar = () => {
  const pathname = usePathname();
  const t = useTranslations();
  const locale = useLocale();
  const tabMenuIconClass = (type: string): string => {
    return classNames("scale-125 fill-gray hover:text-gray-600", {
      "fill-primary":
        includes(pathname, type) ||
        (type === "info" && pathname === `/${locale}/profile`)
    });
  };

  const tabMenuBorderClass = (type: string): string => {
    return classNames(
      "absolute bottom-0 left-0 w-full bg-primary rounded-t-xl h-1 lg:hidden",
      {
        block:
          includes(pathname, type) ||
          (type === "info" && pathname === `/${locale}/profile`),
        hidden:
          type === "info"
            ? pathname !== `/${locale}/profile` &&
              pathname !== `/${locale}/profile/info`
            : !includes(pathname, type)
      }
    );
  };

  const tabMenuItemClass = (type: string): string => {
    return classNames(
      "tab lg:border-gray-50 lg:px-5 pb-3 lg:py-5 h-auto whitespace-nowrap lg:flex-wrap w-full before:hidden flex justify-center lg:justify-start items-center border-b-none text-gray-600 text-base lg:text-22 font-mi-sans-semi-bold px-0 border-b-transparent",
      {
        "tab-active text-primary":
          includes(pathname, type) ||
          (type === "info" && pathname === `/${locale}/profile`)
      }
    );
  };

  // todo: dil seçeneği ekleyince güncellenecek
  const tabData = {
    tabItems: [
      {
        type: "info",
        icon: <UserIcon className={tabMenuIconClass("info")} />,
        label: t("basic_knowledge")
      },
      {
        type: "reservations",
        icon: <FileIcon className={tabMenuIconClass("reservations")} />,
        label: t("my_travels")
      },
      {
        type: "password",
        icon: <LockIcon className={tabMenuIconClass("password")} />,
        label: t("password_transactions")
      }
      // {
      //   type: "reviews",
      //   icon: <CommentIcon className={tabMenuIconClass("reviews")} />,
      //   label: t("my_reviews")
      // },
      // {
      //   type: "wishlist",
      //   icon: <HeartIcon className={tabMenuIconClass("wishlist")} />,
      //   label: t("my_wishlist")
      // }
      //todo: geçici süreliğine gizlendi

      // {
      //   type: "settings",
      //   icon: <SettingIcon className={tabMenuIconClass("settings")} />,
      //   label: "Ayarlar"
      // }
    ]
  };

  return (
    <div className="lg:w-80 flex flex-col gap-y-3 lg:gap-y-8">
      <UserInfo />
      <div className="tabs max-w-full lg:divide-y overflow-x-auto no-scrollbar flex flex-row flex-nowrap lg:flex-col gap-4 lg:gap-0 lg:items-start lg:shadow-base-blur-10 lg:rounded-xl">
        {map(get(tabData, "tabItems"), (listingTab, key) => (
          <Link
            shallow={true}
            href={`/profile/${get(listingTab, "type")}`}
            key={key}
            className={tabMenuItemClass(get(listingTab, "type"))}>
            <div className="flex gap-3 items-center">
              <div className="hidden lg:block">
                <div>{get(listingTab, "icon")}</div>
              </div>
              <Typography variant="p2" element="span">
                {get(listingTab, "label")}
              </Typography>
            </div>
            <div className={tabMenuBorderClass(get(listingTab, "type"))}></div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProfileSidebar;
