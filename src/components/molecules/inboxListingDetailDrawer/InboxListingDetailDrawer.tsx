"use client";
import { useRef } from "react";
import { get, isEqual } from "lodash";
import { createPortal } from "react-dom";
import { isMobile } from "react-device-detect";

import { useAppSelector } from "@/redux/hooks";

import Typography from "@/components/atoms/typography/Typography";
import InboxThreadListing from "@/components/molecules/inboxThreadListing/InboxThreadListing";

import CloseIcon from "../../../../public/images/variants/close.svg";

const InboxListingDetailDrawer = () => {
  const drawerCloseRef = useRef<HTMLInputElement>(null);
  const { selectedThread } = useAppSelector(
    (state) => state.inboxReducer,
    isEqual
  );
  //todo: drawer eklenince düzenlenecek

  const closeDrawer = () => {
    if (drawerCloseRef && drawerCloseRef.current) {
      drawerCloseRef.current.checked = false;
    }
  };

  return (
    typeof window !== "undefined" &&
    isMobile &&
    createPortal(
      <div className="drawer drawer-end z-50">
        <input
          ref={drawerCloseRef}
          id="inbox-listing-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content"></div>
        <div className="drawer-side">
          <label
            htmlFor="inbox-listing-drawer"
            className="drawer-overlay"></label>
          <div className="w-[90%] min-h-full bg-white">
            <div className="shadow-base-blur-20 py-5 px-4 flex justify-between items-center">
              <Typography variant="h5" element="h5" className="text-gray-800">
                {get(selectedThread, "title")}
              </Typography>
              <div onClick={closeDrawer}>
                <CloseIcon className="fill-gray-800" />
              </div>
            </div>
            <div className="px-4">
              <InboxThreadListing />
            </div>
          </div>
        </div>
      </div>,
      window.document.body
    )
  );
};

export default InboxListingDetailDrawer;
