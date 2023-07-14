import Image from "next/image";
import { IOptionImage } from "@/components/atoms/optionImage/types";

const OptionImage = ({ image, className = "" }: IOptionImage) => {
  return (
    <>
      {image && (
        <div className="avatar">
          <div className={`${className}`}>
            <Image
              src={image}
              className="rounded-full"
              alt="image"
              width={24}
              height={24}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default OptionImage;
