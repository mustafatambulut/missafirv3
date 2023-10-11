"use client";
import useCheckAuth from "@/app/[lang]/reservation/useCheckAuth";
import { IExtraServicesSection } from "@/components/organisms/extraServicesSection/types";
import { useTranslations } from "next-intl";

const ExtraServicesSection = ({ className = "" }: IExtraServicesSection) => {
  useCheckAuth();
  const t = useTranslations();

  return (
    <div className={`h-72 lg:h-auto ${className}`}>
      <h1 className="text-22 text-center lg:text-left lg:text-28">
        {t("select_our_extra_services_for_you")}
      </h1>
      <div className="flex flex-col gap-y-3 lg:gap-y-6"></div>
    </div>
  );
};

export default ExtraServicesSection;
