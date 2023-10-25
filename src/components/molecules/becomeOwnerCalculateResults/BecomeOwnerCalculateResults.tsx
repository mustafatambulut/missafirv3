"use client";
import Button from "@/components/atoms/button/Button";
import { useTranslations } from "next-intl";

import { useAppDispatch } from "@/redux/hooks";
import {
  resetFlow,
  updateCurrentStep
} from "@/redux/features/ownerSlice/ownerSlice";
import { STEP_4 } from "@/redux/features/ownerSlice/enum";

import ChevronLeft from "../../../../public/images/chevron_left.svg";
import Typography from "@/components/atoms/typography/Typography";

const BecomeOwnerCalculateResults = () => {
  const t = useTranslations();
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col items-center gap-y-5 my-14">
      <Typography
        variant="h3"
        element="h3"
        className="text-gray-800 font-mi-sans-semi-bold">
        {t("your_homes_estimated_monthly_earnings")}
      </Typography>
      <div className="text-primary text-6xl">{t("date_example")}</div>
      <Typography variant="p3" element="p" className="text-gray-700">
        {t("become_owner_calculate_results_note")}
      </Typography>
      <Typography variant="p1" element="p" className="text-gray-800">
        {t(
          "easily_rent_out_your_home_and_maximize_your_earnings_with_missafir"
        )}
      </Typography>
      <Button
        variant="btn-primary"
        className="border-none w-72"
        onClick={() => dispatch(updateCurrentStep(STEP_4))}>
        <div>
          <Typography variant="p2" element="span">
            {t("get_an_offer")}
          </Typography>
        </div>
      </Button>
      <span
        className="cursor-pointer text-primary text-22 flex items-center gap-x-2"
        onClick={() => dispatch(resetFlow())}>
        <ChevronLeft className="fill-primary scale-75" />
        <Typography variant="p2" element="span">
          {t("i_want_to_calculate_for_another_property_i_own")}
        </Typography>
      </span>
    </div>
  );
};

export default BecomeOwnerCalculateResults;
