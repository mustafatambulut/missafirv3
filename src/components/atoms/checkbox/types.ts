export interface ICheckbox {
  label?: string;
  value?: string | number;
  name?: string;
  className?: string;
  labelClass?: string;
  checked?: boolean;
  isDisable?: boolean;
  onChange?: void;
  position?: "right" | "left";
}
