"use-client";
import Link from "next/link";
import { IButton } from "@/components/atoms/button/types";

const Button = ({
  link,
  disabled,
  children,
  leftIcon,
  className,
  rightIcon,
  outline = false,
  variant = "btn-primary",
  ...props
}: IButton) => {
  return link ? (
    <Link
      href={link}
      className={`btn ${variant} normal-case text-lg lg:text-22 font-missafir-semi-bold ${className}`}
      {...props}>
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </Link>
  ) : (
    <button
      className={`btn font-missafir-semi-bold ${
        outline && "btn-outline"
      } ${variant}  normal-case text-lg lg:text-22 ${className}`}
      disabled={disabled}
      {...props}>
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};

export default Button;
