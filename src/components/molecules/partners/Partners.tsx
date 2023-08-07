"use client";
import { useEffect, useState } from "react";
import { filter, first, get, map } from "lodash";

import { BODY, HOME } from "@/app/constants";
import { getPageDataByComponent, groupArrayBySize } from "@/utils/helper";

import Marquee from "@/components/atoms/marquee/Marquee";
import Section from "@/components/molecules/section/Section";

const Partners = () => {
  const [partners, setPartners] = useState(null);

  const fetchData = async () => {
    const response = await getPageDataByComponent(HOME, BODY);
    const partners = first(
      filter(response, (item) => item["__component"] === "sections.partners")
    );
    setPartners({
      header: partners.header,
      body: groupArrayBySize(partners.body, 10)
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {partners && (
        <Section
          className="px-4 lg:px-20 mt-14"
          title={get(partners, "header.title")}
          description={get(partners, "header.description")}>
          <div className="flex flex-col">
            {map(get(partners, "body"), (item, index) => {
              return (
                <Marquee
                  items={item}
                  marqueeItemClassName="mx-2 rounded-xl shadow-base-blur-10 relative p-1 h-20 lg:h-28 w-40 lg:w-60 flex justify-center items-center"
                  key={index}
                  className="p-2"
                  direction={index % 2 === 0 ? "left" : "right"}
                />
              );
            })}
          </div>
        </Section>
      )}
    </>
  );
};

export default Partners;
