import { get, map } from "lodash";
import { getTranslator } from "next-intl/server";

import { IListingSeoContent } from "@/components/molecules/listingSeoContent/types";

const ListingSeoContent = async ({ lang, content }: IListingSeoContent) => {
  const t = await getTranslator(lang);

  return (
    <div className="hidden">
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

export default ListingSeoContent;
