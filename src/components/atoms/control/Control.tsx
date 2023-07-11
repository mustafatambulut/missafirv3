import { get } from "lodash";
import { components, ControlProps } from "react-select";

const Control = ({ ...props }: ControlProps) => {
  return (
    <components.Control
      className={`${get(props, "selectProps.controlClassName")}`}
      {...props}>
      <div className="flex">{get(props, "children")}</div>
    </components.Control>
  );
};

export default Control;
