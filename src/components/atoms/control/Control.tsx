import { get } from "lodash";
import { components } from "react-select";

const Control = ({ ...props }) => {
  return (
    <components.Control
      className={`${get(props, "selectProps.controlClassName")}`}
      {...props}>
      <div className="flex">{get(props, "children")}</div>
    </components.Control>
  );
};

export default Control;
