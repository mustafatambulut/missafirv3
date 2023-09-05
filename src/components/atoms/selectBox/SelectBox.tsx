import { get } from "lodash";
import { ISelectBox } from "@/components/atoms/selectBox/types";

const SelectBox = ({
  id,
  name,
  value,
  options,
  onChange,
  className = ""
}: ISelectBox) => {
  return (
    <select
      id={id}
      onChange={onChange}
      name={name}
      value={value}
      className={`select outline-none border border-gray-200 ${className}`}>
      {options &&
        options?.map((option, key) => (
          <option
            key={key}
            className="text-color-black"
            value={get(option, "value")}>
            {get(option, "name")}
          </option>
        ))}
    </select>
  );
};

export default SelectBox;
