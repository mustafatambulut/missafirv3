"use client";
import { useRouter } from "next/navigation";

import { useAppDispatch } from "@/redux/hooks";
import { IContactSuccess } from "@/components/atoms/contactSuccess/types";
import { changeIsSend } from "@/redux/features/contactSlice/contactSlice";

import Button from "@/components/atoms/button/Button";

import CareIcon from "../../../../public/images/variants/care.svg";
import LeftArrowIcon from "../../../../public/images/left_arrow.svg";
import BodyHeartIcon from "../../../../public/images/contact_heart.svg";

const ContactSuccess = ({ className = "" }: IContactSuccess) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleBackButton = () => {
    dispatch(changeIsSend(false));
    router.push("/contact");
  };

  return (
    <div
      className={`flex flex-col mx-auto items-center justify-center gap-y-9 mt-10 lg:mt-24 pt-1.5 ${className}`}>
      <header>
        <div className="flex w-16 h-16 lg:w-20 lg:h-20 bg-primary-100 items-center justify-center rounded-full">
          <CareIcon className="fill-[#ed2475]" />
        </div>
      </header>
      <main className="flex flex-col text-center gap-y-6">
        <h1 className="text-28 lg:text-4xl">
          We have forwarded your problem to the relevant department.
        </h1>
        <h2 className="text-lg lg:text-2xl text-gray-500">
          Your problem is very important to us. We are looking into it closely.
        </h2>
      </main>
      <footer className="flex-wrap">
        <Button
          onClick={handleBackButton}
          variant="btn-ghost"
          className="flex text-primary px-0"
          outline={true}>
          <LeftArrowIcon className="w-3 lg:w-5" />
          <span className="text-lg lg:text-2xl">
            I would like to communicate
          </span>
        </Button>
      </footer>
      <div className="hidden lg:block absolute bottom-0 left-0">
        <BodyHeartIcon />
      </div>
    </div>
  );
};

export default ContactSuccess;
