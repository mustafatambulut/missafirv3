"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { STEP_1 } from "@/redux/features/ownerSlice/enum";
import { IBecomeOwnerLayout } from "@/app/[lang]/become-owner/types";
import BecomeOwnerTypes from "@/components/molecules/becomeOwnerTypes/BecomeOwnerTypes";

import Section from "@/components/molecules/section/Section";
import BecomeOwnerLanding from "@/components/organisms/becomeOwnerLanding/BecomeOwnerLanding";

import { useEffect } from "react";
import { updateCurrentStep } from "@/redux/features/ownerSlice/ownerSlice";

import AppStoreIcon from "../../../../public/images/appstore.svg";
import GooglePlayIcon from "../../../../public/images/googleplay.svg";
import Link from "next/link";

const BecomeOwnerLayout = ({ children }: IBecomeOwnerLayout) => {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const { currentStep } = useAppSelector((state) => state.ownerReducer);
  const { banner } = useAppSelector((state) => state.ownerReducer);

  useEffect(() => {
    dispatch(updateCurrentStep(STEP_1));
  }, []);

  return currentStep === STEP_1 ? (
    <BecomeOwnerLanding />
  ) : (
    <section className="mt-20 lg:mt-48 flex flex-col gap-y-10 lg:gap-y-20 relative px-4 lg:px-40 overflow-hidden">
      <main>
        <div className="mt-24 lg:hidden text-center">
          <h1 className="text-28 font-mi-sans-semi-bold mb-5">
            {t("find_out_your_potential_rental_income")}
          </h1>
          <p className="text-lg">{t("become_owner_subtitle")}</p>
        </div>
        <div className="mb-10 w-full lg:w-1/2 mx-auto">
          <BecomeOwnerTypes />
        </div>
        <section>{children}</section>
      </main>
      {/*todo: timeline gelecek*/}
      {/*<section>Timeline</section>*/}
      <Section className="flex flex-col lg:flex-row items-center gap-x-4">
        <Image
          src="/images/owner_image.png"
          alt="owner-image"
          className="object-cover"
          height={777}
          width={670}
        />
        <div className="flex flex-col gap-y-6 items-start justify-center">
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
