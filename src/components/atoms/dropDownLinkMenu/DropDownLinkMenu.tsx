import Link from "next/link";
import { get, map } from "lodash";

import { IDropDownLinkMenu } from "@/components/atoms/dropDownLinkMenu/types";

const DropDownLinkMenu = ({ items, className = "" }: IDropDownLinkMenu) => {
  return (
    <ul
      className={`menu lg:flex-1 lg:flex lg:justify-between text-gray-600 p-0 ${className}`}>
      <li>
        <details className="active:bg-white active:text-gray-600 mb-3">
          <summary className="pl-0 focus:bg-white flex justify-start text-xxl mb-3">
            {get(items, "title")}
          </summary>
          <ul className="before:hidden ml-0 pl-0">
            {map(get(items, "menu_links.data"), (link, key) => (
              <li key={key} className="">
                <Link
                  href={get(link, "attributes.link")}
                  className="p-0 active:bg-white capitalize">
                  {get(link, "attributes.label")}
                </Link>
              </li>
            ))}
          </ul>
        </details>
      </li>
    </ul>
  );
};

export default DropDownLinkMenu;
