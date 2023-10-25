"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { STEP_1, STEP_2 } from "@/redux/features/ownerSlice/enum";
import { IBecomeOwnerLayout } from "@/app/pages/owner/types";

import Section from "@/components/molecules/section/Section";

import { useEffect } from "react";
import {
  resetFlow,
  updateCurrentStep
} from "@/redux/features/ownerSlice/ownerSlice";

import AppStoreIcon from "../../../../public/images/appstore.svg";
import GooglePlayIcon from "../../../../public/images/googleplay.svg";
import Link from "next/link";
import BackgroundImage from "../../../../public/images/missafir_background.svg";
import ChevronLeft from "../../../../public/images/chevron_left.svg";
import Typography from "@/components/atoms/typography/Typography";

export const revalidate = 3600; 
const BecomeOwnerTypes = dynamic(
  () => import("@/components/molecules/becomeOwnerTypes/BecomeOwnerTypes"));

const BecomeOwnerLanding = dynamic(
  () => import("@/components/organisms/becomeOwnerLanding/BecomeOwnerLanding"),
  { ssr: false }
);



const BecomeOwnerLayout = ({ children }: IBecomeOwnerLayout) => {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const { currentStep } = useAppSelector((state) => state.ownerReducer);
  //const { banner } = useAppSelector((state) => state.ownerReducer);

  useEffect(() => {
    dispatch(updateCurrentStep(STEP_1));
  }, []);

  return currentStep === STEP_1 ? (
    <BecomeOwnerLanding />
  ) : (
    <section className="mt-20 lg:mt-48 flex flex-col gap-y-10 lg:gap-y-20 relative px-4 lg:px-40 relative">
      {currentStep === STEP_2 ? (
        <div className="absolute top-0 left-[-25rem] z-0 hidden lg:block scale-125">
          <BackgroundImage />
        </div>
      ) : null}
      <main className="z-20">
        <div className="lg:hidden text-center mb-10">
          <h1 className="text-28 font-mi-sans-semi-bold mb-5">
            {t("find_out_your_potential_rental_income")}
          </h1>
          <p className="text-lg">{t("become_owner_subtitle")}</p>
        </div>
        <div className="flex lg:hidden justify-center items-center mb-10">
          <div
            onClick={() => dispatch(resetFlow())}
            className="cursor-pointer text-primary text-base flex items-center text-transparent bg-clip-text bg-gradient-to-tr from-[#CF00AD] from-10% via-[#E1004C] via-31% to-[#F8479E] to-92%">
            <ChevronLeft className="scale-75 fill-primary" />
            <Typography variant="p1" element="span" className="">
              {t("back_to_country_selection")}
            </Typography>
          </div>
        </div>
        <div className="mb-10 w-full lg:w-1/2 mx-auto">
          <BecomeOwnerTypes showCountrySelectOnChange={false} />
        </div>
        <section>{children}</section>
      </main>
      {/*todo: timeline gelecek*/}
      {/*<section>Timeline</section>*/}
      <Section className="flex flex-col lg:flex-row items-center gap-x-4">
        <Image
          src="/images/owner_image.png"
          alt="owner-image z-10"
          className="object-cover"
          height={777}
          width={670}
        />
        <div className="flex flex-col gap-y-6 items-start justify-center text-center lg:text-left">
          <div className="text-4xl font-mi-sans-semi-bold text-gray-700">
            {t("grow_your_income_with_owner_app")}
          </div>
          <p className="text-2xl">
            {t(
              "the_easiest_way_to_review_your_propertys_income_expense_and_calendar"
            )}
          </p>
          <div className="flex gap-x-4">
            <Link href="https://apps.apple.com/tr/app/missafir-owner/id6446027499">
              <AppStoreIcon />
            </Link>
            <Link href="https://play.google.com/store/apps/details?id=com.missafir.owner">
              <GooglePlayIcon />
            </Link>
          </div>
        </div>
      </Section>
      {/*todo: tasarımdaki discover missafir section gelecek*/}
      {/*todo: tasarımdaki blog section gelecek*/}
    </section>
  );
};

export default BecomeOwnerLayout;
