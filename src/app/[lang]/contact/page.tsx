"use client";
import { get } from "lodash";

import { useAppSelector } from "@/redux/hooks";
import { IContact } from "@/app/[lang]/contact/types";

import ContactForm from "@/components/organisms/contactForm/ContactForm";
import ContactBody from "@/components/organisms/contactBody/ContactBody";

import HeaderIcon from "../../../../public/images/contact_header.svg";
import BodyHeartIcon from "../../../../public/images/contact_heart.svg";

const Contact = ({ className = "" }: IContact) => {
  const { header } = useAppSelector((state) => state.contactReducer);

  return (
    <div className={`mt-20 lg:mt-40 px-4 ${className}`}>
      <header className="flex flex-col static items-center justify-center">
        <h1 className="text-28 lg:text-40">{get(header, "title")}</h1>
        <p className="text-lg lg:text-21 text-center">
          {get(header, "description")}
        </p>
        <div className="hidden lg:block absolute top-40 right-0">
          <HeaderIcon />
        </div>
      </header>
      <ContactForm />
      <div className="static">
        <div className="hidden lg:block absolute -bottom-96 left-0">
          <BodyHeartIcon />
        </div>
        <ContactBody />
      </div>
    </div>
  );
};

export default Contact;
