"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

import { IInviteEarnForm } from "@/components/molecules/inviteEarnForm/types";
import Typography from "@/components/atoms/typography/Typography";

const InviteEarnForm = ({ title, className = "" }: IInviteEarnForm) => {
  const t = useTranslations();
  const [phone, setPhone] = useState<any>();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const handleForm = () => {};

  return (
    <div
      id="formZone"
      className={`lg:mx-5 bg-white shadow-base-blur-10 my-10 lg:my-36 py-10 relative flex justify-center rounded-xl ${className}`}>
      <div className="w-[90%] lg:w-[70%] flex flex-col gap-y-5 items-center">
        <div className="flex flex-col items-center justify-center">
          <Typography variant="h4" element="h4">
            {title}
          </Typography>
          <Typography
            variant="p3"
            element="p"
            className="text-gray text-center">
            {t("send_your_information_to_us")}
          </Typography>
        </div>
        <div className="flex flex-col w-full p-2 gap-4">
          <div className="flex flex-col lg:flex-row w-full gap-4">
            <input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border px-4 py-4 rounded-xl focus:border-none  text-gray"
            />
            <input
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full border px-4 py-4 rounded-xl focus:border-none  text-gray"
            />
          </div>
          <div className="flex flex-col lg:flex-row w-full gap-4">
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-4 py-4 rounded-xl focus:border-none  text-gray"
            />
            <input
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border px-4 py-4 rounded-xl focus:border-none text-gray"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            onClick={handleForm}
            className="w-auto bg-primary px-6 py-4 rounded-xl text-white hover:opacity-80">
            {t("get_an_offer_now")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InviteEarnForm;
