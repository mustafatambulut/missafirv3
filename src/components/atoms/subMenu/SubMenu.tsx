import { get, map } from "lodash";

import { ISubMenu } from "@/components/atoms/subMenu/types";

import MenuItem from "@/components/atoms/menuItem/MenuItem";

const Submenu = ({
  name,
  items,
  isCollapsable,
  className = "",
  variant = "default"
}: ISubMenu) => {
  return (
    <li className={className}>
      {isCollapsable ? (
        <details className="active:bg-white active:text-black mb-3">
          <summary className="pl-0 focus:bg-white flex justify-start text-22 mb-3">
            {name}
          </summary>
          <ul className="before:hidden ml-0 pl-0">
            {map(items, (link, key) => (
              <MenuItem
                variant={variant}
                linkClassName="hover:bg-transparent text-gray-700 font-light p-0 mb-2"
                item={get(link, "attributes")}
                key={key}
              />
            ))}
          </ul>
        </details>
      ) : (
        <ul className="menu border-none before:hidden">
          <li className="menu-title text-gray-800 text-xs uppercase p-0 mb-4 font-bold">
            {name}
          </li>
          {map(items, (link, key) => (
            <MenuItem
              variant={variant}
              linkClassName="hover:bg-transparent text-gray-500 p-0 mb-2"
              item={get(link, "attributes")}
              key={key}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default Submenu;
