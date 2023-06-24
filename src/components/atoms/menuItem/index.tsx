import { get } from "lodash";

import { IMenuItem } from "@/components/atoms/menuItem/types";

const MenuItem = ({
  item,
  listClassName = "",
  linkClassName = ""
}: IMenuItem) => {
  return (
    <li className={`${listClassName}`}>
      <a
        href={get(item, "url")}
        target={get(item, "target")}
        className={`pl-0 active:bg-white text-xl ${linkClassName}`}>
        {get(item, "title")}
      </a>
    </li>
  );
};

export default MenuItem;
