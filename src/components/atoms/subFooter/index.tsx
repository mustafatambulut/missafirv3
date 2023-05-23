import {
  SUB_FOOTER,
  SUB_FOOTER_MENU
} from "@/components/atoms/subFooter/constants";
import { getMenuByComponent, getPageDataByComponent } from "@/utils/helper";

import MenuItem from "@/components/atoms/MenuItem";

const SubFooter = async ({ currentPage, className = "" }: string) => {
  const links = await getMenuByComponent(SUB_FOOTER_MENU);
  const { description } = await getPageDataByComponent(currentPage, SUB_FOOTER);

  return (
    <footer className={`footer footer-center p-4 ${className}`}>
      <p>{description}</p>
      <ul className="flex">
        {links.map(({ attributes }, key) => (
          <MenuItem
            linkClassName="link link-hover text-white"
            key={key}
            item={attributes}
          />
        ))}
      </ul>
    </footer>
  );
};

export default SubFooter;
