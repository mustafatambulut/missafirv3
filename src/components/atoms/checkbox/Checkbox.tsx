import { useEffect, useRef } from "react";
import { get } from "lodash";

import { ICheckbox } from "@/components/atoms/checkbox/types";

const Checkbox = ({
  label,
  checked,
  onChange,
  position,
  isDisable,
  className = "",
  labelClass = ""
}: ICheckbox) => {
  const leftRef = useRef<HTMLInputElement>(null);
  const rightRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!get(leftRef, "current") && !get(rightRef, "current")) return;
    position === "right"
      ? (leftRef.current.innerText = "")
      : (rightRef.current.innerText = "");
  }, [leftRef, rightRef]);

  return (
    <div className={`form-control w-fit font-mi-sans ${className}`}>
      <label
        className={`label-text label cursor-pointer gap-x-2 items-center ${labelClass}`}>
        <span ref={leftRef}>{label}</span>
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={isDisable}
          className={`checkbox ${className}`}
        />
        <span ref={rightRef}>{label}</span>
      </label>
    </div>
  );
};

export default Checkbox;
