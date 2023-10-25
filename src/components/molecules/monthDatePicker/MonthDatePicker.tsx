import classNames from "classnames";
import moment from "moment/moment";

import { IMonthDatePicker } from "@/components/molecules/monthDatePicker/types";

const MonthDatePicker = ({ param, montHeaderPosition }: IMonthDatePicker) => {
  const className = classNames("flex flex-col", {
    "items-start": montHeaderPosition === "start",
    "items-center": montHeaderPosition === "center",
    "items-end": montHeaderPosition === "end"
  });

  const dayNames = new Array(7).fill(null).map((data, key) => (
    <li key={key}>
      <small>{moment().weekday(key).format("dd")}</small>
    </li>
  ));

  return (
    <div className={className}>
      <div className="px-4 font-mi-sans-semi-bold">
        {param?.month?.format("MMMM")} {param?.month?.format("YYYY")}
      </div>
      <ul className="w-full flex justify-between px-4">{dayNames}</ul>
    </div>
  );
};

export default MonthDatePicker;
