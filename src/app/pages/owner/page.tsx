"use client";
import { useAppSelector } from "@/redux/hooks";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";

import {
  STEP_4,
  STEP_2,
  STEP_3,
  SUCCESS
} from "@/redux/features/ownerSlice/enum";

const BecomeOwnerForm = dynamic(
  () => import("@/components/organisms/becomeOwnerForm/BecomeOwnerForm"),
  { ssr: false }
);

const BecomeOwnerCalculateResults = dynamic(
  () => import("@/components/molecules/becomeOwnerCalculateResults/BecomeOwnerCalculateResults"),
  { ssr: false }
);

const BecomeOwnerSuccess = dynamic(
  () => import("@/components/molecules/becomeOwnerSuccess/BecomeOwnerSuccess"),
  { ssr: false }
);

const BecomeOwner = () => {
  const { currentStep } = useAppSelector((step) => step.ownerReducer);
  const t = useTranslations()

  switch (currentStep) {
    case STEP_2:
      return <BecomeOwnerForm />;
    case STEP_3:
      return <BecomeOwnerCalculateResults />;
    case STEP_4:
      return <BecomeOwnerSuccess />;
    case SUCCESS:
      return <div>{t("step_5")}</div>;
  }
};

export default BecomeOwner;
