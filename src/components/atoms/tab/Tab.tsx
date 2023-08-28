import { map } from "lodash";
import classNames from "classnames";

import { useAppSelector } from "@/redux/hooks";
import { ITab } from "@/components/atoms/tab/types";

const Tab = ({ tabs, changeTab, className = "" }: ITab) => {
  const { currentTab } = useAppSelector((state) => state.messageReducer);

  const tabItemClass = (title) => {
    return classNames("tab text-base px-8 w-1/2 text-gray-900", {
      "tab-active bg-gray-100": currentTab === title
    });
  };

  return (
    <div
      className={`tabs tabs-boxed justify-between bg-white rounded-xl border border-gray-200 ${className}`}>
      {map(tabs, ({ title }, key) => (
        <button
          key={key}
          id={title}
          onClick={changeTab}
          className={tabItemClass(title)}>
          {title}
        </button>
      ))}
    </div>
  );
};

export default Tab;
