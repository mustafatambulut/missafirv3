import { get } from "lodash";
import { IMenuItem } from "@/components/atoms/MenuItem/types";

const MenuItem = ({
  item,
  listClassName = "",
  linkClassName = ""
}: IMenuItem) => {
  return (
    <li className={listClassName}>
      <a
        href={get(item, "url")}
        target={get(item, "target")}
        className={`text-black ${linkClassName}`}>
        {get(item, "title")}
      </a>
    </li>
  );
};

export default MenuItem;
