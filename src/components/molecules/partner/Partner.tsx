import { chunk, get, map } from "lodash";

import Loading from "@/components/atoms/loading/Loading";
import Marquee from "@/components/atoms/marquee/Marquee";
import Section from "@/components/molecules/section/Section";
import PartnersSkeleton from "@/components/molecules/skeletons/partnersSkeleton/PartnersSkeleton";

const Partner = ({ partners }: any) => {
  return (
    <Loading isLoading={!partners} loader={<PartnersSkeleton />}>
      <Section
        className="px-4 lg:px-20 mt-14"
        title={get(partners, "header.title")}
        description={get(partners, "header.description")}>
        <div className="flex flex-col">
          {map(chunk(map(get(partners, "body"), "image"), 10), (item, key) => (
            <Marquee
              key={key}
              items={item}
              className="p-2"
              direction={key % 2 === 0 ? "left" : "right"}
              marqueeItemClassName="mx-2 rounded-xl relative shadow-[0px_2px_10px_0px_#00000014] p-2 flex justify-center items-center h-20 lg:h-28 w-40 lg:w-60"
              marqueeItemInnerClassName="w-28 lg:w-40 h-8 lg:h-16"
            />
          ))}
        </div>
      </Section>
    </Loading>
  );
};

export default Partner;
