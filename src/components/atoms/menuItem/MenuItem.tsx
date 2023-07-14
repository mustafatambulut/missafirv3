import Link from "next/link";
import { get } from "lodash";
import classNames from "classnames";

import { IMenuItem } from "@/components/atoms/menuItem/types";

const MenuItem = ({
  item,
  className = "",
  linkClassName = "",
  variant = "default"
}: IMenuItem) => {
  const linkClass = classNames(
    `p-0 active:bg-white capitalize hover:bg-transparent ${linkClassName}`,
    {
      "font-mi-sans-semi-bold": variant === "footer"
    }
  );
  return (
    <li className={`${className}`}>
      <Link href={get(item, "link") || ""} className={linkClass}>
        {get(item, "label")}
      </Link>
    </li>
  );
};

export default MenuItem;
