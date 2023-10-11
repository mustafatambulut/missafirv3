import Image from "next/image";
import { get, map } from "lodash";
import classNames from "classnames";

import { ITabContent } from "@/components/molecules/tabContent/types";

import Card from "@/components/atoms/card/Card";
import CustomNavigation from "@/components/atoms/customNavigation/CustomNavigation";
import Slider from "@/components/molecules/slider/Slider";

const TabContent = ({
  id,
  content,
  activeTab,
  className = ""
}: ITabContent) => {
  const tabClass = classNames(`tab-content-item ${className}`, {
    block: id === activeTab,
    hidden: id !== activeTab
  });
  return (
    <div key={id} className={tabClass}>
      <Slider
        sliderIdentifier="experience-slider"
        customNavigation={<CustomNavigation />}>
        {map(get(content, "data"), ({ attributes }, key) => (
          <Card
            key={key}
            className="py-10"
            cardBodyClassName="flex flex-col items-center justify-center">
            <Image
              width={268}
              height={545}
              className="m-auto"
              src={get(attributes, "image") || "/"}
              alt="image"
            />
            <p className="mt-10 text-gray-600 text-sm lg:text-2xl line-clamp-3 text-center">
              {get(attributes, "description")}
            </p>
          </Card>
        ))}
      </Slider>
    </div>
  );
};

export default TabContent;
