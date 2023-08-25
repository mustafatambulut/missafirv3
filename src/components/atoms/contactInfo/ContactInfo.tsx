"use client";
import { get } from "lodash";
import Image from "next/image";

import { IContactInfo } from "@/components/atoms/contactInfo/types";

import AddressIcon from "../../../../public/images/address.svg";
import LetterIcon from "../../../../public/images/variants/letter.svg";
import CustomerSupportIcon from "../../../../public/images/customer_support.svg";

const ContactInfo = ({ info, className = "" }: IContactInfo) => {
  return (
    <main
      className={`flex flex-col gap-x-8 gap-y-8 shadow-base-blur-5 rounded-xl w-96 mx-8 p-6 bg-white ${className}`}>
      <header className="flex flex-col items-center">
        <div className="avatar">
          <div className="w-16 rounded-full">
            <Image src={get(info, "img")} width={20} height={20} alt="logo" />
          </div>
        </div>
      </header>
      <section className="flex flex-col items-center gap-y-3">
        <h1 className="text-2xl">{get(info, "title")}</h1>
        <ul className="flex flex-col items-start gap-y-2 text-xl">
          <li className="flex items-center justify-center gap-x-3">
            <span className="flex justify-center items-center bg-primary-100 w-10 h-10 rounded-full">
              <AddressIcon />
            </span>
            <span>{get(info, "phone")}</span>
          </li>
          <li className="flex items-center justify-center gap-x-3">
            <span className="flex justify-center items-center bg-primary-100 w-10 h-10 rounded-full">
              <LetterIcon />
            </span>
            <span>{get(info, "email")}</span>
          </li>
          <li className="flex items-center justify-center gap-x-3">
            <span className="flex justify-center items-center bg-primary-100 w-10 h-10 rounded-full">
              <CustomerSupportIcon />
            </span>
            <span>{get(info, "address")}</span>
          </li>
        </ul>
      </section>
    </main>
  );
};

export default ContactInfo;
