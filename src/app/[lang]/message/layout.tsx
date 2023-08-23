"use client";
import { ReactNode, useEffect, useState } from "react";
import classNames from "classnames";
import { find, first, get, map } from "lodash";
import { isMobile } from "react-device-detect";

import {
  changeFavored,
  changeClickInbox,
  changeActiveChatId
} from "@/redux/features/messageSlice/messageSlice";
import { IMessageLayout } from "@/app/[lang]/message/types";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import Badge from "@/components/atoms/badge/Badge";
import InboxCard from "@/components/molecules/inboxCard/InboxCard";
import Card from "@/components/organisms/card/Card";

import ArrowLeftIcon from "../../../../public/images/arrow_left.svg";
import NextIcon from "../../../../public/images/variants/chevron_right.svg";

const MessageLayout = ({ children }: IMessageLayout) => {
  const dispatch = useAppDispatch();
  const [isFav, setIsFav] = useState(false);
  const { mockData, chats, activeChat, isClickInbox } = useAppSelector(
    (state) => state.messageReducer
  );

  const selectedChat = find(chats, ["id", get(activeChat, "id")]);

  const inboxClass = (key: number) => {
    return classNames("my-4 cursor-pointer", {
      "bg-gray-50": get(activeChat, "id") === key && !isMobile,
      "mx-auto bg-white": isMobile
    });
  };

  const mainClass = classNames(
    "flex flex-col-reverse lg:flex-row gap-x-5 lg:mt-28 bg-gray-100 p-4 lg:p-10",
    {
      "mt-32": isClickInbox,
      "mt-20": !isClickInbox
    }
  );

  const handleClickInbox = (key: number) => {
    dispatch(changeClickInbox(true));
    dispatch(changeActiveChatId(key));
  };

  useEffect(() => {
    dispatch(changeFavored(isFav));
  }, [isFav]);

  const MobileHeaderComponent = (): ReactNode => {
    return (
      <div
        onClick={() => dispatch(changeClickInbox(false))}
        className="flex items-center gap-x-4 text-lg bg-white w-full fixed z-30 h-20 left-0 top-12">
        <ArrowLeftIcon />
        {get(selectedChat, "data.[0].subject")}
      </div>
    );
  };

  const HeaderComponent = (): ReactNode => {
    return isMobile ? (
      isClickInbox && <MobileHeaderComponent />
    ) : (
      <header className="flex bg-white p-4 rounded-xl justify-between">
        <div>
          <h1 className="text-2xl">{get(selectedChat, "data.[0].subject")}</h1>
          <h3 className="text-base text-gray-400">
            {get(mockData, "inbox.subTitle")}
          </h3>
        </div>
      </header>
    );
  };

  const TitleComponent = (): ReactNode => {
    return (
      <div className="flex flex-col gap-y-2">
        <Badge className="bg-success-green p-3 rounded-md text-base text-white border-none">
          {get(mockData, "status")}
        </Badge>
        <h2>{get(mockData, "title")}</h2>
        <h6 className="text-base text-gray-400">{get(mockData, "location")}</h6>
      </div>
    );
  };

  return (
    <main className={mainClass}>
      {(!isMobile || (!isClickInbox && isMobile)) && (
        <aside className="lg:bg-white w-full lg:w-1/4 p-4 rounded-xl">
          {map(chats, ({ date, data }, key) => (
            <InboxCard
              key={key}
              date={date}
              onClick={() => handleClickInbox(key)}
              isNotify={true}
              showStatus={false}
              className={inboxClass(key)}
              subject={get(first(data), "subject")}
              message={get(first(data), "start.message")}
            />
          ))}
        </aside>
      )}
      <section className="flex flex-col gap-y-5 w-full lg:w-2/4 rounded-xl lg:px-4">
        <HeaderComponent />
        {children}
      </section>
      {!isMobile && (
        <aside className="bg-white lg:w-1/4 rounded-xl">
          <Card
            setIsFav={setIsFav}
            showBadge={true}
            badgeTitle="Home"
            bodyClass="p-3"
            titleClass="p-3"
            className="rounded-xl"
            title={<TitleComponent />}
            sliderOptions={{
              slidesPerView: 1,
              spaceBetween: 0,
              withPagination: true,
              sliderIdentifier: "message-detail-images",
              sliderWrapperClassName: "rounded-t-lg w-full h-64 2xl:h-80"
            }}
            badgeClass="bg-primary-100 text-primary"
            images={get(mockData, "images")}>
            <div className="flex text-black items-center justify-between">
              <div className="text-lg">
                Total amount
                <span className="font-mi-sans text-gray-400">(11 nights)</span>
              </div>
              <div className="text-primary text-28">
                {get(mockData, "amount")}
              </div>
            </div>
            {/*todo: see details eklenecek*/}
            <div
              onClick={() => alert("see details")}
              className="flex w-full justify-between text-primary text-lg underline">
              <div className="cursor-pointer">See Details</div>
              <NextIcon className="cursor-pointer" />
            </div>
          </Card>
        </aside>
      )}
    </main>
  );
};

export default MessageLayout;
