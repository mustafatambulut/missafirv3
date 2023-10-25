import BasePhoneInput from "react-phone-input-2";

import { IPhoneInput } from "@/components/atoms/phoneInput/types";

import "./PhoneInput.css";
import "react-phone-input-2/lib/style.css";
import classNames from "classnames";

const PhoneInput = ({
  id,
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
  const buttonClassName = classNames(
    `border-gray-200 bg-white rounded-lg hover:rounded-lg cursor-pointer px-2 relative h-full ${buttonClass}`
  );

  const inputClassName = classNames(
    `flex border-gray-200 h-12 text-gray-800 rounded-lg pl-3 flex-1 ${inputClass}`
  );

  const baseClassName = classNames(
    `flex flex-row-reverse justify-between gap-x-2 text-sm border border-none pl-0 p-0 rounded-lg h-12 input focus:outline-0 w-full text-gray-800 ${containerClass}`
  );

  const dropdownClassName = classNames(`rounded-lg ${dropdownClass}`);

  return (
    <div className={`form-control flex justify-between w-full ${className}`}>
      <label className={`label ${labelClass}`} htmlFor={name}>
        {label}
      </label>
      <BasePhoneInput
        id={id}
        name={name}
        country={country}
        value={value}
        label={label}
        onChange={onChange}
        isDisable={isDisable}
        placeholder={placeholder}
        dropdownClass={dropdownClassName}
        containerClass={containerClass}
        inputClass={inputClassName}
        buttonClass={buttonClassName}
        className={baseClassName}
        countryCodeEditable={false}
        autoFormat={true}
      />
    </div>
  );
};

export default PhoneInput;
