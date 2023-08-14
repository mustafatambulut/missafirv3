"use client";
import { useEffect, useState } from "react";
import { chunk, get, map } from "lodash";

import useFetchData from "@/app/hooks/useFetchData";
import { IPartner } from "@/components/molecules/partner/types";
import { BODY } from "@/app/constants";
import { PARTNER_SECTION } from "@/components/molecules/partner/constants";

import Loading from "@/components/atoms/loading/Loading";
import Marquee from "@/components/atoms/marquee/Marquee";
import Section from "@/components/molecules/section/Section";

const Partner = () => {
  const [partners, setPartners] = useState(null);
  const result = useFetchData<IPartner>(BODY, PARTNER_SECTION);

  useEffect(() => {
    if (!result) return;

    setPartners({
      header: get(result, "header"),
      body: chunk(map(get(result, "body"), "image"), 10)
    });
  }, [result]);

  return (
    <Loading isLoading={!partners} loader={<p>Loading feed...</p>}>
      {/*todo: skeleton eklenecek*/}
      <Section
        className="px-4 lg:px-20 mt-14"
        title={get(partners, "header.title")}
        description={get(partners, "header.description")}>
        <div className="flex flex-col">
          {map(get(partners, "body"), (item, key) => (
            <Marquee
              key={key}
              items={item}
              className="p-2"
              direction={key % 2 === 0 ? "left" : "right"}
              marqueeItemClassName="mx-2 rounded-xl shadow-[0px_2px_10px_0px_#00000014] relative p-1 h-20 lg:h-28 w-40 lg:w-60 flex justify-center items-center"
            />
          ))}
        </div>
      </Section>
    </Loading>
  );
};

export default Partner;
