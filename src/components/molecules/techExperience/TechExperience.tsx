"use client";
import React, { useState } from "react";
import { get, map } from "lodash";

import "./TechExperience.css";
import "swiper/css";
import "swiper/css/navigation";

import MissafirTech from "../../../../public/images/missafirtech.svg";

import Slider from "@/components/molecules/slider/Slider";

const TechExperience = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabData = {
    tabItems: [{ label: "Owner Panel" }, { label: "GE App" }, { label: "PMS" }],
    tabContent: [
      {
        items: [
          {
            image: "https://picsum.photos/447/559",
            description:
              "Owner Panel Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et"
          },
          {
            image: "https://picsum.photos/447/559?grayscale",
            description:
              "Owner Panel 2 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et"
          }
        ]
      },
      {
        items: [
          {
            image: "https://picsum.photos/447/559",
            description:
              "GE App Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et"
          },
          {
            image: "https://picsum.photos/447/559?grayscale",
            description:
              "GE App 2 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et"
          }
        ]
      },
      {
        items: [
          {
            image: "https://picsum.photos/447/559",
            description:
              "PMS Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et"
          },
          {
            image: "https://picsum.photos/447/559?grayscale",
            description:
              "PMS 2 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et"
          }
        ]
      }
    ]
  };
  return (
    <div className="flex flex-col items-center justify-center mt-16 px-3 lg:px-40">
      <div className="flex flex-col items-center mb-14 lg:px-20">
        <div className="flex flex-col lg:flex-row items-center text-grey-700 text-[28px] lg:text-4xl mb-5">
          <span>Streamlined</span> <MissafirTech className="my-3 lg:my-0" />{" "}
          <span>Experience</span>
        </div>
        <p className="text-grey-600 mt-2 text-lg lg:text-2xl line-clamp-4 text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et
        </p>
      </div>
      <div className="tab-container w-full">
        <div className="tabs w-full flex">
          {map(get(tabData, "tabItems"), (item, key) => (
            <a
              key={key}
              className={`tab tab-bordered flex-1 text-grey-600 text-sm lg:text-2xl h-auto pb-1 lg:pb-2 border-b-grey-100 border-b-4 px-0 ${
                key === activeTab &&
                "tab-active !text-grey-800 border-b-grey-100"
              }`}
              onClick={() => setActiveTab(key)}>
              <span>{item.label}</span>
            </a>
          ))}
        </div>
        <div className="tab-content px-6">
          {map(
            get(tabData, "tabContent"),
            (tabContentItem, key) =>
              key === activeTab && (
                <div
                  key={key}
                  className={`tab-content-item ${
                    key === activeTab ? "block" : "hidden"
                  }`}>
                  <Slider slides={get(tabContentItem, "items")} />
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default TechExperience;
