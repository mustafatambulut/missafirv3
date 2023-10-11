import Link from "next/link";
import classNames from "classnames";
import { map, size } from "lodash";

import { IBreadcrumbs } from "@/components/atoms/breadcrumbs/types";

const Breadcrumbs = ({ items, listClass, className = "" }: IBreadcrumbs) => {
  const listClassName = (key) => {
    return classNames(`${listClass}`, {
      "text-primary": key < size(items),
      "text-gray-500": key === size(items)
    });
  };
  return (
    <div className={`max-w-full overflow-x-auto breadcrumbs ${className}`}>
      <ul className="text-sm">
        {map(items, ({ url, title }, key) => (
          <li key={key} className={listClassName(++key)}>
            {url ? <Link href={url}>{title}</Link> : title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Breadcrumbs;