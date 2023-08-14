import classNames from "classnames";

import { ITabTitle } from "@/components/atoms/tabTitle/types";

const TabTitle = ({
  id,
  title,
  onClick,
  activeTab,
  className = ""
}: ITabTitle) => {
  const btnClass = classNames(
    `${className} tab tab-bordered flex-1 text-grey-600 text-base lg:text-2xl h-auto pb-1 lg:pb-2 border-b-grey-100 border-b-4 px-0`,
    {
      "tab-active text-grey-800 border-b-grey-100": id === activeTab
    }
  );
  return (
    <div onClick={onClick} className={btnClass}>
      <span>{title}</span>
    </div>
  );
};

export default TabTitle;
