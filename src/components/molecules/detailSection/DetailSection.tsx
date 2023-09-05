import { capitalize, get } from "lodash";

import { IDetailSection } from "@/components/molecules/detailSection/types";

import ReadMore from "@/components/atoms/readMore/ReadMore";
import Breadcrumbs from "@/components/atoms/breadcrumbs/Breadcrumbs";

import BathIcon from "../../../../public/images/bath.svg";
import SquareIcon from "../../../../public/images/square.svg";
import BedroomIcon from "../../../../public/images/bedroom.svg";

const DetailSection = ({ data, className = "" }: IDetailSection) => {
  return (
    <section className={`${className}`}>
      <header className="flex flex-col gap-y-4 lg:gap-y-1">
        <div>
          <Breadcrumbs items={get(data, "breadCrumbs")} />
        </div>
        <h6 className="text-base text-gray-600 lg:hidden">{`${capitalize(
          get(data, "item.city.name")
        )}, ${capitalize(get(data, "item.district.name"))}`}</h6>
        <h1 className="font-semibold text-gray-800 text-22 lg:text-28">
          {get(data, "item.title")}
        </h1>
      </header>
      <article>
        <div className="flex gap-x-5 my-4 text-gray-800">
          <div className="flex gap-x-2 items-center">
            <BedroomIcon className="hidden lg:block" />
            {get(data, "item.rooms_bedrooms_count")}
            <span>Bedroom</span>
          </div>
          <div className="flex gap-x-2 items-center">
            <BathIcon className="hidden lg:block" />
            {get(data, "item.rooms_bathrooms_count")}
            <span>Bathroom</span>
          </div>
          <div className="flex gap-x-2 items-center">
            <SquareIcon className="hidden lg:block" />
            {get(data, "item.space")}
            <span>m²</span>
          </div>
        </div>
      </article>
      <article>
        <ReadMore
          className="text-gray-600 text-sm lg:text-lg"
          labelClass="text-base font-semibold"
          type="text">
          {get(data, "item.summary")}
        </ReadMore>
      </article>
    </section>
  );
};

export default DetailSection;
