"use client";
import { get, isEmpty } from "lodash";

import { IInfoSectionData } from "@/components/molecules/infoSection/types";
import ReactMarkdown from "react-markdown";

import Section from "@/components/molecules/section/Section";
import Loading from "@/components/atoms/loading/Loading";
import InfoSkeleton from "@/components/molecules/skeletons/infoSkeleton/InfoSekeleton";
import Typography from "@/components/atoms/typography/Typography";
import useFetchData from "@/app/hooks/useFetchData";
import { BODY } from "@/app/constants";
import { INFO_SECTION } from "../infoSection/constants";

import "./index.css";

const InfoSection = ({ infoContents }: any) => {
  let info: any;
  isEmpty(infoContents)
    ? (info = useFetchData<IInfoSectionData>(BODY, INFO_SECTION) || [])
    : (info = infoContents);
  const InfoLoading = () => {
    return (
      <Section className="px-4 my-14 lg:mt-14 flex flex-col gap-y-3">
        <InfoSkeleton />
        <InfoSkeleton />
        <InfoSkeleton />
        <InfoSkeleton />
        <InfoSkeleton />
      </Section>
    );
  };
  return (
    <Loading isLoading={!info} loader={<InfoLoading />}>
      <Section className="px-2 lg:px-10 my-14 lg:mt-14 flex flex-col gap-y-3">
        {info?.infoContents &&
          info?.infoContents.length &&
          info?.infoContents.map((item, index) => {
            return (
              <div
                key={index}
                tabIndex={0}
                className="collapse collapse-plus rounded-xl">
                <div className="collapse-title bg-primary-25 text-primary cursor-pointer">
                  <Typography element="h5" variant="h5">
                    {get(item, "title")}
                  </Typography>
                </div>
                <div className="collapse-content bg-gray-50 min-h-[5.3rem] visible text-sm lg:text-lg text-gray-800">
                  <Typography
                    element="div"
                    variant="p3"
                    className="text-gray-800">
                    <ReactMarkdown className="notw">
                      {get(item, "description")}
                    </ReactMarkdown>
                  </Typography>
                </div>
              </div>
            );
          })}
      </Section>
    </Loading>
  );
};

export default InfoSection;
