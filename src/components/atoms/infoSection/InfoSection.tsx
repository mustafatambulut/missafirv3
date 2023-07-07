"use client";
import { useState } from "react";
import { IInfoSection } from "@/components/atoms/infoSection/types";
import DownArrowPrimary from "../../../../public/images/down-arrow-primary.svg";
import UpArrowPrimary from "../../../../public/images/up-arrow-primary.svg";

const InfoSection = ({ info, collapsable = false }: IInfoSection) => {
  const [showContent, setShowContent] = useState(false);

  return (
    <div className="px-5 lg:px-10">
      <div
        className={`grid grid-cols-1 gap-6 ${
          collapsable && showContent
            ? "overflow-visible h-auto"
            : "overflow-hidden h-36"
        }`}>
        <div>
          {info.map((item, index) => {
            return (
              <div key={index} className="flex flex-col mb-5 lg:mb-10">
                <div className="text-3xl font-bold mb-5 lg:mb-8">
                  {item.header}
                </div>
                <p className="text-lg lg:text-2xl text-gray-600">{item.body}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div
        className="bg-white cursor-pointer text-[#D01E50] text-base lg:text-2xl flex items-center"
        onClick={() => setShowContent((v) => !v)}>
        <span className="mr-2">Devamını oku</span>
        {collapsable && showContent ? <UpArrowPrimary /> : <DownArrowPrimary />}
      </div>
    </div>
  );
};

export default InfoSection;
