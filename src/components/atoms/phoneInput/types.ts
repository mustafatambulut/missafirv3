export interface IPhoneInput {
  value: string | number;
  placeholder?: string;
  name: string;
  label?: string;
  country: string | number;
  onChange: void;
  isDisable?: boolean;
  className?: string;
  buttonClass?: string;
  labelClass?: string;
  inputClass?: string;
  dropdownClass?: string;
  containerClass?: string;
}
