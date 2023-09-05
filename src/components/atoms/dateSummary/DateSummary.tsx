import { IDateSummary } from "@/components/atoms/dateSummary/types";

import PencilIcon from "../../../../public/images/pencil.svg";
import ArrowIcon from "../../../../public/images/tiny_arrow.svg";

const DateSummary = ({ startDate, endDate, className = "" }: IDateSummary) => {
  return (
    <div
      className={`flex items-center justify-between text-lg text-gray-600 bg-gray-100 p-2 rounded-3xl mt-4 ${className}`}>
      <div className="flex items-center gap-x-4 ml-10">
        {startDate}
        <ArrowIcon />
        {endDate}
        <span>1 Guest</span>
      </div>
      <div className="flex justify-end">
        <PencilIcon />
      </div>
    </div>
  );
};

export default DateSummary;
