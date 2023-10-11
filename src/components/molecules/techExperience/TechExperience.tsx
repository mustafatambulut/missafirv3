"use client";
import { useEffect, useState } from "react";
import { get, map, pick } from "lodash";

import { BODY } from "@/app/constants";
import { TECH_EXPERIENCE_SECTION } from "@/components/molecules/techExperience/constants";
import useFetchData from "@/app/hooks/useFetchData";
import { ITechExperience } from "@/components/molecules/techExperience/types";

import "swiper/css";
import "./TechExperience.css";
import "swiper/css/navigation";

import Loading from "@/components/atoms/loading/Loading";
import TabTitle from "@/components/atoms/tabTitle/TabTitle";
import Section from "@/components/molecules/section/Section";
import TabContent from "@/components/molecules/tabContent/TabContent";
import TechExperienceSkeleton from "@/components/molecules/skeletons/techExperienceSkeleton/TechExperienceSkeleton";

const TechExperience = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [tabContents, setTabContents] = useState(null);
  const [tabTitles, setTabTitles] = useState(null);

  const techExperience = useFetchData<ITechExperience>(
    BODY,
    TECH_EXPERIENCE_SECTION
  );

  useEffect(() => {
    if (!techExperience) return;

    const contents = map(get(techExperience, "body"));
    setTabContents(map(contents, (content) => pick(content, ["sliders"])));
    setTabTitles(map(contents, (content) => pick(content, ["title"])));
  }, [techExperience]);

  return (
    <Loading isLoading={!techExperience} loader={<TechExperienceSkeleton />}>
      <Section
        className="px-2 lg:px-8 mt-14"
        title={get(techExperience, "header.title")}
        description={get(techExperience, "header.description")}>
        <div className="tab-container w-full">
          <div className="tabs w-full flex">
            {map(tabTitles, ({ title }, key) => (
              <TabTitle
                key={key}
                id={key}
                title={title}
                activeTab={activeTab}
                onClick={() => setActiveTab(key)}
                className="line-clamp-1"
              />
            ))}
          </div>
          <div className="tab-content lg:px-6">
            {map(tabContents, ({ sliders }, key) => {
              if (key === activeTab) {
                return (
                  <TabContent
                    key={key}
                    id={key}
                    content={sliders}
                    activeTab={activeTab}
                  />
                );
              }
            })}
          </div>
        </div>
      </Section>
    </Loading>
  );
};
export default TechExperience;
