import { get, map, size } from "lodash";
import ReactMarkdown from "react-markdown";

import Loading from "@/components/atoms/loading/Loading";
import Typography from "@/components/atoms/typography/Typography";
import Section from "@/components/molecules/section/Section";
import InfoSkeleton from "@/components/molecules/skeletons/infoSkeleton/InfoSekeleton";

import "./index.css";

const InfoSection = ({ info }: any) => {
  return (
    <Loading isLoading={!info} loader={<InfoSkeleton />}>
      <Section className="px-2 lg:px-10 my-14 lg:mt-14 flex flex-col gap-y-3">
        {!!get(info, "infoContents") &&
          size(get(info, "infoContents")) &&
          map(get(info, "infoContents"), (item, index) => {
            return (
              <div
                key={index}
                tabIndex={0}
                className="collapse collapse-plus rounded-xl">
                <input type="checkbox" />
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
