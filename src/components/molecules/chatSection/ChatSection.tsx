"use client";
import { useEffect, useRef, useState } from "react";
import { get, isEqual, map, size } from "lodash";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchThreadDetails,
  postMessageToThread
} from "@/redux/features/inboxSlice/inboxSlice";

import { IChatSection } from "@/components/molecules/chatSection/types";
import { useTranslations } from "next-intl";

import "./ChatSection.css";

import Input from "@/components/atoms/input/Input";
import Loading from "@/components/atoms/loading/Loading";
import InboxThreadChatBoxSkeleton from "@/components/molecules/skeletons/inboxThreadChatBoxSekeleton/InboxThreadChatBoxSkeleton";

import SendIcon from "../../../../public/images/send.svg";
import { useSearchParams } from "next/navigation";

const ChatSection = ({ className = "" }: IChatSection) => {
  const chatBoxRef = useRef(null);
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("");
  const {
    threadDetailsLoading,
    selectedThreadId,
    threadDetails,
    sendMessageLoading,
    notFound
  } = useAppSelector((state) => state.inboxReducer, isEqual);
  const t = useTranslations();
  const chatWrapperClass = (isIncoming) => {
    return classNames("chat", {
      "chat-start": isIncoming,
      "chat-end": !isIncoming
    });
  };
  const chatInnerClass = (isIncoming) => {
    return classNames(
      "chat-bubble text-black lg:shadow-base-blur-5 flex items-center",
      {
        "bg-primary-25": !isIncoming,
        "bg-white": isIncoming
      }
    );
  };
  const handleMessage = (id = null, body = null) => {
    if (id && body) {
      dispatch(postMessageToThread({ id, message: body })).then((res) =>
        setMessage("")
      );
    } else {
      if (message !== "") {
        dispatch(postMessageToThread({ id: selectedThreadId, message })).then(
          (res) => setMessage("")
        );
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) handleMessage();
  };

  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      const scrollHeight = chatBoxRef.current.scrollHeight;
      const height = chatBoxRef.current.clientHeight;
      const maxScrollTop = scrollHeight - height;
      chatBoxRef.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
  };

  useEffect(() => {
    let threadInterval = null;
    if (selectedThreadId) {
      window !== undefined &&
        window.threadInterval &&
        window.clearInterval(window.threadInterval);
      if (notFound === false) {
        threadInterval = setInterval(() => {
          selectedThreadId &&
            dispatch(
              fetchThreadDetails({ selectedThreadId, isInterval: true })
            );
        }, 3 * 1000);
      }
    }
    return () => {
      window !== undefined && window.clearInterval(threadInterval);
    };
  }, [selectedThreadId]);

  useEffect(() => {
    if (
      !threadDetailsLoading &&
      threadDetails !== null &&
      selectedThreadId !== null &&
      !notFound
    ) {
      if (!searchParams.has("recent") && searchParams.has("id")) {
        if (!isNaN(searchParams.get("id")) && searchParams.get("id") !== "") {
          const threadId = parseInt(searchParams.get("id"));
          handleMessage(threadId, t("hello"));
        }
      }
    }
  }, [threadDetailsLoading]);

  useEffect(() => {
    scrollToBottom();
  }, [threadDetails]);

  return (
    <div className={`font-mi-sans text-sm ${className}`}>
      <div
        className="overflow-y-auto h-[34rem] lg:h-[22.3rem]"
        ref={chatBoxRef}>
        <Loading
          isLoading={threadDetailsLoading}
          loader={<InboxThreadChatBoxSkeleton />}>
          {size(threadDetails) > 0 ? (
            map(threadDetails, ({ body, created_at, is_incoming }, key) => (
              <div className="flex flex-col gap-y-4" key={key}>
                <div className={chatWrapperClass(is_incoming)}>
                  <div className={chatInnerClass(is_incoming)}>{body}</div>
                  <div className="chat-footer opacity-50 mt-2 text-xs	text-xs">
                    {created_at}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center h-full">
              {t("no_messages_yet")}
            </div>
          )}
        </Loading>
      </div>
      <div>
        <Input
          type="text"
          name="message"
          label=""
          onKeyUp={handleKeyPress}
          righticon={
            <button
              disabled={sendMessageLoading}
              onClick={handleMessage}
              className="flex mx-4 cursor-pointer z-50">
              {sendMessageLoading ? (
                <span className="loading loading-spinner scale-75 text-primary"></span>
              ) : (
                <SendIcon />
              )}
            </button>
          }
          placeholder={t("write_your_message")}
          containerclass="text-lg"
          value={message}
          onChange={({ target }) => setMessage(get(target, "value"))}
        />
      </div>
    </div>
  );
};

export default ChatSection;
