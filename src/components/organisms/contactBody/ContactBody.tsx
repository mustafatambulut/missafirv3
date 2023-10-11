"use client";
import { ReactNode } from "react";
import { get, map } from "lodash";

import { useAppSelector } from "@/redux/hooks";
import { IContactBody } from "@/components/organisms/contactBody/types";

import ContactInfo from "@/components/atoms/contactInfo/ContactInfo";

import UnderLine from "../../../../public/images/underline.svg";
import Typography from "@/components/atoms/typography/Typography";

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
      <Typography variant="h6" element="h1" className=" text-gray-600">
        {get(contactBody, "title")}
      </Typography>
      <h4 className="flex justify-center text-left lg:text-center">
        <span className="flex flex-col w-28 text-center">
          <h4 className="text-pink-600">
            {get(contactBody, "subTitle.partialFirst")}
          </h4>
          <UnderLine />
        </span>
        {get(contactBody, "subTitle.partialSecond")}
      </h4>
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
