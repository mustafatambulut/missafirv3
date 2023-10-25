"use client";
import { useEffect } from "react";
import classNames from "classnames";
import { isMobile } from "react-device-detect";
import { first, get, isEqual, map, size } from "lodash";
import InfiniteScroll from "react-infinite-scroll-component";

import InboxCard from "@/components/molecules/inboxCard/InboxCard";
import InboxThreadListSkeleton from "@/components/molecules/skeletons/inboxThreadListSkeleton/InboxThreadListSkeleton";

import {
  changeNotFound,
  fetchThreadDetails,
  fetchThreadListByPage
} from "@/redux/features/inboxSlice/inboxSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Loading from "@/components/atoms/loading/Loading";
import { useRouter, useSearchParams } from "next/navigation";
import Typography from "@/components/atoms/typography/Typography";
import { useTranslations } from "next-intl";
import Button from "@/components/atoms/button/Button";

import EmptyFile from "../../../../public/images/empty_file.svg";

const InboxThreadList = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations();
  const {
    threadList,
    pagination,
    selectedThreadId,
    threadListLoading,
    threadListLoaded
  } = useAppSelector((state) => state.inboxReducer, isEqual);
  const inboxClass = (id: number) => {
    return classNames("my-4 cursor-pointer", {
      "bg-gray-50": selectedThreadId === id && !isMobile,
      "mx-auto bg-white": isMobile
    });
  };
  const handleClickInbox = (id) => {
    if (searchParams.has("id")) {
      router.replace("/inbox", undefined, { shallow: true });
    }
    dispatch(fetchThreadDetails({ selectedThreadId: id }));
  };

  const handleLoadNextPage = () => {
    pagination.current !== pagination.total &&
      dispatch(
        fetchThreadListByPage({
          page: pagination.current + 1
        })
      );
  };

  useEffect(() => {
    if (size(threadList)) {
      if (searchParams.has("id")) {
        if (!isNaN(searchParams.get("id")) && searchParams.get("id") !== "") {
          const threadId = parseInt(searchParams.get("id"));
          dispatch(fetchThreadDetails({ selectedThreadId: threadId }));
        } else {
          dispatch(changeNotFound(true));
        }
      } else {
        !isMobile &&
          dispatch(
            fetchThreadDetails({
              selectedThreadId: get(first(threadList), "id")
            })
          );
      }
    }
  }, [threadList]);

  return (
    <aside
      className="lg:bg-white w-full lg:w-1/4 lg:p-4 rounded-xl h-full lg:h-[35rem] overflow-y-auto"
      id="thread-list">
      <Loading
        isLoading={threadListLoading}
        loader={<InboxThreadListSkeleton />}>
        {threadListLoaded && size(threadList) === 0 ? (
          <div className="flex flex-col justify-center items-center w-[90%] h-full m-auto">
            <EmptyFile />
            <div className="text-center my-8">
              <Typography variant="h6" element="h6" className="text-primary">
                {t("you_have_no_messages")}
              </Typography>
              <Typography
                variant="p3"
                element="p"
                className="text-gray-600 text-center">
                {t("nothing_to_see_here_your_inbox_is_empty")}
              </Typography>
            </div>
            <Button variant="btn-primary">{t("contact_us")}</Button>
          </div>
        ) : (
          <InfiniteScroll
            scrollableTarget="thread-list"
            scrollThreshold={0.6}
            next={handleLoadNextPage}
            hasMore={
              pagination
                ? get(pagination, "current") !== get(pagination, "total")
                : false
            }
            loader={<InboxThreadListSkeleton />}
            dataLength={size(threadList)}>
            {map(
              threadList,
              ({
                created_at,
                last_message_at,
                last_message,
                id,
                title,
                reservation
              },key) => (
                <InboxCard
                  key={key}
                  date={last_message_at || created_at}
                  className={inboxClass(id)}
                  onClick={() => handleClickInbox(id)}
                  status={get(reservation, "state")}
                  subject={title}
                  message={last_message || ""}
                />
              )
            )}
          </InfiniteScroll>
        )}
      </Loading>
    </aside>
  );
};

export default InboxThreadList;
