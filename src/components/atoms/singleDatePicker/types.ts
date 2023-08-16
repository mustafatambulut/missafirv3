export interface ISingleDatePicker {
  labelClass?: string;
  className?: string;
  label?: string;
  datePickerClass?: string;
  selected: string | boolean | number;
  onChange: void;
}
