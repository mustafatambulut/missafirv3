"use client";
import { useEffect, useState } from "react";

import BodyHeartIcon from "../../../../public/images/contact_heart.svg";
import HeaderImage from "../../../../public/images/contact_header.svg";
import UnderLine from "../../../../public/images/underline.svg";
import Chair from "../../../../public/images/chair.svg";
import UpArrow from "../../../../public/images/new_up_arrow.svg";
import LinkedIn from "../../../../public/images/linkedin.svg";
import Image from "next/image";

import PremiumStatic from "@/components/atoms/premiumStatic/PremiumStatic";
import {
  capitalize,
  get,
  isEmpty,
  isNull,
  map,
  slice,
  split,
  tail,
  upperCase,
  words
} from "lodash";
import { getPage } from "../../../service/api";
import { LIFEATMISSAFIR } from "../../constants";

const LifAtMissafir = () => {
  const [lifeAtData, setLifeAtData] = useState<any>(null);
  const [sliders, setSliders] = useState<any>([] as any);
  const [body, setBody] = useState<any>(null);
  const [footer, setFooter] = useState<any>(null);
  const [header, setHeader] = useState<any>(null);
  const [contentCard, setContentCard] = useState<any>(null);

  const fetchData = async (context: any) => {
    const { attributes } = await getPage(context);
    !isNull(attributes) && setLifeAtData(attributes);
  };

  useEffect(() => {
    isEmpty(lifeAtData) && fetchData(LIFEATMISSAFIR);
  }, []);

  useEffect(() => {
    if (!lifeAtData) return;

    const contents: any = map(get(lifeAtData, "body"));
    // setTabContents(map(contents, (content) => pick(content, ["accordions"])));
    // setSliders(map(contents, (content) => pick(content, ["sliders"])));
    setSliders(contents[1]);
    setBody(contents[2]);
    setContentCard(contents[3]);
    setFooter(get(lifeAtData, "footer"));
    setHeader(get(lifeAtData, "header"));
  }, [lifeAtData]);
  return (
    <>
      <div className="flex lg:justify-center font-mi-sans mt-20 lg:mt-40 px-4 lg:px-80">
        <div className="py-10">
          {" "}
          {/* Outside div zone */}
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
          <div className="w-full flex overflow-x-auto py-4 mt-4">
            <div className="min-w-screen-sm flex -ml-6">
              {sliders?.data &&
                sliders?.data.length &&
                sliders.data.map((i: any, index: any) => (
                  <div
                    key={index}
                    className="w-64 h-60 bg-white shadow-md rounded-xl p-3 flex justify-center mx-2">
                    <Image
                      src={i?.attributes?.image || "/"}
                      alt={i?.attributes?.description || "/"}
                      width={0}
                      height={0}
                      sizes="100vw"
                      placeholder="blur"
                      blurDataURL={i?.attributes?.image || "/"}
                      className="rounded-xl"
                      style={{ width: "100%", height: "auto" }}
                    />
                  </div>
                ))}
            </div>
          </div>
          <div className="hidden lg:block absolute top-64 mt-24 left-0">
            <BodyHeartIcon />
          </div>{" "}
          {/* Title and Slider Zone End */}
          {/* Spacer */}
          <div className="my-24" />
          {/* Body Header Zone */}
          <div className="container mx-auto p-4 text-center">
            <h3 className="text-md text-gray-500">{upperCase(body?.title)}</h3>
            <div>
              <h4 className="font-mi-sans-semi-bold text-32 text-gray">
                {body?.subTitle}{" "}
              </h4>
              <div className="flex justify-center -mt-1 mx-auto lg:absolute lg:right-80 lg:mr-36">
                <UnderLine />
              </div>
              <p className="mt-6 text-gray-600 text-sm lg:text-lg">
                {body?.description}
              </p>
            </div>
          </div>{" "}
          {/* Body Header Zone End */}
          {/* Spacer */}
          <div className="my-24" />
          {/* Body Content Zone Start */}
          {contentCard &&
            contentCard.length &&
            contentCard.map((i: any, index: any) => {
              return (
                <div
                  key={index}
                  className={
                    index % 2 === 0
                      ? "flex-none lg:flex px-1 lg:px-8 mt-16"
                      : "flex-none lg:flex px-1 lg:px-8 flex-row-reverse mt-16 "
                  }>
                  <div className="flex-1 px-2">
                    <Image
                      src={i?.image || "/"}
                      alt=""
                      width={0}
                      height={0}
                      sizes="100vw"
                      placeholder="blur"
                      blurDataURL={i?.image || "/"}
                      className="rounded-xl"
                      style={{ width: "100%", height: "auto" }}
                    />
                  </div>
                  <div className="flex-1 px-2 flex flex-col items-center justify-center mt-8 lg:mt-0">
                    <div className="w-14 h-14 bg-primary-25 flex justify-center items-center rounded-lg">
                      <Chair />
                    </div>
                    <h5 className="text-primary font-mi-sans-semi-bold text-32 mt-4">
                      {i.title}
                    </h5>
                    <h6 className="font-mi-sans-semi-bold text-22 mt-4">
                      {i.subTitle}
                    </h6>
                    <p className="px-0 lg:px-2 text-center mt-4 text-gray text-lg font-mi-sans">
                      {i.description}
                    </p>
                  </div>
                </div>
              );
            })}
          {/* Outside Div Area */}
        </div>
      </div>

      <PremiumStatic
        title={footer?.bannerHeader.title}
        description={footer?.bannerBody.description}
        buttonLabel={footer?.bannerFooter.label}
        image={footer?.bannerBody.image}
      />
    </>
  );
};

export default LifAtMissafir;
