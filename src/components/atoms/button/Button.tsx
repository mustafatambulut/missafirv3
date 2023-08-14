import Link from "next/link";
import classNames from "classnames";
import { IButton } from "@/components/atoms/button/types";

const Button = ({
  type = "button",
  link = "",
  target = "_self",
  disabled,
  children,
  isRtl = false,
  className = "",
  outline = false,
  variant = "btn-primary",
  ...props
}: IButton) => {
  const btnClass = classNames(
    `btn items-center font-mi-sans-semi-bold normal-case text-base ${variant} ${className}`,
    {
      "btn-outline": outline,
      "flex-row-reverse": isRtl
    }
  );

  return link ? (
    <Link href={link} target={target} className={btnClass} {...props}>
      {children}
    </Link>
  ) : (
    <button type={type} className={btnClass} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

export default Button;
