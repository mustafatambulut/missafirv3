export interface ICheckbox {
  label?: string;
  className?: string;
  labelClass?: string;
  checked?: boolean;
  isDisable?: boolean;
  onChange?: void;
  position?: "right" | "left";
}
