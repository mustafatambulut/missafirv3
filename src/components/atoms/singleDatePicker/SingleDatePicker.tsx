import ReactDatePicker from "react-datepicker";

import { ISingleDatePicker } from "@/components/atoms/singleDatePicker/types";

import "react-phone-input-2/lib/style.css";
import "react-datepicker/dist/react-datepicker.css";

const SingleDatePicker = ({
  label,
  selected,
  onChange,
  labelClass = "",
  className = "",
  datePickerClass = ""
}: ISingleDatePicker) => {
  return (
    <div className={`form-control flex  w-full ${className}`}>
      <label className={`label ${labelClass}`}>{label}</label>
      <ReactDatePicker
        className={`border rounded-lg focus:outline-0 p-3 m-0 w-full ${datePickerClass}`}
        selected={selected}
        onChange={onChange}
      />
    </div>
  );
};

export default SingleDatePicker;
