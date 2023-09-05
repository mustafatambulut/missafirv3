"use client";
import classNames from "classnames";

import { IModal } from "@/components/atoms/modal/types";

import CancelIcon from "../../../../public/images/variants/close.svg";

const Modal = ({
  isOpen,
  setIsOpen,
  children,
  label,
  bodyClass = "",
  className = "",
  onClose
}: IModal) => {
  const close = () => setIsOpen(false);

  const modalClass = classNames(`modal ${className}`, {
    "modal-open": isOpen
  });

  return (
    <dialog onClick={onClose || close} className={modalClass}>
      <div
        onClick={(e) => e.stopPropagation()}
        method="dialog"
        className={`modal-box ${bodyClass}`}>
        <button onClick={onClose || close} className="absolute right-6 top-6">
          <CancelIcon className="fill-gray-800" />
        </button>
        <h3 className="flex items-center font-bold text-2xl">{label}</h3>
        {children}
      </div>
    </dialog>
  );
};

export default Modal;
