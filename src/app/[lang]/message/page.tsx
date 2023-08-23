"use client";
import { ReactNode } from "react";
import { find, get } from "lodash";
import { isMobile } from "react-device-detect";

import { useAppSelector } from "@/redux/hooks";
import { IMessage } from "@/app/[lang]/message/types";

import ChatSection from "@/components/molecules/chatSection/ChatSection";

const Message = ({ className = "" }: IMessage) => {
  const { chats, activeChat, isClickInbox } = useAppSelector(
    (state) => state.messageReducer
  );
  const selectedChat = find(chats, ["id", get(activeChat, "id")]);

  const MobileChatComponent = (): ReactNode => {
    return (
      <div>
        <ChatSection chats={get(selectedChat, "data")} />
      </div>
    );
  };

  return (
    <div className={`${className}`}>
      {isMobile ? (
        isClickInbox && <MobileChatComponent />
      ) : (
        <div className="bg-white rounded-xl p-4">
          <div className="flex justify-center mb-2 w-fit mx-auto rounded-lg font-medium text-sm shadow-base-blur-10 py-1 px-1.5">
            Today
          </div>
          <ChatSection chats={get(selectedChat, "data")} />
        </div>
      )}
    </div>
  );
};

export default Message;
