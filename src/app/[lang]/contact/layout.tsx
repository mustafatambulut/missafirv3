"use client";
import { get } from "lodash";

import { useAppSelector } from "@/redux/hooks";
import { IContactLayout } from "@/app/[lang]/contact/types";

import ContactBody from "@/components/organisms/contactBody/ContactBody";
import ContactFooter from "@/components/organisms/contactFooter/ContactFooter";

import HeaderIcon from "../../../../public/images/contact_header.svg";

const ContactLayout = ({ children }: IContactLayout) => {
  const { header } = useAppSelector((state) => state.contactReducer);

  return (
    <section className="mt-20 lg:mt-40 px-4">
      <header className="flex flex-col static items-center justify-center">
        <h1 className="text-28 lg:text-40">{get(header, "title")}</h1>
        <p className="text-lg lg:text-21 text-center">
          {get(header, "description")}
        </p>
        <div className="hidden lg:block absolute top-40 right-0">
          <HeaderIcon />
        </div>
      </header>
      <main className="static">
        {children}
        <div className="flex flex-col gap-y-14 mx-auto mt-10 lg:mt-40">
          <ContactBody />
        </div>
      </main>
      <ContactFooter />
    </section>
  );
};

export default ContactLayout;
