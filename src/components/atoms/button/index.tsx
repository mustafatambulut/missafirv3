"use-client"
import Link from "next/link";
import { IButton } from "@/components/atoms/button/types";

const Button = ({ className, children, variant = "primary", link, disabled, ...props }: IButton) => {
  return link ? (
    <Link
      href={link}
      className={`btn btn-${variant} normal-case ${className}`}
      {...props}>
      {children}
    </Link>
  ) : (
    <button className={`btn btn-${variant} normal-case ${className}`} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

export default Button;
