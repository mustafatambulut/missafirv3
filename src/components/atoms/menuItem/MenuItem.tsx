import { get } from "lodash";

import { IMenuItem } from "@/components/atoms/menuItem/types";

const MenuItem = ({
  item,
  listClassName = "",
  linkClassName = "",
  variant = "default"
}: IMenuItem) => {
  return (
    <li className={`${listClassName}`}>
      <a
        href={get(item, "url")}
        target={get(item, "target")}
        className={`pl-0 active:bg-white text-lg lg:text-base ${
          variant === "footer" && "font-missafir-semi-bold"
        } ${linkClassName}`}>
        {get(item, "title")}
      </a>
    </li>
  );
};

export default MenuItem;
