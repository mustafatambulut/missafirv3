"use client";
import get from "lodash/get";
import isNull from "lodash/isNull";
import classNames from "classnames";
import isFunction from "lodash/isFunction";
import { useTranslations } from "next-intl";

import { IInputDatePicker } from "@/components/molecules/inputDatePicker/types";

import CalendarIcon from "../../../../public/images/calendar.svg";
import ChevronDownIcon from "../../../../public/images/chevron_down.svg";

const InputDatePicker = (props: IInputDatePicker) => {
  const {
    date,
    isOpened,
    placeholder,
    isShowLabel,
    isShowDates,
    showDatePicker,
    showDateFormat,
    withDatePreview,
    showCalendarIcon,
    customOpenHandler,
    isInCustomSection,
    setShowDatePicker
  } = props;

  const t = useTranslations();

  const containerClass = classNames("flex flex-row lg:items-center h-full", {
    "border p-4 cursor-pointer w-full rounded-lg relative text-sm lg:text-16":
      withDatePreview,
    "h-10": isInCustomSection,
    "h-14": !isInCustomSection,
    "rounded-2xl": !withDatePreview,
    "justify-between w-full": withDatePreview
  });

  const calendarClassName = classNames("hidden fill-gray-800", {
    "lg:block": !isOpened
  });

  const labelContainerClass = classNames(
    "lg:flex lg:flex-col h-full lg:justify-center ",
    {
      "w-[7.3rem]": isInCustomSection,
      "lg:ml-3": showCalendarIcon && !withDatePreview
    }
  );

  const showLabelCustomSectionClass = classNames(
    "text-gray-600 text-left hidden lg:block",
    {
      "lg:text-16": isInCustomSection,
      "lg:text-21": !isInCustomSection
    }
  );

  const showLabelClass = classNames("text-gray-600 text-left hidden lg:block", {
    "lg:text-sm": get(date, "startDate") || get(date, "endDate"),
    "lg:text-21": !(get(date, "startDate") || get(date, "endDate"))
  });

  const showDateClass = classNames("flex", {
    "text-16": isInCustomSection,
    "text-gray-600": withDatePreview,
    "text-gray-800": !withDatePreview
  });

  const showDateWithPreviewClass = classNames("text-gray-600", {
    "block lg:hidden": !isInCustomSection
  });

  const ChevronDownIconClass = classNames("fill-gray-600 scale-125", {
    "rotate-180": showDatePicker
  });

  const handleClickLabel = () => {
    customOpenHandler && isFunction(customOpenHandler) && customOpenHandler();
    withDatePreview ? setShowDatePicker((v) => !v) : setShowDatePicker(true);
  };

  return (
    <div className={containerClass} onClick={handleClickLabel}>
      {showCalendarIcon && <CalendarIcon className={calendarClassName} />}
      {isNull(get(date, "startDate")) && isNull(get(date, "endDate")) && (
        <span className="text-gray-600 text-left hidden lg:block lg:text-16">
          {placeholder}
        </span>
      )}
      <div className={labelContainerClass}>
        {isShowLabel && (
          <>
            {isInCustomSection ? (
              isNull(get(date, "startDate")) &&
              isNull(get(date, "endDate")) && (
                <span className={showLabelCustomSectionClass}>
                  {t("any_week")}
                </span>
              )
            ) : (
              <span className={showLabelClass}>
                {isNull(get(date, "startDate")) && isNull(get(date, "endDate"))
                  ? t("any_week")
                  : t("dates")}
              </span>
            )}
          </>
        )}
        {isShowDates && (
          <>
            {get(date, "startDate") || get(date, "endDate") ? (
              <div className={showDateClass}>
                <span className="whitespace-nowrap">
                  {get(date, "startDate")?.format(showDateFormat)}
                </span>
                <span className="mx-1">-</span>
                <span className="whitespace-nowrap">
                  {get(date, "endDate")?.format(showDateFormat)}
                </span>
              </div>
            ) : (
              <span className={showDateWithPreviewClass}>
                {withDatePreview ? t("select_dates") : t("choose_date")}
              </span>
            )}
          </>
        )}
      </div>
      {withDatePreview && <ChevronDownIcon className={ChevronDownIconClass} />}
    </div>
  );
};

export default InputDatePicker;
