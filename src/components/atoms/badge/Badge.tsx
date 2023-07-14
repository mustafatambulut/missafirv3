import classNames from "classnames";
import { IBadge } from "@/components/atoms/badge/types";

const Badge = ({ className, children, color }: IBadge) => {
  const badgeClass = classNames(`badge ${className}`,{
    "text-primary": color === "primary",
    "text-blue-500": color === "secondary",
  });
  return <div className={badgeClass}>{children}</div>;
};

export default Badge;
