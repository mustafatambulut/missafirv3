"use client";
import { ReactNode } from "react";
import { get, map } from "lodash";

import { useAppSelector } from "@/redux/hooks";
import { IContactBody } from "@/components/organisms/contactBody/types";

import ContactInfo from "@/components/atoms/contactInfo/ContactInfo";

import UnderLine from "../../../../public/images/underline.svg";

const ContactBody = ({ className = "" }: IContactBody) => {
  const { contactInfo, contactBody } = useAppSelector(
    (state) => state.contactReducer
  );

  const MobileTitleComponent = (): ReactNode => (
    <h1 className="lg:hidden">
      <span className="text-pink-600 mr-3">
        {get(contactBody, "subTitle.partialFirst")}
      </span>
      {get(contactBody, "subTitle.partialSecond")}
    </h1>
  );

  const TitleComponent = (): ReactNode => (
    <div className="hidden lg:block">
      <h6 className="text-xs lg:text-base text-gray-600">
        {get(contactBody, "title")}
      </h6>
      <h1 className="flex justify-center text-left lg:text-center">
        <span className="flex flex-col w-28 text-center">
          <h1 className="text-pink-600">
            {get(contactBody, "subTitle.partialFirst")}
          </h1>
          <UnderLine />
        </span>
        {get(contactBody, "subTitle.partialSecond")}
      </h1>
    </div>
  );

  return (
    <>
      <header className={`text-center text-3xl ${className}`}>
        <MobileTitleComponent />
        <TitleComponent />
      </header>
      <main className="flex flex-wrap gap-y-7 justify-center">
        {map(contactInfo, (info, key) => (
          <ContactInfo info={info} key={key} />
        ))}
      </main>
    </>
  );
};

export default ContactBody;
