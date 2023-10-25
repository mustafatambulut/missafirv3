"use client";
import classNames from "classnames";

import { IModal } from "@/components/atoms/modal/types";

import CancelIcon from "../../../../public/images/variants/close.svg";
import Typography from "../typography/Typography";
import { useEffect } from "react";

const Modal = ({
  isOpen,
  setIsOpen,
  children,
  label,
  bodyClass = "",
  className = "",
  onClose,
  isDisableClose = false
}: IModal) => {
  const modalClass = classNames(`modal ${className}`, {
    "modal-open": isOpen
  });

  const handleOnClick = (e) => {
    if (isDisableClose) return;
    onClose ? onClose(e) : setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      if (typeof window !== "undefined") {
        window.document.addEventListener("keyup", function (event) {
          const key = event.key; // const {key} = event; in ES6+
          if (key === "Escape") {
            const openModalsLength =
              window.document.querySelectorAll(".modal-open").length;
            if (openModalsLength > 1) {
              onClose(event);
            } else {
              setIsOpen(false);
            }
          }
        });
      }
    }
  }, [isOpen]);

  return (
    <dialog onClick={handleOnClick} className={modalClass}>
      <div
        onClick={(e) => e.stopPropagation()}
        method="dialog"
        className={`modal-box ${bodyClass}`}>
        {!isDisableClose && (
          <button onClick={handleOnClick} className="absolute right-6 top-6">
            <CancelIcon className="fill-gray-800" />
          </button>
        )}
        <Typography
          variant="h5"
          element="h5"
          className="flex items-center text-gray-700">
          {label}
        </Typography>
        <div className="mt-5">{children}</div>
      </div>
    </dialog>
  );
};

export default Modal;
