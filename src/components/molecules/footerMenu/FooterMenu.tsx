/*eslint-disable*/
import { get, map, size } from "lodash";
import React from "react";
import Menu from "@/components/molecules/menu/Menu";

const FooterMenu = ({ items, className = "" }) => {
  return (
    <>
      {map(items, (menu, key) => (
        <div className={className} key={key}>
          <h1 className="text-lg uppercase">{get(menu, "title")}</h1>
          <Menu
            className=""
            variant="footer"
            isCollapsable={false}
            links={get(menu, "menu_links.data")}
          />
        </div>
      ))}
    </>
  );

  // return (
  //   <div>
  //     <p>{get(head)}</p>
  //     <ul
  //       className={`menu lg:menu-horizontal lg:flex-1 lg:flex lg:justify-between bg-white p-0 ${className}`}>
  //       {map(items, (item, key) => (
  //         <li>
  //           <span>{get(item, "title")}</span>
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // );
};

export default FooterMenu;
