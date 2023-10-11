import { ReactNode } from "react";
import classNames from "classnames";

import { IBanner } from "@/components/molecules/banner/types";

const Banner = ({
  type,
  title = "",
  body = "",
  bodyClass = "",
  className = "",
  titleClass = "",
  children,
  style = null,
  useCustomBg = false
}: IBanner) => {
  const containerClass = classNames(
    `flex flex-col gap-y-6 shadow-bold-blur-20-dark items-start px-6 py-9 lg:p-14 rounded-xl lg:rounded-3xl ${className}`,
    {
      "bg-gradient-to-r from-primary to-pink": !useCustomBg && type === "primary",
      "bg-white": !useCustomBg && type === "light"
    }
  );

  const bodyClassName = classNames(
    `text-left lg:text-center whitespace-normal text-md lg:text-21 ${bodyClass}`,
    {
      "text-white": type === "primary",
      "text-primary": type === "light"
    }
  );

  const titleClassName = classNames(
    `text-left lg:text-center text-28 lg:text-4xl ${titleClass}`,
    {
      "text-white": type === "primary",
      "text-primary": type === "light"
    }
  );

  const BodyComponent = (): ReactNode => {
    return typeof body === "string" ? (
      <p className={bodyClassName}>{body}</p>
    ) : (
      body
    );
  };

  return (
    <div className={containerClass} style={style}>
      {title ? <h1 className={titleClassName}>{title}</h1> : null}
      {body ? <BodyComponent /> : null}
      {children}
    </div>
  );
};

export default Banner;
