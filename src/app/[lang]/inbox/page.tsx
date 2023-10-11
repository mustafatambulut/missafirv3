"use client";
import { isMobile } from "react-device-detect";
import { isEqual } from "lodash";

import { useAppSelector } from "@/redux/hooks";
import { IMessage } from "@/app/[lang]/inbox/types";

import Loading from "@/components/atoms/loading/Loading";
import ChatSection from "@/components/molecules/chatSection/ChatSection";
import InboxThreadDaySkeleton from "@/components/molecules/skeletons/inboxThreadDaySkeleton/InboxThreadDaySkeleton";

const Inbox = ({ className = "" }: IMessage) => {
  const { threadDetailsLoading } = useAppSelector(
    (state) => state.inboxReducer,
    isEqual
  );

  return (
    <div className={`${className}`}>
      {isMobile ? (
        <ChatSection />
      ) : (
        <div className="bg-white rounded-xl p-4">
          <div className="flex justify-center mb-2 w-fit mx-auto rounded-lg font-medium text-sm shadow-base-blur-10 py-1 px-1.5">
            <Loading
              isLoading={threadDetailsLoading}
              loader={<InboxThreadDaySkeleton />}>
              Today
            </Loading>
          </div>
          <ChatSection />
        </div>
      )}
    </div>
  );
};

export default Inbox;
