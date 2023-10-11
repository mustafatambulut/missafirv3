"use client";
import Button from "@/components/atoms/button/Button";
import Card from "@/components/atoms/card/Card";
import Success from "../../../../../public/images/reservation_success.svg";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Typography from "@/components/atoms/typography/Typography";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const Succeeded = () => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  let threadId: any;
  // const [message, setMessage] = useState<string>("");
  for (const [key, value] of searchParams?.entries()) {
    key === "thread" && (threadId = value);
  }
  
  return (
    <div className="container mx-auto w-full h-screen">
      <div className="flex items-center justify-center w-full h-full">
        <div className="mx-auto static hidden lg:block ">
          <div className="absolute right-10 top-40">
            <Image
              src="/images/heart.svg"
              width={0}
              height={0}
              priority
              className="w-32 h-28"
              alt="heart icon"
            />
          </div>
        </div>
        <Card>
          <div className="flex gap-3 lg:gap-6 mx-3 shadow-base-blur-20 rounded-l-xl lg:rounded-xl bg-white">
            <div className="w-full py-14 px-2">
              <div className="mb-4 mt-4 flex-1 px-2 flex flex-col items-center justify-center gap-4">
                <div className="w-14 h-14 bg-primary-25 flex justify-center items-center rounded-full">
                  <Success />
                </div>
                <Typography
                  variant="h4"
                  element="h3"
                  className="font-mi-sans-semi-bold text-center">
                  {t("payment_success_title")}
                </Typography>
                <Typography
                  variant="p3"
                  element="p"
                  className="font-mi-sans text-gray-600 mt-6 lg:px-80 px-0 text-center">
                  {t("payment_success_header")}
                </Typography>

                <Button
                  link={`/inbox?id=${threadId}`}
                  type="submit"
                  variant="btn-white"
                  className="bg-primary border-none text-white w-40 lg:w-fit mt-8 font-mi-sans">
                  <Typography
                    variant="p2"
                    element="span"
                    className="font-mi-sans">
                    {t("payment_success_res_detail")}
                  </Typography>
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Succeeded;
