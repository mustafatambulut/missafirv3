import Link from "next/link";
import classNames from "classnames";
import { map, size, startCase } from "lodash";

import { IBreadcrumbs } from "@/components/atoms/breadcrumbs/types";

const Breadcrumbs = ({ items, listClass, className = "" }: IBreadcrumbs) => {
  const listClassName = (key) => {
    return classNames(`${listClass}`, {
      "text-primary": key < size(items),
      "text-gray-500": key === size(items)
    });
  };

  return (
    <div className={`max-w-xs breadcrumbs ${className}`}>
      <ul className="text-sm">
        {map(items, ({ url, label }, key) => (
          <li key={key} className={listClassName(++key)}>
            {key === size(items) ? (
              startCase(label)
            ) : (
              <Link href={url}>{startCase(label)}</Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
