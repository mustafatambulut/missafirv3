"use client";
import React, { useEffect, useState } from "react";
import { filter, first, get, map } from "lodash";

import "./TechExperience.css";
import "swiper/css";
import "swiper/css/navigation";

import Slider from "@/components/molecules/slider/Slider";
import Section from "@/components/molecules/section/Section";
import { getPageDataByComponent } from "@/utils/helper";
import { BODY, HOME } from "@/app/constants";
import Card from "@/components/atoms/card/Card";
import Image from "next/image";
import PreviousIcon from "../../../../public/images/arrow_left.svg";
import NextIcon from "../../../../public/images/arrow_right.svg";

const CustomNavigation = () => {
  return (
    <>
      <div className="experience-slider swiper-button-prev rounded-full shadow w-[60px] h-[60px] after:hidden hidden lg:flex">
        <PreviousIcon className="fill-blue-700" />
      </div>
      <div className="experience-slider swiper-button-next rounded-full shadow w-[60px] h-[60px] after:hidden hidden lg:flex">
        <NextIcon className="fill-blue-700" />
      </div>
    </>
  );
};

const TechExperience = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [techExperience, setTechExperience] = useState(null);

  const fetchData = async () => {
    const response = await getPageDataByComponent(HOME, BODY);
    const techExperienceData = first(
      filter(
        response,
        (item) => item["__component"] === "sections.tech-experience"
      )
    );
    setTechExperience(techExperienceData);
  };

  useEffect(() => {
    fetchData();
  }, []);
  const tabData = {
    tabItems: [{ label: "Owner Panel" }, { label: "GE App" }, { label: "PMS" }],
    tabContent: [
      {
        items: [
          {
            image: "https://i.ibb.co/1MrZ78J/Group-114.png",
            description:
              "Owner Panel Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et"
          },
          {
            image: "https://i.ibb.co/1MrZ78J/Group-114.png",
            description:
              "Owner Panel 2 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et"
          }
        ]
      },
      {
        items: [
          {
            image: "https://i.ibb.co/1MrZ78J/Group-114.png",
            description:
              "GE App Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et"
          },
          {
            image: "https://i.ibb.co/1MrZ78J/Group-114.png",
            description:
              "GE App 2 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et"
          }
        ]
      },
      {
        items: [
          {
            image: "https://i.ibb.co/1MrZ78J/Group-114.png",
            description:
              "PMS Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et"
          },
          {
            image: "https://i.ibb.co/1MrZ78J/Group-114.png",
            description:
              "PMS 2 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et"
          }
        ]
      }
    ]
  };
  return (
    <>
      {techExperience && (
        <Section
          className="px-4 lg:px-8 mt-14"
          title={get(techExperience, "header.title")}
          description={get(techExperience, "header.description")}>
          <div className="tab-container w-full">
            <div className="tabs w-full flex">
              {map(get(tabData, "tabItems"), (item, key) => (
                <a
                  key={key}
                  className={`tab tab-bordered flex-1 text-grey-600 text-base lg:text-2xl h-auto pb-1 lg:pb-2 border-b-grey-100 border-b-4 px-0 ${
                    key === activeTab &&
                    "tab-active !text-grey-800 border-b-grey-100"
                  }`}
                  onClick={() => setActiveTab(key)}>
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
            <div className="tab-content lg:px-6">
              {map(
                get(tabData, "tabContent"),
                (tabContentItem, key) =>
                  key === activeTab && (
                    <div
                      key={key}
                      className={`tab-content-item ${
                        key === activeTab ? "block" : "hidden"
                      }`}>
                      <Slider
                        sliderIdentifier="experience-slider"
                        customNavigation={<CustomNavigation />}>
                        {map(get(tabContentItem, "items"), (item, key) => (
                          <Card
                            key={key}
                            className="py-10"
                            cardBodyClassName="flex flex-col items-center justify-center">
                            <Image
                              className="m-auto"
                              src={get(item, "image") || ""}
                              alt="image"
                              width={268}
                              height={545}
                            />
                            <p className="mt-10 text-gray-600 text-sm lg:text-2xl line-clamp-3 text-center">
                              {get(item, "description")}
                            </p>
                          </Card>
                        ))}
                      </Slider>
                    </div>
                  )
              )}
            </div>
          </div>
        </Section>
      )}
    </>
  );
};

export default TechExperience;
