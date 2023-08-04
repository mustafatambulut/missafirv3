import classNames from "classnames";
import { get, isEmpty } from "lodash";
import { components, OptionProps } from "react-select";

import OptionImage from "@/components/atoms/optionImage/OptionImage";

const Option = ({ ...props }: OptionProps) => {
  const optionClass = classNames(
    `${get(props, "selectProps.optionClassName")}`,
    {
      [`${get(props, "selectProps.optionSelectedClassName")}`]: get(
        props,
        "isSelected"
      ),
      "text-gray-600":
        get(props, "data.attributes.value") === "all" &&
        get(props, "data.attributes.type") === "filter",
      "text-warning":
        get(props, "data.attributes.value") === "pending" &&
        get(props, "data.attributes.type") === "filter",
      "text-error":
        get(props, "data.attributes.value") === "cancelled" &&
        get(props, "data.attributes.type") === "filter",
      "text-success":
        get(props, "data.attributes.value") === "confirmed" &&
        get(props, "data.attributes.type") === "filter"
    }
  );
  return (
    <components.Option className={optionClass} {...props}>
      {!isEmpty(get(props, "data.attributes.image")) && (
        <OptionImage
          image={get(props, "data.attributes.image")}
          className={get(props, "selectProps.optionImageWrapperClassName")}
          imageClassName={get(props, "selectProps.optionImageClassName")}
          imageWidth={get(props, "selectProps.optionImageWidth") || 0}
          imageHeight={get(props, "selectProps.optionImageHeight") || 0}
        />
      )}
      {!isEmpty(get(props, "data.attributes.icon")) && (
        <div>{get(props, "data.attributes.icon")}</div>
      )}
      <span className={get(props, "selectProps.optionLabelClassName")}>
        {get(props, "data.attributes.label")}
      </span>
    </components.Option>
  );
};

export default Option;
