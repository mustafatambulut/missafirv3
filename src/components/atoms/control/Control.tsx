import classNames from "classnames";
import { get, has, size } from "lodash";
import { components, ControlProps } from "react-select";

const Control = ({ ...props }: ControlProps) => {
  const checkIsCustomColor = (which: string) => {
    if (size(props.getValue()) > 0) {
      const selectedValue = get(props.getValue()[0], "attributes");
      if (has(selectedValue, "type")) {
        return selectedValue.type === "filter" && selectedValue.value === which;
      }
    }
  };
  const controlClass = classNames(
    `${get(props, "selectProps.controlClassName")}`,
    {
      "border-gray-600": checkIsCustomColor("all"),
      "border-yellow-light": checkIsCustomColor("pending"),
      "border-red-light": checkIsCustomColor("cancelled"),
      "border-green-light": checkIsCustomColor("confirmed")
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
