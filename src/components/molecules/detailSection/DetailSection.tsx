import { get } from "lodash";

import { IDetailSection } from "@/components/molecules/detailSection/types";

import ReadMore from "@/components/atoms/readMore/ReadMore";
import Breadcrumbs from "@/components/atoms/breadcrumbs/Breadcrumbs";

import BathIcon from "../../../../public/images/bath.svg";
import SquareIcon from "../../../../public/images/square.svg";
import BedroomIcon from "../../../../public/images/bedroom.svg";

const DetailSection = ({ data, className = "" }: IDetailSection) => {
  return (
    <section className={`${className}`}>
      <header className="flex flex-col gap-y-1">
        <div>
          <Breadcrumbs items={get(data, "breadCrumbs")} />
        </div>
        <h1 className="text-28">{get(data, "item.title")}</h1>
      </header>
      <article>
        <div className="flex gap-x-5 my-4">
          <div className="flex gap-x-2 items-center">
            <BedroomIcon />
            {get(data, "item.rooms_bedrooms_count")}
            <span>Bedroom</span>
          </div>
          <div className="flex gap-x-2 items-center">
            <BathIcon />
            {get(data, "item.rooms_bathrooms_count")}
            <span>Bathroom</span>
          </div>
          <div className="flex gap-x-2 items-center">
            <SquareIcon />
            {get(data, "item.space")}
            <span>m²</span>
          </div>
        </div>
      </article>
      <article>
        <ReadMore type="text">{get(data, "item.summary")}</ReadMore>
      </article>
    </section>
  );
};

export default DetailSection;
