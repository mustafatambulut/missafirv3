export interface ICheckbox {
  isChecked: boolean;
  handleChange: () => void;
  data: { title: string; value: string | number | boolean };
}
