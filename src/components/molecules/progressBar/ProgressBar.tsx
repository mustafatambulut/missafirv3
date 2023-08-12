"use client";
import { map } from "lodash";
import classNames from "classnames";
import { useTranslations } from "use-intl";

import { IProgressBar } from "@/components/molecules/progressBar/types";

import Check from "../../../../public/images/check.svg";
import CreditCart from "../../../../public/images/credit_card.svg";
import ShoppingCart from "../../../../public/images/shopping_cart.svg";
import CustomerReview from "../../../../public/images/customer_review.svg";

const ProgressBar = ({ className = "", currentStep }: IProgressBar) => {
  const t = useTranslations();

  const steps = [
    {
      id: 1,
      title: t("confirmation")
    },
    {
      id: 2,
      title: t("extra_service")
    },
    {
      id: 3,
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

  const iconClass = (id: number) => {
    return classNames("", {
      "fill-primary-600": id === currentStep,
      "fill-green-600": id < currentStep,
      "fill-gray-600": id > currentStep
    });
  };

  const IconComponent = ({ id }: number) => {
    const checked = (id, component) => {
      if (id < currentStep) return <Check className="fill-green-600" />;
      return component;
    };

    switch (id) {
      case 1:
        return checked(1, <CustomerReview className={iconClass(id)} />);
      case 2:
        return checked(2, <ShoppingCart className={iconClass(id)} />);
      case 3:
        return checked(3, <CreditCart className={iconClass(id)} />);
      default:
        return <CustomerReview className={iconClass(id)} />;
    }
  };

  return (
    <>
      {map(steps, ({ id, title }) => (
        <div
          key={id}
          className={`flex flex-col justify-center gap-y-4 items-center ${className}`}>
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
