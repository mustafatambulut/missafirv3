"use client";
import Button from "@/components/atoms/button/Button";
import Card from "@/components/atoms/card/Card";
// import Success from "../../../../../public/images/reservation_success.svg";
import { useTranslations } from "next-intl";

import Image from 'next/image';
import Typography from '@/components/atoms/typography/Typography';
import { useRouter } from 'next/navigation';

const Succeeded = () => {
  const t = useTranslations();
  const router = useRouter()
  return (
    <>
      <Card>
        <div className="w-full h-screen flex justify-center items-center gap-3 lg:gap-6">
          <div className="w-full">
            <div className="mb-4 mt-4 flex-1 px-2 flex flex-col items-center justify-center gap-4">
              <div className="lg:w-36 lg:h-36 w-14 h-14 flex justify-center items-center">
                <Image
                  priority
                  src="/images/error.svg"
                  height={0}
                  width={0}
                  alt="404 image"
                  className='w-14 h-14 lg:w-36 lg:h-36'
                />
              </div>
              <h1 className='text-primary font-mi-sans-semi-bold text-5xl lg:text-9xl mt-8 lg:mt-12'>
                {t("404")}
              </h1>
              <Typography
                variant='p1'
                element='p'
                className='font-mi-sans text-gray-600 mt-8'>
                {t("the_page_you_are_looking_for_is_not_available")}
              </Typography>
              <Button
                type="submit"
                variant="btn-white"
                className="bg-primary border-none text-white w-38 lg:w-96 mt-8 lg:mt-12 text-base lg:text-lg"
                onClick={() => router.push("/")}
              >
                {t("back_to_home_page")}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default Succeeded;
