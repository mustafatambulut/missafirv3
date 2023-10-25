"use client";
import { map } from "lodash";
import classNames from "classnames";
import { useTranslations } from "next-intl";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IProgressBar } from "@/components/molecules/progressBar/types";
import { STEP_1, STEP_3 } from "@/redux/features/reservationSlice/enum";
import { changeCurrentStep } from "@/redux/features/reservationSlice/reservationSlice";

import Check from "../../../../public/images/check.svg";
import CreditCart from "../../../../public/images/credit_card.svg";
import CustomerReview from "../../../../public/images/customer_review.svg";

const ProgressBar = ({ className = "" }: IProgressBar) => {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const { currentStep } = useAppSelector((state) => state.reservationReducer);

  // todo: bu kısım sonradan aktif edilecek
  // {
  //   id: STEP_2,
  //       title: t("extra_service")
  // },
  const steps = [
    {
      id: STEP_1,
      title: t("confirmation")
    },
    {
      id: STEP_3,
      title: t("payment")
    }
  ];

  const textClass = (id: number) => {
    return classNames("text-base", {
      "text-primary-600": id === currentStep,
      "text-green-600": id < currentStep,
      "text-gray-600": id > currentStep
    });
  };

  const stepClass = (id: number) => {
    return classNames(
      `flex w-16 h-16 lg:w-20 lg:h-20 items-center justify-center lg:p-4 rounded-full`,
      {
        "bg-primary-100": id === currentStep,
        "bg-green-100": id < currentStep,
        "bg-gray-100": id > currentStep
      }
    );
  };

  const stepContainerClass = (id: number) => {
    return classNames(
      `flex flex-col justify-center gap-y-4 items-center ${className}`,
      {
        "cursor-pointer": id < currentStep
      }
    );
  };

  const iconClass = (id: number) => {
    return classNames("", {
      "fill-primary-600": id === currentStep,
      "fill-green-600": id < currentStep,
      "fill-gray-600": id > currentStep
    });
  };

  const IconComponent = ({ id }: number) => {
    const checked = (id, component) => {
      if (id < currentStep) {
        return <Check className="fill-green-600 cursor-pointer" />;
      }
      return component;
    };

    switch (id) {
      case STEP_1:
        return checked(STEP_1, <CustomerReview className={iconClass(id)} />);
      // todo: bu kısım sonradan aktif edilecek
      // case STEP_2:
      //   return checked(STEP_2, <ShoppingCart className={iconClass(id)} />);
      case STEP_3:
        return checked(STEP_3, <CreditCart className={iconClass(id)} />);
      default:
        return <CustomerReview className={iconClass(id)} />;
    }
  };

  const previousStep = (id) => {
    if (id >= currentStep) return;

    dispatch(changeCurrentStep(id));
  };

  return (
    <>
      {map(steps, ({ id, title },key) => (
        <div
          key={key}
          onClick={() => previousStep(id)}
          className={stepContainerClass(id)}>
          <div className={stepClass(id)}>
            <IconComponent id={id} />
          </div>
          <p className={textClass(id)}>{title}</p>
        </div>
      ))}
    </>
  );
};

export default ProgressBar;
