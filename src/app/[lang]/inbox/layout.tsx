"use client";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { isMobile } from "react-device-detect";

import { fetchThreadList } from "@/redux/features/inboxSlice/inboxSlice";
import { IMessageLayout } from "@/app/[lang]/inbox/types";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import InboxThreadList from "@/components/molecules/inboxThreadList/InboxThreadList";
import InboxThreadListing from "@/components/molecules/inboxThreadListing/InboxThreadListing";
import InboxHeader from "@/components/molecules/inboxHeader/InboxHeader";
import { isEqual } from "lodash";
import InboxThreadHeaderSkeleton from "@/components/molecules/skeletons/inboxThreadHeaderSkeleeton/InboxThreadHeaderSkeleton";
import InboxThreadChatBoxSkeleton from "@/components/molecules/skeletons/inboxThreadChatBoxSekeleton/InboxThreadChatBoxSkeleton";
import InboxThreadListingSkeleton from "@/components/molecules/skeletons/inboxThreadListingSkeleton/InboxThreadListingSkeleton";

import InboxNotFoundComponent from "@/components/molecules/inboxNotFoundComponent/InboxNotFoundComponent";

import "./inbox.css";
import dynamic from "next/dynamic";

const MobileThreadSection = dynamic(
  () =>
    import("@/components/organisms/mobileThreadSection/MobileThreadSection"),
  {
    ssr: false
  }
);

const InboxLayout = ({ children }: IMessageLayout) => {
  const [isMobileDevice, setIsMobileDevice] = useState<boolean>(false);

  const { selectedThreadId, notFound, threadListLoaded } = useAppSelector(
    (state) => state.inboxReducer,
    isEqual
  );
  const dispatch = useAppDispatch();
  const mainClass = classNames(
    "flex flex-col lg:flex-row lg:mt-28 bg-gray-50 p-4 lg:p-10 mt-20 relative"
  );

  useEffect(() => {
    dispatch(fetchThreadList());
    setIsMobileDevice(isMobile);
  }, []);

  return isMobileDevice ? (
    <MobileThreadSection />
  ) : (
    <div className={mainClass}>
      <InboxThreadList />
      {selectedThreadId !== null && notFound === false ? (
        <>
          <section className="flex flex-col gap-y-5 w-full lg:w-2/4 rounded-xl lg:px-4">
            <InboxHeader />
            {children}
          </section>
          <InboxThreadListing />
        </>
      ) : notFound ? (
        <InboxNotFoundComponent />
      ) : (
        <div
          className={`flex flex-1 justify-between gap-x-5 ml-5 rounded-xl ${
            threadListLoaded ? "bg-white" : null
          }`}>
          <div className="flex-1 flex flex-col gap-y-5 rounded-xl">
            <div className="bg-white p-3 rounded-xl">
              {threadListLoaded ? null : <InboxThreadHeaderSkeleton />}
            </div>
            <div className="bg-white rounded-xl">
              {threadListLoaded ? null : <InboxThreadChatBoxSkeleton />}
            </div>
          </div>
          <div className="w-[32%]">
            {threadListLoaded ? null : <InboxThreadListingSkeleton />}
          </div>
        </div>
      )}
    </div>
  );
};

export default InboxLayout;
