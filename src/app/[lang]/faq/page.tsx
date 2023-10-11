"use client";
import { IFaq } from "@/app/[lang]/faq/types";
import HeaderImage from "../../../../public/images/contact_header.svg";
import Plus from "../../../../public/images/plus.svg";
import Minus from "../../../../public/images/minus.svg";
import PremiumStatic from "@/components/atoms/premiumStatic/PremiumStatic";

import { useEffect, useState } from "react";
import {
  capitalize,
  get,
  isEmpty,
  isEqual,
  isNull,
  map,
  pick,
  slice,
  words
} from "lodash";
import { getPage } from "../../../service/api";
import { FAQ } from "../../constants";

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [open, setOpen] = useState<any>(null);
  const openDivClassName =
    "flex justify-between cursor-pointer items-center p-4 bg-primary-25 rounded-t-xl";
  const closeDivClassName =
    "flex justify-between cursor-pointer items-center p-4";
  const openTitleClassName =
    "decoration-solid underline text-primary text-15 lg:text-22";
  const closeTitleClassName =
    "decoration-solid underline text-gray text-15 lg:text-22";

  const [activeTab, setActiveTab] = useState<number>(0);
  const [tabContents, setTabContents] = useState<any>(null);
  const [tabTitles, setTabTitles] = useState<any>(null);
  const [faqData, setFaqData] = useState<any>(null);
  const [footer, setFooter] = useState<any>(null);
  const [header, setHeader] = useState<any>(null);
  const [body, setBody] = useState<any>(null);

  const fetchData = async (context: any) => {
    const { attributes } = await getPage(context);
    !isNull(attributes) && setFaqData(attributes);
  };

  useEffect(() => {
    isEmpty(faqData) && fetchData(FAQ);
  }, []);

  useEffect(() => {
    if (!faqData) return;

    const contents: any = map(get(faqData, "body"));
    setBody(contents);
    setTabContents(map(contents, (content) => pick(content, ["accordions"])));
    setTabTitles(map(contents, (content) => pick(content, ["title"])));
    setFooter(get(faqData, "footer"));
    setHeader(get(faqData, "header"));
  }, [faqData]);

  const handleTabs = (index: number) => {
    setActiveIndex(index);
    setOpen(null);
  };

  const handleOpen = (index: number) => {
    if (isEqual(index, open)) {
      setOpen(null);
    } else {
      setOpen(index);
    }
  };

  return (
    <>
      <div className="font-mi-sans mt-20 lg:mt-40">
        <div className="py-10">
          {/* Title and slider zone */}
          <div className="hidden lg:block absolute top-8 right-0">
            <HeaderImage />
          </div>
          <div className="text-center">
            <h1 className="text-primary font-mi-sans-semi-bold text-42">
              {capitalize(words(header?.title)[0])}{" "}
              <span className="text-gray-800">
                {capitalize(words(header?.title)[1])}{" "}
              </span>
              <span className="text-gray-800">
                {capitalize(words(header?.title)[2])}
              </span>
            </h1>
            <p className="text-gray-600 pt-4 text-21 mx-4">
              {slice(words(header?.description), 0, 13)?.join(" ")}{" "}
              <br className="hidden lg:block" />
              <span>{slice(words(header?.description), 13)?.join(" ")}</span>
            </p>
          </div>
          <div className="container mx-auto mt-20 lg:mt-40 px-4">
            <div className="flex items-center justify-center ">
              {body &&
                body.map((i: any, index: number) => {
                  return (
                    <div
                      key={index}
                      onClick={() => handleTabs(index)}
                      className={
                        isEqual(index, activeIndex)
                          ? "flex-1 px-4 flex justify-center pb-1 border-b-4 rounded border-primary text-gray-800 font-mi-sans-semi-bold lg:text-22 text-15 cursor-pointer"
                          : " px-4 flex-1 flex justify-center pb-1 border-b-4 rounded border-b-slate-100 text-gray lg:text-22 text-15 cursor-pointer"
                      }>
                      {i.title}
                    </div>
                  );
                })}
            </div>
            {/* first */}
            <div className="mt-4 pt-4" />

            {body &&
              body[activeIndex].accordions.data.map((i: any, index: any) => {
                return (
                  <div
                    key={index}
                    onClick={() => handleOpen(index)}
                    className="mt-4">
                    <div
                      className={
                        isEqual(open, index)
                          ? openDivClassName
                          : closeDivClassName
                      }>
                      <div
                        className={
                          isEqual(open, index)
                            ? openTitleClassName
                            : closeTitleClassName
                        }>
                        {i?.attributes?.title}
                      </div>
                      <div className="p-2">
                        {isEqual(open, index) ? <Minus /> : <Plus />}
                      </div>
                    </div>
                    {isEqual(open, index) ? (
                      <div className="bg-gray-50 p-4 rounded-b-xl">
                        <p className="text-gray-800">
                          {i?.attributes?.description}
                        </p>
                      </div>
                    ) : null}
                  </div>
                );
              })}
          </div>
          {/* Spacer */}
          <div className="my-32" />

          <PremiumStatic
            title={footer?.bannerHeader.title}
            description={footer?.bannerBody.description}
            buttonLabel={footer?.bannerFooter.label}
            image={footer?.bannerBody.image}
          />
        </div>
      </div>
    </>
  );
};

export default Faq;
