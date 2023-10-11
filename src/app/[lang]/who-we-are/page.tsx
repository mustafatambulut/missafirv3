"use client";
import { IWhoWeAre } from "@/app/[lang]/who-we-are/types";
import { useEffect, useState } from "react";
import {
  slice,
  words,
  get,
  capitalize,
  upperCase,
  isEqual,
  isNull,
  isEmpty,
} from "lodash";
import Image from "next/image";
 
import BodyHeartIcon from "../../../../public/images/contact_heart.svg";
import HeaderImage from "../../../../public/images/contact_header.svg";
import UnderLine from "../../../../public/images/underline.svg";
import DownArrow from "../../../../public/images/new_down_arrow.svg";
import UpArrow from "../../../../public/images/new_up_arrow.svg";
import LinkedIn from "../../../../public/images/linkedin.svg";
import { getPage } from "../../../service/api";
import { WHOWEARE } from "../../constants";
import PremiumStatic from "@/components/atoms/premiumStatic/PremiumStatic";
import { useTranslations } from "next-intl";

const WhoWeAre = () => {
  const t = useTranslations()
  const [showMore, setShowMore] = useState<any>(false);
  const [weAreData, setWeAreData] = useState<any>(null);
  const [sliders, setSliders] = useState<any>([] as any);
  const [body, setBody] = useState<any>(null);
  const [footer, setFooter] = useState<any>(null);
  const [header, setHeader] = useState<any>(null);
  const [contentCard, setContentCard] = useState<any>(null);
  const [brands, setBrands] = useState<any>(null);
  const [firstTeam, setFirstTeam] = useState<any>(null);
  const [allTeam, setAllTeam] = useState<any>(null);
  const [aboutUs, setAboutUs] = useState<any>(null);

  const fetchData = async (context: any) => {
    const { attributes } = await getPage(context);
    !isNull(attributes) && setWeAreData(attributes);
  };

  useEffect(() => {
    isEmpty(weAreData) && fetchData(WHOWEARE);
  }, []);

  useEffect(() => {
    if (!weAreData) return;

    setFirstTeam(get(weAreData.body, "firstTeam"))
    setSliders(get(weAreData.body, "sliders"))
    setContentCard(get(weAreData.body, "content"))
    setAboutUs(get(weAreData.body, "aboutUs"))
    setBrands(get(weAreData.body, "brands"))
    setAllTeam(get(weAreData.body, "allTeam"))

    setFooter(get(weAreData, "Footer"));
    setHeader(get(weAreData, "header"));
  }, [weAreData]);

  return (
    <>
      <div className="flex lg:justify-center font-mi-sans mt-20 lg:mt-40 px-4 lg:px-80">
        <div className="py-10">
          {/* Behind Missafir */}
          <div className="hidden lg:block absolute top-8 right-0">
            <HeaderImage />
          </div>
          <div className="text-center">
            <h1 className="text-primary font-mi-sans-semi-bold text-42">
              {capitalize(words(header?.title)[0])}{" "}
              <span className="text-gray-800">
                {capitalize(words(header?.title)[1])}
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
                sliders.data?.map((i: any, index: any) => (
                  <div
                    key={index}
                    className="w-64 h-60 bg-white shadow-md rounded-xl p-3 flex justify-center mx-2">
                    <Image
                      src={i?.attributes?.image || "/"}
                      alt={i?.attributes?.description || "/"}
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="rounded-xl"
                      style={{ width: "100%", height: "auto" }}
                    />
                  </div>
                ))}
            </div>
          </div>
          <div className="hidden lg:block absolute top-64 mt-24 left-0">
            <BodyHeartIcon />
          </div>
          {/* Spacer */}
          <div className="my-24" />
          {/* Our Journey */}
          <div className="container mx-auto p-4 text-center">
            <h3 className="text-md text-gray-500">
              {upperCase(contentCard?.title)}
            </h3>
            <div>
              <h4 className="font-mi-sans-semi-bold text-32 text-primary">
                {slice(words(contentCard?.subTitle), 0, 2)?.join(
                  " "
                )}{" "}
                <span className="text-gray-800">
                  {slice(
                    words(contentCard?.subTitle),
                    2,
                    -1
                  )?.join(" ")}{" "}
                </span>
                <span className="text-gray-800">
                  {slice(words(contentCard?.subTitle), -1)?.join(
                    " "
                  )}
                </span>
              </h4>
              <div className="flex justify-center -mt-1 mx-auto lg:absolute lg:right-64 lg:mr-36">
                <UnderLine />
              </div>
              <p className="mt-6 text-gray-600 text-sm lg:text-lg">
                {contentCard?.description}
              </p>
            </div>
          </div>
          {/* Spacer */}
          <div className="my-24" />
          {/* Our Story */}
          <div className="container mx-auto p-4 text-center">
            <h3 className="text-md text-gray-500">
              {aboutUs?.title}
            </h3>
            <div className="flex:none lg:flex mt-10">
              <div className="w-auto lg:w-2/5">
                <div className=" bg-white shadow-md rounded-xl justify-center mx-2">
                  <div className="px-4 py-4">
                    <Image
                      src={
                        aboutUs?.sliders?.data[0]?.attributes?.image || "/"
                      }
                      alt={
                        aboutUs?.sliders?.data[0]?.attributes
                          ?.description || "/"
                      }
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{ width: "100%", height: "auto" }}
                      className="rounded-xl"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full p-4 text-left flex flex-col items-center text-gray text-sm lg:text-lg">
                {aboutUs?.sliders.data && aboutUs?.sliders.data[0]?.attributes?.description}
                <div
                  onClick={() => setShowMore(!showMore)}
                  className="w-full flex items-center text-left mt-4 text-primary font-mi-sans-semi-bold">
                  {t("read_more")}
                  <div className="items-center ml-2">
                    {showMore ? <UpArrow /> : <DownArrow />}
                  </div>
                </div>
              </div>
            </div>
            {/* Show More Area */}
            {showMore && (
              <div className="container mx-auto p-4 text-left">
                <div className="flex-none lg:flex lg:justify-between items-center">
                  <div className="w-auto lg:w-2/3 text-sm lg:text-lg text-gray">
                    {
                      aboutUs?.sliders?.data[1]?.attributes
                        ?.description
                    }
                  </div>
                  <div className="w-full lg:w-1/3 lg:p-4 p-0 mt-4 lg:mt-0">
                    <div className=" bg-white shadow-md rounded-xl justify-center mx-0 lg:mx-2">
                      <div className="px-4 py-4">
                        <Image
                          src={
                            aboutUs?.sliders?.data[0]?.attributes
                              ?.image || "/"
                          }
                          alt={
                            aboutUs?.sliders?.data[0]?.attributes
                              ?.description || "/"
                          }
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "100%", height: "auto" }}
                          className="rounded-xl"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Spacer */}
          <div className="my-24" />
          {/* Brand Cards */}
          <div className="flex m-2 lg:m-8 flex-wrap justify-center">
            {brands &&
              brands.sliders.data.map((i: any, key: any) => (
                <div key={key} className="w-2/4 lg:w-1/4 p-2">
                  <div className="m-1 bg-white shadow-xl p-2 text-center flex flex-col align-middle items-center justify-center rounded-xl">
                    <Image
                      src={i?.attributes?.image || "/"}
                      alt={"brand image"}
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{ width: "50%", height: "auto" }}
                      className="rounded-xl align-middle"
                    />
                    <div className="mt-4 px-1 text-sm lg:text-lg text-gray font-mi-sans">
                      {i?.attributes?.description}
                    </div>
                  </div>
                </div>
              ))}
          </div>
          {/* Brand Cards End */}
          {/* Spacer */}
          <div className="my-24" />
          {/* Executive Team */}
          <div className="container mx-auto p-4">
            {/* Title Zone */}
            <h3 className="text-md text-gray-500 text-center">
              {upperCase(firstTeam?.title)}
            </h3>
            <h4 className="font-mi-sans-semi-bold text-32 text-gray-800 text-center">
              {capitalize(firstTeam?.description)}
            </h4>

            {/* Team Zone */}
            <div className="flex-none lg:flex flex-row lg:flex-1 justify-center items-center">
              {/* Just For CEO */}
              {firstTeam &&
                get(firstTeam?.members, "data").map(
                  (i: any, index: any) => {
                    return (
                      <div
                        key={index}
                        className={isEqual(index, 0) ? "" : "hidden"}>
                        <div className="items-center text-center" />
                        <div className="text-center bg-white shadow-xl m-2 lg:w-96 rounded-xl py-4">
                          <div className="w-20 h-20 rounded-full overflow-hidden mx-auto ">
                            <Image
                              src={i?.attributes?.image || "/"}
                              width={0}
                              height={0}
                              alt={i?.attributes?.fullname || "/"}
                              sizes="100vw"
                              className="rounded-full w-24 h-24"
                            />
                          </div>
                          <div className="pt-3 font-mi-sans-semi-bold text-xl">
                            {i?.attributes?.fullname}
                          </div>
                          <div className="pt-3 text-gray-500 text-15">
                            {i?.attributes?.position}
                          </div>
                          <p className="pt-3 text-gray-600 text-15">
                            {i?.attributes?.description}
                          </p>
                          <div className="pt-3 flex justify-center">
                            <a href="#">
                              <LinkedIn />
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
            </div>

            {/* Our Senior Team */}
            <div className="flex-none lg:flex flex-row lg:flex-1 justify-center items-center">
              {firstTeam &&
                get(firstTeam?.members, "data").map(
                  (i: any, index: any) => {
                    return (
                      <div
                        key={index}
                        className={isEqual(index, 0) ? "hidden" : "mt-3"}>
                        <div className="items-center text-center" />
                        <div className="text-center bg-white shadow-xl m-2 lg:w-96 rounded-xl py-4">
                          <div className="w-20 h-20 rounded-full overflow-hidden mx-auto ">
                            <Image
                              src={i?.attributes?.image || "/"}
                              width={0}
                              height={0}
                              alt={i?.attributes?.fullname || "/"}
                              sizes="100vw"
                              className="rounded-full w-24 h-24"
                            />
                          </div>
                          <div className="pt-3 font-mi-sans-semi-bold text-xl">
                            {i?.attributes?.fullname}
                          </div>
                          <div className="pt-3 text-gray-500 text-15">
                            {i?.attributes?.position}
                          </div>
                          <p className="pt-3 text-gray-600 text-15">
                            {i?.attributes?.description}
                          </p>
                          <div className="pt-3 flex justify-center">
                            <a href="#">
                              <LinkedIn />
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
            </div>
          </div>
          {/* Spacer */}
          <div className="my-24" />
          {/* All Team start here */}
          <div className="container mx-auto p-4">
            {/* Title Zone */}
            <h3 className="text-md text-gray-500 text-center">
              {upperCase(allTeam?.title)}
            </h3>
            <h4 className="font-mi-sans-semi-bold text-32 text-gray-800 text-center">
              {capitalize(allTeam?.description)}
            </h4>

            <div className="w-1/1 flex-wrap flex-none lg:flex lg:flex-1 justify-center items-center">
              {allTeam &&
                get(allTeam?.members, "data").map(
                  (i: any, index: any) => {
                    return (
                      <div key={index} className={"mt-3 w-1/1 lg:w-1/4"}>
                        <div className="items-center text-center" />
                        <div className="text-center bg-white shadow-xl m-2 rounded-xl py-4">
                          <div className="w-20 h-20 rounded-full overflow-hidden mx-auto ">
                            <Image
                              src={i?.attributes?.image || "/"}
                              width={0}
                              height={0}
                              // placeholder="blur"
                              alt={i?.attributes?.fullname || "/"}
                              sizes="100vw"
                              // blurDataURL={i?.attributes?.image}
                              className="rounded-full w-24 h-24"
                            />
                          </div>
                          <div className="pt-3 font-mi-sans-semi-bold text-xl">
                            {i?.attributes?.fullname}
                          </div>
                          <div className="pt-3 text-gray-500 text-15">
                            {i?.attributes?.position}
                          </div>
                          <div className="pt-3 text-gray-600 text-15 px-2">
                            {i?.attributes?.description}
                          </div>
                          <div className="pt-3 flex justify-center">
                            <a href="#">
                              <LinkedIn />
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
            </div>
          </div>{" "}
          {/* End of the allTeam */}
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

export default WhoWeAre;
