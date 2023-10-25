import { get, map } from "lodash";
import { getTranslator } from "next-intl/server";

import { ISeoContent } from "@/components/molecules/listingDetail/seoContent/types";

const SeoContent = async ({ lang, header, content }: ISeoContent) => {
  const t = await getTranslator(lang);

  return (
    <div className="hidden">
      <h3>{get(header, "title")}</h3>
      <p>{get(header, "description")}</p>
      {map(
        get(content, "data.data.items"),
        (
          {
            title,
            slug,
            pictures,
            city,
            space,
            price,
            district,
            rooms_bedrooms_count,
            rooms_bathrooms_count
          },
          key
        ) => (
          <div key={key}>
            <h1>{title}</h1>
            <p>{slug}</p>
            <p>{`${(get(city, "name"), get(district, "name"))}`}</p>
            <p>{`${rooms_bedrooms_count} ${t("beds")}`}</p>
            <p>{`${rooms_bathrooms_count} ${t("bathrooms")}`}</p>
            <p>{`${space} ${t("m2")}`}</p>
            <p>{`${get(price, "average_daily_price")} ${t("nightly")}`}</p>
            <p> {`${get(price, "final")} ${t("total")}`}</p>
            <img
              src={get(pictures, "[0].path")}
              alt={get(pictures, "[0].caption") || "image"}
            />
          </div>
        )
      )}
    </div>
  );
};

export default SeoContent;
