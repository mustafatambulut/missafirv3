import { get } from "lodash";
import moment from "moment/moment";

import { IDateDrawer } from "@/components/atoms/dateDrawer/types";

import CalendarIcon from "../../../../public/images/calendar.svg";

const DateDrawer = ({
  onClick,
  booking,
  className = "",
  isInCustomSection = false
}: IDateDrawer) => {
  const hasDate = get(booking, "startDate") || get(booking, "endDate");

  const ShowDateComponent = () => {
    return (
      hasDate && (
        <div
          className={`font-mi-sans-semi-bold ${
            isInCustomSection ? "text-sm" : "text-lg"
          }`}>
          <div className="flex text-gray-700">
            <span className="whitespace-nowrap">
              {moment(get(booking, "startDate")).format("DD MMM")}
            </span>
            <span className="mx-1">-</span>
            <span className="whitespace-nowrap">
              {moment(get(booking, "endDate")).format("DD MMM")}
            </span>
          </div>
        </div>
      )
    );
  };

  return (
    <div
      className={`${
        isInCustomSection ? "mb-0" : "mb-3 lg:mb-0 flex-1 w-full"
      } ${className}`}>
      <label
        htmlFor="msfr-search-drawer"
        onClick={onClick}
        className={`drawer-button py-1 ${
          isInCustomSection ? "h-9" : "h-14 px-4"
        } bg-white cursor-pointer w-full rounded-2xl flex items-center text-gray-700`}>
        <div className="flex items-center text-base">
          <CalendarIcon
            className={`${
              isInCustomSection ? "mr-1 scale-75" : "mr-3"
            } fill-gray-800`}
          />
          <div className="flex flex-col items-start">
            <span className={`${isInCustomSection ? "text-xs" : "text-base"}`}>
              Dates
            </span>
            <ShowDateComponent />
          </div>
        </div>
      </label>
    </div>
  );
};

export default DateDrawer;
