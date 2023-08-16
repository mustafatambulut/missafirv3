import Image from "next/image";

import { IOptionImage } from "@/components/atoms/optionImage/types";

const OptionImage = ({
  src = "",
  className = "",
  imageClassName = "",
  width,
  height
}: IOptionImage) => {
  return (
    <div className={`${className}`}>
      <Image
        src={src}
        className={imageClassName}
        alt="image"
        width={width}
        height={height}
      />
    </div>
  );
};

export default OptionImage;
