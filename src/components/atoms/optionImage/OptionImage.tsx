import Image from "next/image";

import { IOptionImage } from "@/components/atoms/optionImage/types";

const OptionImage = ({
  image,
  className = "",
  imageClassName = "",
  imageWidth,
  imageHeight
}: IOptionImage) => {
  return (
    <div className={`${className}`}>
      <Image
        src={image || ""}
        className={imageClassName}
        alt="image"
        width={imageWidth}
        height={imageHeight}
      />
    </div>
  );
};

export default OptionImage;
