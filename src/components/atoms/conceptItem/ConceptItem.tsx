"use client";
import { get } from "lodash";

//import CloseIcon from "../../../../public/images/close.svg";
import BuildingIcon from "../../../../public/images/building.svg";
import classNames from "classnames";
import { IConceptItem } from "@/components/atoms/conceptItem/types";

const ConceptItem = ({
  data,
  //concepts,
  //handleFilter,
  isInAllFilters
}: //checkIsIncludes,
//isDeleteButtonsVisible
IConceptItem) => {
  //const itemClass = (value: string) => {
  const itemClass = () => {
    return classNames(
      "border px-3 py-2 text-gray-700 font-mi-sans-semi-bold text-sm rounded-20 cursor-pointer flex items-center gap-2",
      {
        "bg-gray-50 py-8 border-none rounded-xl flex-col items-center justify-center":
          isInAllFilters
        // "bg-primary-100 text-primary border-primary": checkIsIncludes(
        //   concepts,
        //   value
        // )
      }
    );
  };

  //const iconClass = (value: string) => {
  const iconClass = () => {
    return classNames({
      // "fill-primary": checkIsIncludes(concepts, value)
    });
  };
  return (
    <div
      // onClick={() => handleFilter(data)}
      className={itemClass(get(data, "value"))}>
      <BuildingIcon className={iconClass(get(data, "value"))} />
      <span>{get(data, "title")}</span>
      {/*{isDeleteButtonsVisible &&*/}
      {/*  checkIsIncludes(concepts, get(data, "value")) && (*/}
      {/*    <CloseIcon className="fill-primary ml-2 scale-50" />*/}
      {/*  )}*/}
    </div>
  );
};

export default ConceptItem;
