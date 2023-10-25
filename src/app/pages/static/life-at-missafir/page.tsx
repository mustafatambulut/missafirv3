import Image from "next/image";
import { get, map, size, slice, words, capitalize } from "lodash";

import PremiumStatic from "@/components/atoms/premiumStatic/PremiumStatic";

import Chair from "/public/images/chair.svg";
import UnderLine from "/public/images/underline.svg";
import HeaderImage from "/public/images/contact_header.svg";
import BodyHeartIcon from "/public/images/contact_heart.svg";

const LifAtMissafir = ({ data }: any) => {
  const sliders = get(data, "attributes.body.sliders");
  const contents: any = map(get(data, "attributes.body"));

  return (
    <>
      <div className="flex lg:justify-center font-mi-sans mt-20 lg:mt-40 px-4 lg:px-80">
        <div className="py-10">
          <div className="hidden lg:block absolute top-40 right-0">
            <HeaderImage />
          </div>
          <div className="text-center">
            <h1 className="text-primary font-mi-sans-semi-bold text-42">
              {capitalize(words(get(data, "attributes.header.title"))[0])}
              <span className="text-gray-800">
                {capitalize(words(get(data, "attributes.header.title"))[1])}
              </span>
              <span className="text-gray-800">
                {capitalize(words(get(data, "attributes.header.title"))[2])}
              </span>
            </h1>
            <p className="text-gray-600 pt-4 text-21 mx-4">
              {slice(
                words(get(data, "attributes.header.description")),
                0,
                13
              )?.join(" ")}
              <br className="hidden lg:block" />
              <span>
                {slice(
                  words(get(data, "attributes.header.description")),
                  13
                )?.join(" ")}
              </span>
            </p>
          </div>
          <div className="w-full flex overflow-x-auto py-4 mt-4">
            {/*<div className="min-w-screen-sm flex -ml-6">*/}
            <div className="flex">
              {get(sliders, "data") &&
                size(get(sliders, "data")) &&
                map(get(sliders, "data"), (i: any, index: any) => (
                  <div
                    key={index}
                    className="w-64 h-60 bg-white shadow-md rounded-xl p-3 flex justify-center mx-2">
                    {get(i, "attributes.image") && (
                      <Image
                        src={get(i, "attributes.image")}
                        alt={get(i, "attributes.description") || "image"}
                        width={0}
                        height={0}
                        sizes="100vw"
                        placeholder="blur"
                        blurDataURL={get(i, "attributes.image")}
                        className="rounded-xl object-cover"
                        style={{ width: "100%", height: "auto" }}
                      />
                    )}
                  </div>
                ))}
            </div>
          </div>
          <div className="hidden lg:block absolute bottom-10 mt-24 left-0">
            <BodyHeartIcon />
          </div>
          <div className="my-24" />
          <div className="container mx-auto p-4 text-center">
            <h3 className="text-md text-gray-500">
              {get(contents, "[2].title")}
            </h3>
            <div>
              <h4 className="font-mi-sans-semi-bold text-32 text-gray">
                {get(contents, "[2].subTitle")}
              </h4>
              <div className="flex justify-center -mt-1 mx-auto lg:absolute lg:right-80 lg:mr-36">
                <UnderLine />
              </div>
              <p className="mt-6 text-gray-600 text-sm lg:text-lg">
                {get(contents, "[2].description")}
              </p>
            </div>
          </div>
          <div className="my-24" />
          {contents[3] &&
            size(contents[3]) &&
            map(contents[3], (i: any, index: any) => {
              return (
                <div
                  key={index}
                  className={
                    index % 2 === 0
                      ? "flex-none lg:flex px-1 lg:px-8 mt-16"
                      : "flex-none lg:flex px-1 lg:px-8 flex-row-reverse mt-16 "
                  }>
                  <div className="flex-1 px-2">
                    {get(i, "image") && (
                      <Image
                        src={get(i, "image")}
                        alt=""
                        width={0}
                        height={0}
                        sizes="100vw"
                        placeholder="blur"
                        blurDataURL={get(i, "image")}
                        className="rounded-xl"
                        style={{ width: "100%", height: "auto" }}
                      />
                    )}
                  </div>
                  <div className="flex-1 px-2 flex flex-col items-center justify-center mt-8 lg:mt-0">
                    <div className="w-14 h-14 bg-primary-25 flex justify-center items-center rounded-lg">
                      <Chair />
                    </div>
                    <h5 className="text-primary font-mi-sans-semi-bold text-32 mt-4">
                      {get(i, "title")}
                    </h5>
                    <h6 className="font-mi-sans-semi-bold text-22 mt-4">
                      {get(i, "subTitle")}
                    </h6>
                    <p className="px-0 lg:px-2 text-center mt-4 text-gray text-lg font-mi-sans">
                      {get(i, "description")}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <PremiumStatic
        link={get(data, "attributes.footer.bannerFooter.link")}
        title={get(data, "attributes.footer.bannerHeader.title")}
        description={get(data, "attributes.footer.bannerBody.description")}
        buttonLabel={get(data, "attributes.footer.bannerFooter.label")}
        image={get(data, "attributes.footer.bannerBody.image")}
      />
    </>
  );
};

export default LifAtMissafir;
