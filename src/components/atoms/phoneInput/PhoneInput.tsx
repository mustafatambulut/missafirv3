import BasePhoneInput from "react-phone-input-2";

import { IPhoneInput } from "@/components/atoms/phoneInput/types";

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
        inputClass={inputClass}
        placeholder={placeholder}
        dropdownClass={dropdownClass}
        containerClass={containerClass}
        buttonClass={buttonClass}
        alwaysDefaultMask={true}
        defaultMask={"(...) ... .. .."}
      />
    </div>
  );
};

export default PhoneInput;
