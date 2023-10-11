"use client";
import { ISustainability } from "@/app/[lang]/sustainability/types";

import BodyHeartIcon from "../../../../public/images/contact_heart.svg";
import HeaderImage from "../../../../public/images/contact_header.svg";
import {
  capitalize,
  get,
  isEmpty,
  isNull,
  map,
  slice,
  upperCase,
  words
} from "lodash";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getPage } from "../../../service/api";
import { SUSTAINABILITY } from "../../constants";
import PremiumStatic from "@/components/atoms/premiumStatic/PremiumStatic";

const Sustainability = () => {
  const [sustainabilityData, setSustainabilityData] = useState<any>(null);
  const [sliders, setSliders] = useState<any>([] as any);
  const [body, setBody] = useState<any>(null);
  const [footer, setFooter] = useState<any>(null);
  const [header, setHeader] = useState<any>(null);
  // const [tabTitles, setTabTitles] = useState<any>(null);

  const fetchData = async (context: any) => {
    const { attributes } = await getPage(context);
    !isNull(attributes) && setSustainabilityData(attributes);
  };

  useEffect(() => {
    isEmpty(sustainabilityData) && fetchData(SUSTAINABILITY);
  }, []);

  useEffect(() => {
    if (!sustainabilityData) return;

    const contents: any = map(get(sustainabilityData, "body"));

    setSliders(contents[1]);
    setBody(contents[2]);
    setFooter(get(sustainabilityData, "footer"));
    setHeader(get(sustainabilityData, "header"));
  }, [sustainabilityData]);
  return (
    <>
      <div className="flex lg:justify-center font-mi-sans mt-20 lg:mt-40 px-4 lg:px-80">
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
          <div className="w-full flex overflow-x-auto py-4 mt-4">
            <div className="min-w-screen-sm flex -ml-6">
              {sliders?.data &&
                sliders?.data.length &&
                sliders?.data?.map((i: any, index: any) => (
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
                      blurDataURL={i?.attributes?.image}
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
              <p className="mt-6 text-gray-600 text-sm lg:text-lg">
                {body?.description}
              </p>
            </div>
          </div>{" "}
          {/* Body Header Zone End */}
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

export default Sustainability;
