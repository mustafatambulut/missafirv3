"use client";
import { get, map } from "lodash";

import { useAppSelector } from "@/redux/hooks";
import { IContactBody } from "@/components/organisms/contactBody/types";

import ContactInfo from "@/components/atoms/contactInfo/ContactInfo";

import UnderLine from "../../../../public/images/underline.svg";

const ContactBody = ({ className = "" }: IContactBody) => {
  const { contactInfo, contactBody } = useAppSelector(
    (state) => state.contactReducer
  );

  return (
    <div
      className={`flex flex-col items-center justify-center gap-y-14 mx-auto mt-40 ${className}`}>
      <header className="text-center text-3xl">
        <h6 className="text-base text-gray-600">{get(contactBody, "title")}</h6>
        <h1 className="flex">
          <span className="flex flex-col w-28">
            <h1 className="text-pink-600">
              {get(contactBody, "subTitle.partialFirst")}
            </h1>
            <UnderLine />
          </span>
          {get(contactBody, "subTitle.partialSecond")}
        </h1>
      </header>
      <main className="flex flex-wrap gap-y-7 justify-center">
        {map(contactInfo, (info, key) => (
          <ContactInfo info={info} key={key} />
        ))}
      </main>
    </div>
  );
};

export default ContactBody;
