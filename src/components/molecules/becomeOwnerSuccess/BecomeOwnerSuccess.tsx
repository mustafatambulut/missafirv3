"use client";
import { useTranslations } from "next-intl";
import { useAppDispatch } from "@/redux/hooks";

import { STEP_2 } from "@/redux/features/ownerSlice/enum";
import { updateCurrentStep } from "@/redux/features/ownerSlice/ownerSlice";

import ChevronLeft from "../../../../public/images/chevron_left.svg";
import Typography from "@/components/atoms/typography/Typography";

const BecomeOwnerSuccess = () => {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  return (
    <div className="flex flex-col items-center gap-y-5 my-14">
      <Typography variant="h4" element="h4" className="text-gray-800 font-mi-sans-semi-bold text-center">
        {t("awesome_we_have_received_your_request_successfully")}
      </Typography>
      <Typography variant="p3" element="p" className="text-lg lg:text-2xl text-gray-800 text-center">
        {t(
          "one_of_our_property_managers_will_reach_out_to_you_shortly_to_guide_you_through_the_process"
        )}
      </Typography>
      <span
        className="cursor-pointer text-primary text-lg lg:text-22 flex items-center gap-x-2"
        onClick={() => dispatch(updateCurrentStep(STEP_2))}>
        <ChevronLeft className="fill-primary scale-75" />
        <Typography variant="p5" element="span">{t("i_want_to_calculate_for_another_property_i_own")}</Typography>
      </span>
    </div>
  );
};

export default BecomeOwnerSuccess;
