"use client";
import { get } from "lodash";
import Image from "next/image";

import { IContactInfo } from "@/components/atoms/contactInfo/types";

import AddressIcon from "../../../../public/images/address.svg";
import LetterIcon from "../../../../public/images/variants/letter.svg";
import CustomerSupportIcon from "../../../../public/images/customer_support.svg";
import Typography from "../typography/Typography";

const ContactInfo = ({ info, className = "" }: IContactInfo) => {
  return (
    <main
      className={`flex lg:flex-col justify-between items-center lg:gap-y-3 lg:gap-x-8 shadow-base-blur-5 rounded-xl w-96 lg:mx-8 p-3 lg:p-6 bg-white ${className}`}>
      <header className="w-32 lg:w-full flex flex-col items-center gap-y-2 lg:gap-y-8 px-4 lg:px-0">
        <div className="avatar">
          <div className="w-16 rounded-full">
            <Image src={get(info, "img") || "/"} width={20} height={20} alt="logo" />
          </div>
        </div>
        <Typography variant="h5" element="h5">
          {get(info, "title")}
        </Typography>
      </header>
      <section className="flex flex-col items-center gap-y-3">
        <ul className="flex flex-col items-start gap-y-2 text-base lg:text-xl">
          <li className="flex items-center justify-center gap-x-3">
            <span className="flex justify-center items-center bg-primary-100 w-10 h-10 rounded-full">
              <CustomerSupportIcon />
            </span>
            <Typography variant="p3" element="span">
              {get(info, "phone")}
            </Typography>
          </li>
          <li className="flex items-center justify-center gap-x-3">
            <span className="flex justify-center items-center bg-primary-100 w-10 h-10 rounded-full">
              <LetterIcon />
            </span>
            <Typography variant="p3" element="span">
              {get(info, "email")}
            </Typography>
          </li>
          <li className="flex items-center justify-center gap-x-3">
            <span className="flex justify-center items-center bg-primary-100 w-10 h-10 rounded-full">
              <AddressIcon />
            </span>
            <Typography variant="p3" element="span">
              {get(info, "address")}
            </Typography>
          </li>
        </ul>
      </section>
    </main>
  );
};

export default ContactInfo;
