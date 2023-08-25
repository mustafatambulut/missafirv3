import BasePhoneInput from "react-phone-input-2";

import { IPhoneInput } from "@/components/atoms/phoneInput/types";

import "./PhoneInput.css";
import "react-phone-input-2/lib/style.css";

const PhoneInput = ({
  name,
  value,
  label,
  country,
  onChange,
  labelClass = "",
  buttonClass = "",
  isDisable = false,
  className = "",
  inputClass = "",
  placeholder = "",
  dropdownClass = "",
  containerClass = ""
}: IPhoneInput) => {
  return (
    <div className={`form-control flex justify-between w-full ${className}`}>
      <label className={`label ${labelClass}`} htmlFor={name}>
        {label}
      </label>
      <BasePhoneInput
        name={name}
        value={value}
        label={label}
        country={country}
        onChange={onChange}
        isDisable={isDisable}
        placeholder={placeholder}
        dropdownClass={`z-50 ${dropdownClass}`}
        containerClass={containerClass}
        inputClass={`rounded-lg ${inputClass}`}
        buttonClass={`rounded-l-lg border-gray-200 ${buttonClass}`}
        alwaysDefaultMask={true}
        defaultMask={"(...) ... .. .."}
      />
    </div>
  );
};

export default PhoneInput;
