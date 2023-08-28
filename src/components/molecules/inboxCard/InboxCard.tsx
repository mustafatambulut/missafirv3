import { ReactNode } from "react";
import classNames from "classnames";
import { isMobile } from "react-device-detect";

import {
  NOT_CHECK_IN,
  DONE_CHECK_IN,
  DONE_CHECK_OUT
} from "@/components/molecules/inboxCard/constants";
import { IInboxCard } from "@/components/molecules/inboxCard/types";

import NotCheckInIcon from "../../../../public/images/not_check_in.svg";
import DoneCheckInIcon from "../../../../public/images/done_check_in.svg";
import DoneCheckOutIcon from "../../../../public/images/done_check_out.svg";

const InboxCard = ({
  date = "",
  subject = "",
  message = "",
  statusDate = "",
  className = "",
  imageClass = "",
  isRead = false,
  imageSrc = false,
  showStatus = true,
  onClick,
  status = NOT_CHECK_IN
}: IInboxCard) => {
  const contentClass = classNames("block mr-auto", {
    "w-40": imageSrc,
    "w-48": !imageSrc,
    "2xl:w-56": showStatus,
    "2xl:w-80": showStatus && !imageSrc
  });

  const StatusComponent = (): ReactNode => {
    if (!showStatus) return;

    switch (status) {
      case NOT_CHECK_IN:
        return <NotCheckInIcon />;
      case DONE_CHECK_IN:
        return <DoneCheckInIcon />;
      case DONE_CHECK_OUT:
        return <DoneCheckOutIcon />;
    }
  };

  const ImageComponent = (): ReactNode => {
    return (
      imageSrc && (
        <div className="w-20 2xl:w-fit">
          <div className="indicator w-fit">
            {isRead && (
              <span className="indicator-item bg-primary w-3 h-3 rounded-full"></span>
            )}
            <div className="grid place-items-center">
              <img
                src={imageSrc}
                className={`rounded-xl w-14 h-14 object-cover ${imageClass}`}
                alt="inbox-image"
              />
            </div>
          </div>
        </div>
      )
    );
  };

  const MobileIsReadComponent = (): ReactNode => {
    if (!isRead || !isMobile) return;
    return <div className="bg-primary w-3 h-3 rounded-full"></div>;
  };

  return (
    <div
      onClick={onClick}
      className={`flex gap-x-3 rounded-xl p-3 ${className}`}>
      <ImageComponent />
      <div className={contentClass}>
        <div className="text-xs text-gray-300">{date}</div>
        <div className="text-base font-mi-sans-semi-bold truncate ">
          {subject}
        </div>
        <div className="text-sm truncate">{message}</div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <MobileIsReadComponent />
        <StatusComponent />
        <div className="text-xxs">{statusDate}</div>
      </div>
    </div>
  );
};

export default InboxCard;
