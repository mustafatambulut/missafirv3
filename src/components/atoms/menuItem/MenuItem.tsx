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
    `pl-0 active:bg-white text-lg lg:text-base capitalize ${linkClassName}`,
    {
      "font-mi-semi-bold": variant === "footer"
    }
  );
  return (
    <li className={`${className}`}>
      <Link href={get(item, "link")} className={linkClass}>
        {get(item, "label")}
      </Link>
    </li>
  );
};

export default MenuItem;
