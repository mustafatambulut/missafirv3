import { IWhoWeAre } from "@/app/pages/static/who-we-are/types";
import {
  slice,
  words,
  get,
  capitalize,
  upperCase,
  isEqual,
  isNull,
  isEmpty,
  map
} from "lodash";
import Image from "next/image";

import BodyHeartIcon from "/public/images/contact_heart.svg";
import HeaderImage from "/public/images/contact_header.svg";
import UnderLine from "/public/images/underline.svg";
import DownArrow from "/public/images/new_down_arrow.svg";
import UpArrow from "/public/images/new_up_arrow.svg";
import LinkedIn from "/public/images/linkedin.svg";
import { getPage } from "@/app/service/api";
import PremiumStatic from "@/components/atoms/premiumStatic/PremiumStatic";
import { useTranslations } from "next-intl";
import Marquee from "@/components/atoms/marquee/Marquee";
import { isMobile } from "react-device-detect";

const WhoWeAre = ({ data }) => {
  const t = useTranslations();

  let showMore = false;

  function handlerShowMore(value: any) {
    showMore = value;
  }

  data = data.attributes;
  // console.log("slidedata",map(
  //   get(data, "body.aboutUs.sliders.data"),
  //   (slider) => slider.attributes.image
  // ))
  return (
    <>
      <div className="flex lg:justify-center font-mi-sans mt-16 lg:mt-40 relative">
        <div className="py-10">
          {/* Behind Missafir */}
          <div className="block absolute top-[10rem] lg:top-8 right-0 z-10">
            <HeaderImage />
          </div>
          <div className="text-center mb-10 px-4 lg:px-8">
            <h1 className="text-primary font-mi-sans-semi-bold text-42">
              {capitalize(words(data.header?.title)[0])}{" "}
              <span className="text-gray-800">
                {capitalize(words(data.header?.title)[1])}
              </span>
            </h1>
            <p className="text-gray-600 pt-4 text-21 mx-4">
              {slice(words(data.header?.description), 0, 13)?.join(" ")}{" "}
              <br className="hidden lg:block" />
              <span>
                {slice(words(data.header?.description), 13)?.join(" ")}
              </span>
            </p>
          </div>
          <div className="w-screen relative">
            <div className="min-w-screen-sm flex -ml-6">
              {
                data.body.aboutUs.sliders?.data &&
                  data.body.aboutUs.sliders?.data.length && (
                    <Marquee
                      items={map(
                        get(data, "body.aboutUs.sliders.data"),
                        (slider) => slider.attributes.image
                      )}
                      className="p-2"
                      direction="left"
                      marqueeItemClassName="rounded-xl shadow-[0px_2px_10px_0px_#00000014] relative w-64 lg:w-80 h-44 lg:h-56 p-2 mx-2"
                      marqueeItemInnerClassName="w-full h-full"
                      marqueeImageClassName="object-cover rounded-xl"
                    />
                  )
                //   data.body.aboutUs.sliders.data?.map((i: any, index: any) => (
                //   <div
                //     key={index}
                //     className="w-64 h-60 bg-white shadow-md rounded-xl p-3 flex justify-center mx-2">
                //     <Image
                //       src={i?.attributes?.image || "/"}
                //       alt={i?.attributes?.description || "/"}
                //       width={0}
                //       height={0}
                //       sizes="100vw"
                //       className="rounded-xl"
                //       style={{ width: "100%", height: "auto" }}
                //     />
                //   </div>
                // ))
              }
            </div>
            <div className="block absolute bottom-[-8rem] lg:bottom-[-10rem] left-[-2rem] lg:left-0 z-10 scale-75 lg:scale-100">
              <BodyHeartIcon />
            </div>
          </div>
          {/* Spacer */}
          <div className="my-24" />
          {/* Our Journey */}
          <div className="container mx-auto p-4 text-center">
            <h3 className="text-md text-gray-500">
              {upperCase(data.body.content?.title)}
            </h3>
            <div>
              <h4 className="font-mi-sans-semi-bold text-32 text-primary">
                {slice(words(data.body.content?.subTitle), 0, 2)?.join(" ")}{" "}
                <span className="text-gray-800">
                  {slice(words(data.body.content?.subTitle), 2, -1)?.join(" ")}{" "}
                </span>
                <span className="text-gray-800">
                  {slice(words(data.body.content?.subTitle), -1)?.join(" ")}
                </span>
              </h4>
              <div className="flex justify-center -mt-1 mx-auto lg:absolute lg:right-64 lg:mr-36">
                <UnderLine />
              </div>
              <p className="mt-6 text-gray-600 text-sm lg:text-lg">
                {data.body.content?.description}
              </p>
            </div>
          </div>
          {/* Spacer */}
          <div className="my-24" />
          {/* Our Story */}
          <div className="container mx-auto p-4 text-center">
            <h3 className="text-md text-gray-500">
              {data.body.aboutUs?.title}
            </h3>
            <div className="flex:none lg:flex mt-10 items-center lg:gap-x-4">
              <div className="w-auto lg:w-2/5">
                <div className=" bg-white shadow-md rounded-xl justify-center">
                  <div className="px-4 py-4">
                    <Image
                      src={
                        data.body.aboutUs?.sliders?.data[0]?.attributes
                          ?.image || "/"
                      }
                      alt={
                        data.body.aboutUs?.sliders?.data[0]?.attributes
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
              <div className="w-full py-4 text-left flex flex-col items-center text-gray text-sm lg:text-lg">
                {data.body.aboutUs?.sliders.data &&
                  data.body.aboutUs?.sliders.data[0]?.attributes?.description}
                {/*<div*/}
                {/*  onClick={() => handlerShowMore(!showMore)}*/}
                {/*  className="w-full flex items-center text-left mt-4 text-primary font-mi-sans-semi-bold">*/}
                {/*  {t("read_more")}*/}
                {/*  <div className="items-center ml-2">*/}
                {/*    {showMore ? <UpArrow /> : <DownArrow />}*/}
                {/*  </div>*/}
                {/*</div>*/}
              </div>
            </div>
            {/* Show More Area */}
            {showMore && (
              <div className="container mx-auto p-4 text-left">
                <div className="flex-none lg:flex lg:justify-between items-center">
                  <div className="w-auto lg:w-2/3 text-sm lg:text-lg text-gray">
                    {
                      data.body.aboutUs?.data.body.sliders?.data[1]?.attributes
                        ?.description
                    }
                  </div>
                  <div className="w-full lg:w-1/3 lg:p-4 p-0 mt-4 lg:mt-0">
                    <div className=" bg-white shadow-md rounded-xl justify-center mx-0 lg:mx-2">
                      <div className="px-4 py-4">
                        <Image
                          src={
                            data.body.aboutUs?.sliders?.data[0]?.attributes
                              ?.image || "/"
                          }
                          alt={
                            data.body.aboutUs?.sliders?.data[0]?.attributes
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
          <div className="flex px-3 flex-wrap justify-center">
            {data.body.brands &&
              data.body.brands.sliders.data.map((i: any, key: any) => (
                <div key={key} className="w-2/4 lg:w-1/4 p-2">
                  <div className="bg-white shadow-base-blur-10 p-2 lg:p-3 text-center flex flex-col align-middle items-center justify-center rounded-xl">
                    {i?.attributes?.image ? (
                      <Image
                        src={i?.attributes?.image || "/"}
                        alt={"brand image"}
                        width={120}
                        height={53}
                        sizes="100vw"
                        className="rounded-xl align-middle"
                      />
                    ) : null}
                    <div className="mt-2 text-sm lg:text-base text-gray font-mi-sans">
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
              {upperCase(data.body.firstTeam?.title)}
            </h3>
            <h4 className="font-mi-sans-semi-bold text-32 text-gray-800 text-center">
              {capitalize(data.body.firstTeam?.description)}
            </h4>

            {/* Team Zone */}
            <div className="flex-none lg:flex flex-row lg:flex-1 justify-center items-center">
              {/* Just For CEO */}
              {data.body.firstTeam &&
                get(data.body.firstTeam?.members, "data").map(
                  (i: any, index: any) => {
                    return (
                      <div
                        key={index}
                        className={isEqual(index, 0) ? "" : "hidden"}>
                        <div className="items-center text-center" />
                        <div className="text-center bg-white shadow-xl m-2 lg:w-96 rounded-xl py-4">
                          <div className="w-20 lg:w-24 h-20 lg:h-24 rounded-full overflow-hidden mx-auto relative">
                            <Image
                              src={i?.attributes?.image || "/"}
                              fill={true}
                              alt={i?.attributes?.fullname || "/"}
                              className="object-cover"
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
              {data.body.firstTeam &&
                get(data.body.firstTeam?.members, "data").map(
                  (i: any, index: any) => {
                    return (
                      <div
                        key={index}
                        className={isEqual(index, 0) ? "hidden" : "mt-3"}>
                        <div className="items-center text-center" />
                        <div className="text-center bg-white shadow-xl m-2 lg:w-96 rounded-xl py-4">
                          <div className="w-20 lg:w-24 h-20 lg:h-24 rounded-full overflow-hidden mx-auto relative">
                            <Image
                              src={i?.attributes?.image || "/"}
                              fill={true}
                              alt={i?.attributes?.fullname || "/"}
                              className="object-cover"
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
              {upperCase(data.body.allTeam?.title)}
            </h3>
            <h4 className="font-mi-sans-semi-bold text-32 text-gray-800 text-center">
              {capitalize(data.body.allTeam?.description)}
            </h4>

            <div className="w-1/1 flex-wrap flex-none lg:flex lg:flex-1 justify-center items-center">
              {data.body.allTeam &&
                get(data.body.allTeam?.members, "data").map(
                  (i: any, index: any) => {
                    return (
                      <div key={index} className={"mt-3 w-1/1 lg:w-1/4"}>
                        <div className="items-center text-center" />
                        <div className="text-center bg-white shadow-xl m-2 rounded-xl py-4">
                          <div className="w-20 lg:w-24 h-20 lg:h-24 rounded-full overflow-hidden mx-auto relative">
                            <Image
                              src={i?.attributes?.image || "/"}
                              fill={true}
                              alt={i?.attributes?.fullname || "/"}
                              className="object-cover"
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
        title={data.Footer?.bannerHeader.title}
        description={data.Footer?.bannerBody.description}
        buttonLabel={data.Footer?.bannerFooter.label}
        image={data.Footer?.bannerBody.image}
      />
    </>
  );
};

export default WhoWeAre;
