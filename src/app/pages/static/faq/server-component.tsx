import { ReactNode } from "react";
import get from "lodash/get";
import map from "lodash/map";
import words from "lodash/words";
import slice from "lodash/slice";
import flatten from "lodash/flatten";
import capitalize from "lodash/capitalize";

// import HeaderImage from "@/public/images/contact_header.svg";

export default function ServerComponent({ data }: { header: ReactNode }) {
  data = data?.attributes;
  const accordions = map(get(data, "body"), "accordions.data");
  return (
    <>
      <div className="hidden lg:block absolute top-8 right-0">
        {/* <HeaderImage /> */}
      </div>
      <div className="text-center">
        <h1 className="text-primary font-mi-sans-semi-bold text-42">
          {capitalize(words(data?.header?.title)[0])}
          <span className="text-gray-800">
            {capitalize(words(data?.header?.title)[1])}
          </span>
          <span className="text-gray-800">
            {capitalize(words(data?.header?.title)[2])}
          </span>
        </h1>
        <p className="text-gray-600 pt-4 text-21 mx-4">
          {slice(words(data?.header?.description), 0, 13)?.join(" ")}
          <br className="hidden lg:block" />
          <span>{slice(words(data?.header?.description), 13)?.join(" ")}</span>
        </p>
      </div>
      <div className="hidden">
        {map(flatten(accordions), ({ attributes }, key) => {
          return (
            <div key={key}>
              <h1>{get(attributes, "title")}</h1>
              <p>{get(attributes, "description")}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
