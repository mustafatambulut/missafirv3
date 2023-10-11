import { capitalize, get } from "lodash";

import { IDetailSection } from "@/components/molecules/detailSection/types";
import { useTranslations } from "next-intl";

import ReadMore from "@/components/atoms/readMore/ReadMore";
import Breadcrumbs from "@/components/atoms/breadcrumbs/Breadcrumbs";

import BathIcon from "../../../../public/images/bath.svg";
import SquareIcon from "../../../../public/images/square.svg";
import BedroomIcon from "../../../../public/images/bedroom.svg";
import Typography from "@/components/atoms/typography/Typography";

const DetailSection = ({ data, className = "" }: IDetailSection) => {
  const t = useTranslations()
  return (
    <section className={`${className}`}>
      <header className="flex flex-col gap-y-4 lg:gap-y-1">
        <div>
          <Breadcrumbs items={get(data, "breadCrumbs")} />
        </div>
        <h6 className="text-base text-gray-600 lg:hidden">{`${capitalize(
          get(data, "item.city.name")
        )}, ${capitalize(get(data, "item.district.name"))}`}</h6>
        <Typography variant="h3" element="h1" className="text-gray-800">
          {get(data, "item.title")}
        </Typography>
      </header>
      <article>
        <div className="flex gap-x-5 my-4 text-gray-800">
          <div className="flex gap-x-2 items-center">
            <BedroomIcon className="hidden lg:block" />
            {get(data, "item.rooms_bedrooms_count")}
            <Typography variant="p4" element="span">{t("bedroom")}</Typography>
          </div>
          <div className="flex gap-x-2 items-center">
            <BathIcon className="hidden lg:block" />
            {get(data, "item.rooms_bathrooms_count")}
            <Typography variant="p4" element="span">{t("bathroom")}</Typography>
          </div>
          <div className="flex gap-x-2 items-center">
            <SquareIcon className="hidden lg:block" />
            {get(data, "item.space")}
            <Typography variant="p4" element="span">m²</Typography>
          </div>
        </div>
      </article>
      <article>
        <ReadMore
          className="text-gray-600 text-sm lg:text-lg"
          labelClass="text-base font-semibold"
          showAsHtml={true}
          type="text">
          {get(data, "item.summary")}
        </ReadMore>
      </article>
    </section>
  );
};

export default DetailSection;
