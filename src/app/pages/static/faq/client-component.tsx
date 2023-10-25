"use client";
// import Plus from "@/public/images/plus.svg";
// import Minus from "@/public/images/minus.svg";
import PremiumStatic from "@/components/atoms/premiumStatic/PremiumStatic";

import { useEffect, useState } from "react";
import { get, isEmpty, isEqual, isNull, map, pick } from "lodash";
import Typography from "@/components/atoms/typography/Typography";
import ReactMarkdown from "react-markdown";

export default function ClientComponent({
  children,
  data
}: {
  children: React.ReactNode;
}) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [open, setOpen] = useState<any>(null);
  const openDivClassName =
    "flex justify-between cursor-pointer items-center p-4 bg-primary-25 rounded-t-xl";
  const closeDivClassName =
    "flex justify-between cursor-pointer items-center p-4";
  const openTitleClassName =
    "collapse-title bg-primary-25 text-primary cursor-pointer underline";
  const closeTitleClassName =
    "collapse-title cursor-pointer text-gray-700 underline";

  const [activeTab, setActiveTab] = useState<number>(0);
  const [tabContents, setTabContents] = useState<any>(null);
  const [tabTitles, setTabTitles] = useState<any>(null);
  const [faqData, setFaqData] = useState<any>(null);
  const [footer, setFooter] = useState<any>(null);
  const [header, setHeader] = useState<any>(null);
  const [body, setBody] = useState<any>(null);

  const fetchData = async (context: any) => {
    !isNull(data?.attributes) && setFaqData(data.attributes);
  };

  useEffect(() => {
    isEmpty(faqData) && fetchData();
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
          {children}

          <div className="container mx-auto mt-20 lg:mt-40 px-4 lg:px-0">
            <div className="flex items-center justify-between max-w-[100%] overflow-x-auto no-scrollbar">
              {body &&
                body.map((i: any, index: number) => {
                  return (
                    <div
                      key={index}
                      onClick={() => handleTabs(index)}
                      className={
                        isEqual(index, activeIndex)
                          ? "px-6 lg:px-4 whitespace-nowrap flex-1 flex justify-center pb-1 border-b-4 rounded border-primary text-gray-800 font-mi-sans-semi-bold lg:text-20 text-15 cursor-pointer"
                          : "px-6 lg:px-4 whitespace-nowrap  flex-1 flex justify-center pb-1 border-b-4 rounded border-b-slate-100 text-gray lg:text-20 text-15 cursor-pointer"
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
                  <>
                    <div
                      key={index}
                      tabIndex={0}
                      onClick={() => handleOpen(index)}
                      className={`collapse collapse-plus rounded-xl mb-5 ${
                        isEqual(open, index)
                          ? "collapse-open"
                          : "collapse-close"
                      }`}>
                      <input type="checkbox" />
                      <div
                        className={
                          isEqual(open, index)
                            ? openTitleClassName
                            : closeTitleClassName
                        }>
                        <Typography
                          element="h6"
                          variant="h6"
                          className="underline">
                          {i?.attributes?.title}
                        </Typography>
                      </div>
                      <div className="collapse-content bg-gray-50 text-sm lg:text-lg text-gray-800">
                        <Typography
                          element="div"
                          variant="p3"
                          className="text-gray-800">
                          <ReactMarkdown className="notw">
                            {i?.attributes?.description}
                          </ReactMarkdown>
                        </Typography>
                      </div>
                    </div>

                    {/*<div*/}
                    {/*  key={index}*/}
                    {/*  onClick={() => handleOpen(index)}*/}
                    {/*  className="mt-4">*/}
                    {/*  <div*/}
                    {/*    className={*/}
                    {/*      isEqual(open, index)*/}
                    {/*        ? openDivClassName*/}
                    {/*        : closeDivClassName*/}
                    {/*    }>*/}
                    {/*    <div*/}
                    {/*      className={*/}
                    {/*        isEqual(open, index)*/}
                    {/*          ? openTitleClassName*/}
                    {/*          : closeTitleClassName*/}
                    {/*      }>*/}
                    {/*      {i?.attributes?.title}*/}

                    {/*    </div>*/}
                    {/*    <div className="p-2">*/}
                    {/*      /!* {isEqual(open, index) ? <Minus /> : <Plus />} *!/*/}
                    {/*    </div>*/}
                    {/*  </div>*/}
                    {/*  {isEqual(open, index) ? (*/}
                    {/*    <div className="bg-gray-50 p-4 rounded-b-xl">*/}
                    {/*      <p className="text-gray-800">*/}
                    {/*        {i?.attributes?.description}*/}
                    {/*      </p>*/}
                    {/*    </div>*/}
                    {/*  ) : null}*/}
                    {/*</div>*/}
                  </>
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
}
