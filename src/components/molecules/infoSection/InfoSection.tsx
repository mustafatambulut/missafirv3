"use client";
import { useState } from "react";
import { get } from "lodash";
import classNames from "classnames";

import {
  IInfoSection,
  IInfoSectionData
} from "@/components/molecules/infoSection/types";

import Section from "@/components/molecules/section/Section";

import UpArrowPrimary from "../../../../public/images/chevron_up.svg";

const InfoSection = ({ collapsable = false }: IInfoSection) => {
  const [showContent, setShowContent] = useState(false);

  const infoSectionClass = classNames(
    "grid grid-cols-1 gap-6 overflow-hidden h-36",
    { "overflow-visible h-auto": collapsable && showContent }
  );

  const indicatorClass = classNames("fill-primary", {
    "rotate-180": collapsable && showContent
  });

  // todo: test amaçlı oluşturuldu, silinecek
  const mockInfo: IInfoSectionData[] = [
    {
      header: "Lorem ipsum dolor sit amet",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam sit amet sodales malesuada, elit nunc faucibus eros, nec aliquet elit nibh eu eros. Quisque sed semper nisl. Fusce sed semper nisl."
    },
    {
      header: "Lorem ipsum dolor sit amet",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam sit amet sodales malesuada, elit nunc faucibus eros, nec aliquet elit nibh eu eros. Quisque sed semper nisl. Fusce sed semper nisl."
    },
    {
      header: "Lorem ipsum dolor sit amet",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam sit amet sodales malesuada, elit nunc faucibus eros, nec aliquet elit nibh eu eros. Quisque sed semper nisl. Fusce sed semper nisl."
    },
    {
      header: "Lorem ipsum dolor sit amet",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam sit amet sodales malesuada, elit nunc faucibus eros, nec aliquet elit nibh eu eros. Quisque sed semper nisl. Fusce sed semper nisl."
    },
    {
      header: "Lorem ipsum dolor sit amet",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam sit amet sodales malesuada, elit nunc faucibus eros, nec aliquet elit nibh eu eros. Quisque sed semper nisl. Fusce sed semper nisl."
    }
  ];

  return (
    <Section className="px-4 lg:px-10 my-14 lg:mt-14">
      <div className={infoSectionClass}>
        <div>
          {mockInfo.map((item, index) => {
            return (
              <div key={index} className="flex flex-col mb-5 lg:mb-10">
                <div className="text-3xl font-bold mb-5 lg:mb-8">
                  {get(item, "header")}
                </div>
                <p className="text-lg lg:text-2xl text-gray-600">
                  {get(item, "body")}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div
        className="bg-white cursor-pointer text-[#D01E50] text-base lg:text-2xl flex items-center"
        onClick={() => setShowContent((v) => !v)}>
        <span className="mr-2">Devamını oku</span>
        <UpArrowPrimary className={indicatorClass} />
      </div>
    </Section>
  );
};

export default InfoSection;
