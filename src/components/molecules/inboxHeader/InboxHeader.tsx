import { ReactNode } from "react";
import { get, isEqual } from "lodash";
import { isMobile } from "react-device-detect";
import Loading from "@/components/atoms/loading/Loading";
import InboxThreadHeaderSkeleton from "@/components/molecules/skeletons/inboxThreadHeaderSkeleeton/InboxThreadHeaderSkeleton";
import {
  changeSelectedThreadId,
  updateThreadDetails
} from "@/redux/features/inboxSlice/inboxSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import ArrowLeftIcon from "../../../../public/images/arrow_left.svg";
import InfoIcon from "../../../../public/images/info.svg";
import Typography from "@/components/atoms/typography/Typography";

const InboxHeader = () => {
  const dispatch = useAppDispatch();
  const { threadDetails, selectedThread } = useAppSelector(
    (state) => state.inboxReducer,
    isEqual
  );

  const handleClickBack = () => {
    dispatch(updateThreadDetails(null));
    dispatch(changeSelectedThreadId(null));
  };
  const MobileHeaderComponent = (): ReactNode => {
    return (
      <div className="flex items-center justify-between px-4 bg-white w-full fixed z-30 h-20 left-0 top-[64px]">
        <div className="flex items-center gap-x-4">
          <div onClick={handleClickBack}>
            <ArrowLeftIcon />
          </div>
          <Typography variant="h5" element="h5">
            {get(selectedThread, "title")}
          </Typography>
        </div>
        <label
          htmlFor="inbox-listing-drawer"
          className="drawer-button ml-auto mr-3">
          <InfoIcon />
        </label>
      </div>
    );
  };

  return isMobile ? (
    threadDetails && <MobileHeaderComponent />
  ) : (
    <header className="flex bg-white p-4 rounded-xl justify-between">
      <Loading
        isLoading={!selectedThread}
        loader={<InboxThreadHeaderSkeleton />}>
        <Typography variant="h5" element="h5" className="text-gray-800">
          {get(selectedThread, "title")}
        </Typography>
      </Loading>
    </header>
  );
};

export default InboxHeader;
