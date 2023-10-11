import classNames from "classnames";
import { IAlert } from "@/components/atoms/alert/types";
import Typography from "../typography/Typography";

const Alert = ({
  icon,
  title,
  onClick,
  className = "",
  variant = "success"
}: IAlert) => {
  const containerClass = classNames("", {
    "bg-blue-100": variant === "info",
    "bg-primary-100": variant === "danger",
    "bg-green-100": variant === "success",
    "bg-yellow-100": variant === "warning"
  });

  const textClass = classNames("", {
    "text-blue-600": variant === "info",
    "text-primary-600": variant === "danger",
    "text-green-600": variant === "success",
    "text-yellow-600": variant === "warning"
  });

  return (
    <div
      className={`flex rounded-lg items-center justify-between p-3 my-2 ${containerClass} ${className}`}>
      <p className={textClass}>{title}</p>
      <Typography variant="p3" element="span" onClick={onClick}>{icon}</Typography>
    </div>
  );
};

export default Alert;
