import { get } from "lodash";
import classNames from "classnames";
import { checkIsCustomColor } from "@/utils/helper";
import { components, ControlProps } from "react-select";

const Control = ({ ...props }: ControlProps) => {
  const controlClass = classNames(
    `${get(props, "selectProps.controlClassName")}`,
    {
      "border-gray-600": checkIsCustomColor(props, "all"),
      "border-yellow-light": checkIsCustomColor(props, "pending"),
      "border-red-light": checkIsCustomColor(props, "cancelled"),
      "border-green-light": checkIsCustomColor(props, "confirmed")
    }
  );
  return (
    <components.Control className={controlClass} {...props}>
      <div className={`${get(props, "selectProps.controlInnerClassName")}`}>
        {get(props, "children")}
      </div>
    </components.Control>
  );
};

export default Control;
