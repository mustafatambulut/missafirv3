"use client";
import InboxThreadList from "@/components/molecules/inboxThreadList/InboxThreadList";
import InboxHeader from "@/components/molecules/inboxHeader/InboxHeader";
import InboxListingDetailDrawer from "@/components/molecules/inboxListingDetailDrawer/InboxListingDetailDrawer";
import ChatSection from "@/components/molecules/chatSection/ChatSection";
import { useAppSelector } from "@/redux/hooks";
import { isEqual } from "lodash";
import classNames from "classnames";
import InboxNotFoundComponent from "@/components/molecules/inboxNotFoundComponent/InboxNotFoundComponent";

const MobileThreadSection = () => {
  const { selectedThreadId, notFound } = useAppSelector(
    (state) => state.inboxReducer,
    isEqual
  );

  const mainClass = classNames(
    "flex flex-col lg:flex-row lg:mt-28 bg-gray-50 px-4 pt-0 lg:p-10 mt-20 inbox-container lg:h-auto relative",
    { "h-screen": notFound }
  );

  return (
    <div className={mainClass}>
      {notFound ? (
        <InboxNotFoundComponent />
      ) : selectedThreadId === null ? (
        <InboxThreadList />
      ) : (
        <div className="flex flex-col flex-1">
          <InboxHeader />
          <InboxListingDetailDrawer />
          <div className="mt-20">
            <ChatSection />
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileThreadSection;
