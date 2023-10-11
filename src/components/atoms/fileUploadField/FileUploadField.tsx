"use client";
import { useCallback, useState } from "react";
import Image from "next/image";
import classNames from "classnames";
import { useDropzone } from "react-dropzone";
import { filter, get, map, size } from "lodash";
import { useTranslations } from "next-intl";
import CloseIcon from "../../../../public/images/close.svg";
import CheckIcon from "../../../../public/images/success_check.svg";
import Typography from "../typography/Typography";

const FileUploadField = ({ handleOnChange, value }) => {
  const t = useTranslations();
  const [showContent, setShowContent] = useState(false);
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    const mappedAcceptedFiles = map(acceptedFiles, (file) => ({
      file,
      preview: URL.createObjectURL(file),
      errors: []
    }));
    handleOnChange([...value, ...mappedAcceptedFiles, ...rejectedFiles]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const contentClass = classNames("flex flex-col gap-y-5 ", {
    "max-h-[260px] overflow-hidden": !showContent && size(value) > 3,
    "max-h-auto overflow-visible pb-16": showContent && size(value) > 3
  });
  const handeDeleteFile = (fileName: string) => {
    const newFiles = filter(
      value,
      (file) => get(file, "file.name") !== fileName
    );
    handleOnChange(newFiles);
  };

  const toggleShowContent = () => setShowContent((v) => !v);

  return (
    <div className="grid grid-cols-1 gap-y-5 p-0">
      <div
        className="border border-dashed flex flex-col justify-center items-center h-40 rounded border-2 text-gray-700 cursor-pointer"
        {...getRootProps()}>
        <input {...getInputProps()} />
        <Typography variant="p4" element="span" className="underline cursor-pointer"> {t("click_up")} </Typography>
        <Typography variant="p4" element="span">{t("or")}</Typography>
        <Typography variant="p4" element="span">{t("drag_and_drop")}</Typography>
      </div>
      <div className={contentClass}>
        {map(value, (file, index) => (
          <div
            key={index}
            className="flex w-full items-center rounded-lg border border-gray-300 text-base text-gray-700 font-mi-sans-semi-bold">
            <div className="rounded-l-lg w-12 h-12 relative">
              <Image
                src={get(file, "preview") || "/"}
                alt={"img"}
                fill={true}
                className="object-cover rounded-l-lg"
              />
            </div>
            <div className="flex flex-1 justify-between items-center px-4">
              <div className="flex gap-x-2 items-center">
                <span className="line-clamp-1 w-full">
                  {get(file, "file.name")}
                </span>
                <span
                  className="cursor-pointer"
                  onClick={() => handeDeleteFile(get(file, "file.name"))}>
                  <CloseIcon className="fill-gray-800 scale-75" />
                </span>
              </div>
              <span className="rounded-full bg-success-green">
                <CheckIcon className="fill-success-green" />
              </span>
            </div>
          </div>
        ))}
        {size(value) > 3 && (
          <div
            onClick={toggleShowContent}
            className="border rounded-lg border-gray-700 absolute bottom-0 left-0 w-full bg-white p-3 flex justify-center items-center cursor-pointer">{`${size(value) - 3
              }+`}</div>
        )}
      </div>
    </div>
  );
};

export default FileUploadField;
