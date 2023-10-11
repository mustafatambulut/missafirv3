"use client";
import { useEffect } from "react";
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

import MobileThreadSection from "@/components/organisms/mobileThreadSection/MobileThreadSection";
import InboxNotFoundComponent from "@/components/molecules/inboxNotFoundComponent/InboxNotFoundComponent";

const InboxLayout = ({ children }: IMessageLayout) => {
  const { selectedThreadId, notFound } = useAppSelector(
    (state) => state.inboxReducer,
    isEqual
  );
  const dispatch = useAppDispatch();
  const mainClass = classNames(
    "flex flex-col lg:flex-row lg:mt-28 bg-gray-50 p-4 lg:p-10 mt-20 relative"
  );

  useEffect(() => {
    dispatch(fetchThreadList());
  }, []);

  return isMobile ? (
    <MobileThreadSection />
  ) : (
    <main className={mainClass}>
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
        <div className="flex flex-1 justify-between gap-x-5 pl-5">
          <div className="flex-1 flex flex-col gap-y-5 rounded-xl">
            <div className="bg-white p-3 rounded-xl">
              <InboxThreadHeaderSkeleton />
            </div>
            <div className="bg-white rounded-xl">
              <InboxThreadChatBoxSkeleton />
            </div>
          </div>
          <div className="w-[32%]">
            <InboxThreadListingSkeleton />
          </div>
        </div>
      )}
    </main>
  );
};

export default InboxLayout;
