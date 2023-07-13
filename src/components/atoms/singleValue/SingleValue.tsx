import { get } from "lodash";
import Image from "next/image";
import { components } from "react-select";

import { ISingleValue } from "@/components/atoms/singleValue/types";

const SingleValue = ({ ...props }: ISingleValue) => {
  return (
    <components.SingleValue {...props}>
      <div
        className={`${
          get(props, "selectProps.singleValueClassName") || "gap-3"
        }`}>
        {get(props, "selectProps.imageShow") && (
          <div className="avatar">
            <div
              className={`${
                get(props, "selectProps.imageWidthClassName") || "w-8 lg:w-10"
              } rounded-full`}>
              <Image
                src={get(props, "data.attributes.image")}
                width={24}
                height={24}
                alt="select"
              />
            </div>
          </div>
        )}
        <div className="grid grid-cols-1">
          <span className={`text-xs capitalize `}>
            {get(props, "selectProps.selectTitle")}
          </span>
          <span
            className={`${get(
              props,
              "selectProps.singleValueChildrenClassName"
            )}`}>
            {get(props, "data.attributes.label")}
          </span>
        </div>
      </div>
    </components.SingleValue>
  );
};

export default SingleValue;
