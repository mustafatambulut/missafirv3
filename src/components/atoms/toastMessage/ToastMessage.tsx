import { get } from "lodash";
import classNames from "classnames";

import { IToastMessage } from "@/components/atoms/toastMessage/types";

import SuccessIcon from "../../../../public/images/care.svg";
import DangerIcon from "../../../../public/images/exclamation.svg";
import WarningIcon from "../../../../public/images/announcement.svg";
import CloseIcon from "../../../../public/images/variants/close_small.svg";

const ToastMessage = ({
  item,
  toast,
  title,
  children,
  status,
  className = ""
}: IToastMessage) => {
  const containerClass = classNames(
    `rounded-2xl shadow-sm pointer-events-auto flex item-center gap-x-6 p-3 px-4 bg-white ${className}`,
    {
      "animate-enter": get(item, "visible"),
      "animate-leave": !get(item, "visible")
    }
  );

  const titleClass = classNames("text-2xl capitalize", {
    "text-error-red": status === "error",
    "text-success-green": status === "success",
    "text-warning-yellow": status === "warning"
  });

  const iconClass = classNames(
    `flex w-16 h-16 items-center justify-center rounded-full`,
    {
      "bg-red-100": status === "error",
      "bg-green-100": status === "success",
      "bg-yellow-100": status === "warning"
    }
  );

  const icon = () => {
    switch (status) {
      case "success":
        return <SuccessIcon />;
      case "error":
        return <DangerIcon />;
      case "warning":
        return <WarningIcon />;
    }
  };

  return (
    <div className={containerClass}>
      <div className={iconClass}>{icon()}</div>
      <div>
        <h1 className={titleClass}>{title}</h1>
        {children}
      </div>
      <button onClick={() => toast.remove()}>
        <CloseIcon />
      </button>
    </div>
  );
};

export default ToastMessage;
