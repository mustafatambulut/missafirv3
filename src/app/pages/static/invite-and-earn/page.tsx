import { get, map, size, slice, words, isEmpty, capitalize } from "lodash";

import PremiumStatic from "@/components/atoms/premiumStatic/PremiumStatic";
import InfoSection from "@/components/molecules/infoSection/InfoSection";
import InviteEarnForm from "@/components/molecules/inviteEarnForm/InviteEarnForm";

import Document from "/public/images/document.svg";
import LivingRoom from "/public/images/living-room.svg";
import HeaderImage from "/public/images/contact_header.svg";
import BodyHeartIcon from "/public/images/contact_heart.svg";
import Typography from "@/components/atoms/typography/Typography";

const InviteAndEarn = async ({ data }: any) => {
  const contents: any = get(data, "attributes");
  const passIndex = 0;
  const activeIndex = 0;

  const backgroundStyle = {
    background:
      "linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, rgba(207, 30, 81, 0.05) 100%)"
  };

  const TimeLine = () => {
    return (
      <div className="py-24" style={backgroundStyle}>
        <div className="text-center">
          <h4 className="text-32 font-mi-sans-semi-bold">
            {get(contents, "timeline.title")}
          </h4>
          <p className="text-gray text-lg">
            {get(contents, "timeline.description")}
          </p>
        </div>
        {contents[2] &&
          size(get(contents, "timeline.timeline_steps.data")) &&
          map(
            get(contents, "timeline.timeline_steps.data"),
            (i: any, index: any) => {
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
                            {get(i, "attributes.title")}
                          </h3>
                          <p className="text-center text-gray mt-4">
                            {get(i, "attributes.description")}
                          </p>
                          <a href="#formZone">
                            <div className="w-60 bg-primary px-6 py-4 rounded-xl mt-4 text-white hover:opacity-80 mx-auto">
                              {get(i, "attributes.buttonLabel")}
                            </div>
                          </a>
                        </div>
                      </div>
                      <div className="mx-auto p-4 mt-14">
                        <div className="relative flex justify-center">
                          <div className="border-l-2 border-gray-400 absolute h-full top-0 -z-0"></div>
                          <div className="flex flex-col">
                            {/*<div*/}
                            {/*  className="w-6 h-6 rounded-full bg-gray mx-auto z-50 cursor-pointer "*/}
                            {/*  onClick={() => alert("Need a function")}*/}
                            {/*/>*/}
                            <div className="w-6 h-6 rounded-full bg-gray mx-auto z-50 mt-10" />
                          </div>
                        </div>
                      </div>
                    </>
                  ) : null}
                </div>
              );
            }
          )}
      </div>
    );
  };

  return (
    <>
      <div className="mt-20 lg:mt-48 flex flex-col gap-y-10 relative px-4 relative">
        <div className="pt-10">
          <div className="hidden lg:block absolute top-8 right-0">
            <HeaderImage />
          </div>
          <div className="flex flex-col gap-y-5 lg:gap-y-10">
            <div className="text-center">
              <Typography variant="h3" element="h3">
                {get(contents, "header.title")}
              </Typography>
              <Typography variant="p2" element="p" className="text-gray-600">
                {get(contents, "header.description")}
              </Typography>
            </div>
            <div className="container mx-auto flex-none lg:flex">
              {get(contents, "body.Card") && size(get(contents, "body.Card"))
                ? get(contents, "body.Card").map((content: any, key: any) => (
                    <div key={key} className="flex-1 text-center mt-10">
                      <div className="w-16 h-16 rounded-lg bg-primary-25 px-4 py-4 mx-auto">
                        <LivingRoom />
                      </div>
                      <Typography
                        variant="h5"
                        element="h5"
                        className="text-gray-800 px-0 lg:px-20 mt-4">
                        {get(content, "title")}
                      </Typography>
                      <Typography
                        variant="p3"
                        element="p"
                        className="text-gray mt-4 px-0 ">
                        {get(content, "description")}
                      </Typography>
                    </div>
                  ))
                : null}
            </div>
          </div>
          <div className="hidden lg:block absolute top-64 mt-40 left-0 z-10">
            <BodyHeartIcon />
          </div>
          <InviteEarnForm title={get(contents, "header.title")} />
          {/*  <TimeLine /> */}
        </div>
      </div>
      <PremiumStatic
        title={get(contents, "footer.bannerHeader.title")}
        description={get(contents, "footer.bannerBody.description")}
        buttonLabel={get(contents, "footer.bannerFooter.label")}
        image={get(contents, "footer.bannerBody.image")}
      />
      {!isEmpty(data) && <InfoSection infoContents={data} />}
    </>
  );
};

export default InviteAndEarn;
