import { get } from "lodash";
import classNames from "classnames";
import { components } from "react-select";

import { IOption } from "@/components/atoms/option/types";

import OptionImage from "@/components/atoms/optionImage/OptionImage";

const Option = ({ ...props }: IOption) => {
  const optionClass = classNames(
    `${get(props, "selectProps.optionClassName")}`,
    {
      "bg-gray-150 text-black": get(props, "isSelected")
    }
  );

  return (
    <components.Option className={optionClass} {...props}>
      <div className="flex gap-x-2 items-center justify-center">
        <OptionImage
          image={get(props, "data.attributes.image")}
          className="w-6 p-0 m-0"
        />
        <span className="text-sm lg:text-lg py-2 uppercase font-mi-semi-bold">
          {get(props, "data.attributes.label")}
        </span>
      </div>
    </components.Option>
  );
};

export default Option;
