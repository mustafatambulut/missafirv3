import classNames from "classnames";
import { get, isEmpty } from "lodash";
import { useRouter } from "next/navigation";
import { components, OptionProps } from "react-select";

import OptionImage from "@/components/atoms/optionImage/OptionImage";

const Option = ({ ...props }: OptionProps) => {
  const router = useRouter();

  const handleInnerProps = () => {
    if (get(props, "selectProps.type") !== "language") return;
    return {
      onClick: () => router.push(`/${get(props, "data.attributes.value")}`)
    };
  };

  const optionClass = classNames(
    `${get(
      props,
      "selectProps.optionClassName"
    )} flex items-center gap-x-3 lg:gap-x-2 px-2 lg:px-3`,
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
    <components.Option
      className={optionClass}
      {...props}
      innerProps={handleInnerProps()}>
      {!isEmpty(get(props, "data.attributes.image")) && (
        <OptionImage
          src={get(props, "data.attributes.image")}
          className={get(props, "selectProps.optionImageWrapperClassName")}
          imageClassName={get(props, "selectProps.optionImageClassName")}
          width={get(props, "selectProps.width") || 40}
          height={get(props, "selectProps.height") || 40}
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
