"use client";
import { useState } from "react";
import { get, map, size, take } from "lodash";
import { isMobile } from "react-device-detect";

import { IAmenitiesSection } from "@/components/molecules/amenitiesSection/types";

import Modal from "@/components/atoms/modal/Modal";
import Button from "@/components/atoms/button/Button";
import TouchesSection from "@/components/molecules/touchesSection/TouchesSection";

import RightIcon from "../../../../public/images/variants/chevron_right.svg";
import { useTranslations } from "next-intl";
import Typography from "@/components/atoms/typography/Typography";

const AmenitiesSection = ({ item, className = "" }: IAmenitiesSection) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations()

  return (
    <section className={`flex flex-col gap-y-9 ${className}`}>
      <h1 className="text-lg lg:text-2xl text-gray-800">{t("amenities")}</h1>
      <TouchesSection touches={get(item, "missafir_touches")} />
      <article className="flex flex-col gap-y-6 items-start">
        <Typography variant="h5" element="h5" className="text-gray-800">
          {t("what_this_place_offers")}
        </Typography>
        <div className="flex flex-wrap gap-4">
          {map(take(get(item, "amenities"), 5), ({ name }, key) => (
            <div
              key={key}
              className="flex flex-col items-center capitalize justify-center rounded-xl h-14 py-2 px-4 bg-gray-50 text-sm lg:text-lg text-gray-600 w-fit">
              <Typography variant="p3" element="p">{name}</Typography>
            </div>
          ))}
        </div>
        <Button
          variant={isMobile ? "btn-white" : "btn-ghost"}
          onClick={() => setIsOpen(true)}
          className="text-primary text-base lg:text-lg px-0 w-full lg:w-fit border lg:border-none rounded-xl"
          outline={true}>
          {isMobile
            ? `${t("see_all")} ${size(get(item, "amenities"))} ${t("amenities")}`
            : t("see_all_amenities")}
          <RightIcon className="hidden lg:block" />
        </Button>
        <Modal
          label={t("amenities")}
          bodyClass="lg:w-11/12 lg:max-w-5xl"
          headerClass="text-2xl"
          isOpen={isOpen}
          setIsOpen={setIsOpen}>
          <div className="py-2 mt-4 flex flex-col gap-y-6">
            <TouchesSection touches={get(item, "missafir_touches")} />
            <div className="flex flex-col gap-y-6">
              <Typography variant="h6" element="h6" className="text-gray-800">{t("what_this_place_offers")}</Typography>
              <div className="flex flex-wrap gap-4">
                {map(get(item, "amenities"), ({ icon, name }, key) => (
                  <div
                    key={key}
                    className="flex flex-col items-center capitalize justify-center rounded-xl h-14 py-2 px-4 bg-gray-50 text-sm lg:text-lg text-gray-600 w-fit">
                    {icon && <img src={icon} alt="icon" />}
                    <Typography variant="p3" element="p">{name}</Typography>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      </article>
      <hr className="lg:hidden" />
    </section>
  );
};

export default AmenitiesSection;
