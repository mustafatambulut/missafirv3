"use client";

import { useEffect, useState } from "react";
import { IInviteAndEarn } from "@/app/[lang]/invite-and-earn/types";
import { capitalize, get, isEmpty, isNull, map, slice, words } from "lodash";

import BodyHeartIcon from "../../../../public/images/contact_heart.svg";
import HeaderImage from "../../../../public/images/contact_header.svg";
import LivingRoom from "../../../../public/images/living-room.svg";
import Document from "../../../../public/images/document.svg";

import PremiumStatic from "@/components/atoms/premiumStatic/PremiumStatic";
import Button from "@/components/atoms/button/Button";
import { INVITEEARN } from "../../constants";
import { getPage } from "../../../service/api";
import { useTranslations } from "next-intl";
import InfoSection from "@/components/molecules/infoSection/InfoSection";

const InviteAndEarn = () => {
  // const [data, setData] = useState<any>(myResponse?.data?.attributes);
  const t = useTranslations();
  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<any>();
  const [passIndex, setPassIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const backgroundStyle = {
    background:
      "linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, rgba(207, 30, 81, 0.05) 100%)"
  };

  const [inviteEarnData, setInviteEarn] = useState<any>(null);
  const [timeline, setTimeline] = useState<any>(null);
  const [infoContent, setInfoContent] = useState<any>(null);
  const [footer, setFooter] = useState<any>(null);
  const [header, setHeader] = useState<any>(null);
  const [contentCard, setContentCard] = useState<any>(null);

  const fetchData = async (context: any) => {
    const { attributes } = await getPage(context);
    !isNull(attributes) && setInviteEarn(attributes);
  };

  useEffect(() => {
    isEmpty(inviteEarnData) && fetchData(INVITEEARN);
  }, []);

  useEffect(() => {
    if (!inviteEarnData) return;

    const contents: any = map(get(inviteEarnData, "body"));
    let data:any = {};
    data["infoContents"] = contents[3];
    
    setContentCard(contents[1]);
    setTimeline(contents[2]);
    setInfoContent(data);
    setFooter(get(inviteEarnData, "footer"));
    setHeader(get(inviteEarnData, "header"));
  }, [inviteEarnData]);

  const handleForm = () => {};

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
          <div className="container mx-auto flex-none lg:flex">
            {contentCard &&
              contentCard.length &&
              contentCard.map((i: any, index: any) => {
                return (
                  <div key={index} className="flex-1 text-center mt-10">
                    <div className="w-16 h-16 rounded-lg bg-primary-25 px-4 py-4 mx-auto">
                      {isNull(i?.iconUrl) ? (
                        <LivingRoom />
                      ) : (
                        <img src={i?.iconUrl} alt={i?.title} />
                      )}
                    </div>
                    <h4 className="font-mi-sans-semi-bold text-22 text-gray-800 px-0 lg:px-20 mt-4">
                      {i?.title}
                    </h4>
                    <p className="text-gray mt-4 px-0 lg:px-20 text-lg">
                      {i?.description}
                    </p>
                  </div>
                );
              })}
          </div>
          <div className="hidden lg:block absolute top-64 mt-40 left-0">
            <BodyHeartIcon />
          </div>{" "}
          {/* Title and Slider Zone End */}
          {/* Spacer */}
          <div className="my-32" />
          <div
            id="formZone"
            className="lg:mx-10 mx-6 bg-white shadow-xl lg:py-28 py-20 text-center rounded-xl">
            <h4 className="text-32 font-mi-sans-semi-bold">{header?.title}</h4>
            <p className="text-gray text-lg">
              {t("send_your_information_to_us")}
            </p>
            <div className="flex-none lg:flex lg:mx-52 mx-2 px-4 mt-8">
              <div className=" w-full lg:w-1/2 h-8 mt-10 lg:mx-2">
                <input
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border px-4 py-4 rounded-xl focus:border-none  text-gray"
                />
              </div>
              <div className=" w-full lg:w-1/2 h-8 mt-10 lg:mx-2">
                <input
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full border px-4 py-4 rounded-xl focus:border-none  text-gray"
                />
              </div>
            </div>

            <div className="flex-none lg:flex lg:mx-52 mx-2 px-4  mt-8">
              <div className=" w-full lg:w-1/2 h-8 mt-10 lg:mx-2">
                <input
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border px-4 py-4 rounded-xl focus:border-none  text-gray"
                />
              </div>
              <div className=" w-full lg:w-1/2 h-8 mt-10 lg:mx-2 ">
                <input
                  placeholder="Phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border px-4 py-4 rounded-xl focus:border-none text-gray"
                />
              </div>
            </div>
            <div className="mt-14">
              <button
                type="submit"
                onClick={handleForm}
                className="w-auto bg-primary px-6 py-4 rounded-xl text-white hover:opacity-80">
                {t("get_an_offer_now")}
              </button>
            </div>
          </div>
          {/* Spacer */}
          <div className="my-32" />
          {/* Preference Zone */}
          <div className="py-24" style={backgroundStyle}>
            <div className="text-center">
              <h4 className="text-32 font-mi-sans-semi-bold">
                {timeline?.title}
              </h4>
              <p className="text-gray text-lg">{timeline?.description}</p>
            </div>

            {/* Start of component */}
            {timeline &&
              timeline.timeline_steps.data.length &&
              timeline.timeline_steps.data.map((i: any, index: any) => {
                return (
                  <div key={index}>
                    {passIndex > 0 ? (
                      <div className="mx-auto p-4 mt-14">
                        <div className="relative flex justify-center">
                          <div className="border-l-2 border-gray-400 absolute h-full top-0 -z-0"></div>
                          <div className="flex flex-col">
                            <div className="w-6 h-6 rounded-full bg-gray mx-auto z-50 " />
                          </div>
                        </div>
                      </div>
                    ) : null}

                    {/* İlk zaman çizelgesi öğesi */}
                    {activeIndex === index ? (
                      <>
                        <div className="w-full mt-14 z-10 flex-col flex justify-center items-center py-4 ">
                          <div className="w-10 h-10 rounded-full bg-primary flex justify-center items-center text-white font-mi-sans-semi-bold">
                            1
                          </div>
                          <div className="w-14 h-14 mt-14 rounded-full bg-primary-25 flex justify-center items-center text-white font-mi-sans-semi-bold">
                            <Document />
                          </div>
                          <div className="my-4 text-center">
                            <h3 className=" text-28 font-semibold text-center">
                              {i?.attributes?.title}
                            </h3>
                            <p className="text-center text-gray mt-4">
                              {i?.attributes?.description}
                            </p>
                            <a href="#formZone">
                              <div className="w-60 bg-primary px-6 py-4 rounded-xl mt-4 text-white hover:opacity-80 mx-auto">
                                {i?.attributes?.buttonLabel}
                              </div>
                            </a>
                          </div>
                        </div>

                        {/* Noktaların bulunduğu alan */}
                        <div className="mx-auto p-4 mt-14">
                          <div className="relative flex justify-center">
                            <div className="border-l-2 border-gray-400 absolute h-full top-0 -z-0"></div>
                            <div className="flex flex-col">
                              <div
                                className="w-6 h-6 rounded-full bg-gray mx-auto z-50 cursor-pointer "
                                onClick={() => alert("Need a function")}
                              />
                              <div className="w-6 h-6 rounded-full bg-gray mx-auto z-50 mt-10" />
                            </div>
                          </div>
                        </div>
                      </>
                    ) : null}
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      <PremiumStatic
        title={footer?.bannerHeader.title}
        description={footer?.bannerBody.description}
        buttonLabel={footer?.bannerFooter.label}
        image={footer?.bannerBody.image}
      />

      {!isEmpty(infoContent) && <InfoSection infoContents={infoContent} />}
    </>
  );
};

export default InviteAndEarn;
