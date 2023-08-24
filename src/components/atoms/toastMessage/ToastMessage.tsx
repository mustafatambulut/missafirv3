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
    `grid grid-cols-4 rounded-2xl shadow-md border border-gray-100 gap-1 bg-white m-3 rounded-lg p-3 max-w-md ${className}`,
    {
      "animate-enter": get(item, "visible"),
      "animate-leave": !get(item, "visible")
    }
  );

  const titleClass = classNames(
    `text-lg font-semibold lg:text-2xl capitalize`,
    {
      "text-error-red": status === "error",
      "text-success-green": status === "success",
      "text-warning-yellow": status === "warning"
    }
  );

  const iconClass = classNames(
    `flex w-16 h-16 rounded-full p-2.5 justify-center`,
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
      <div className="col-span-2">
        <h1 className={titleClass}>{title}</h1>
        {children}
      </div>
      <div className="text-end col-span-1">
        <button onClick={() => toast.remove()}>
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};

export default ToastMessage;
