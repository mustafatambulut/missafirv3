import { ISelectLangOptionImage } from "@/components/atoms/selectLangOptionImage/types";

import Image from "next/image";

const SelectLangOptionImage = ({
  image,
  className = ""
}: ISelectLangOptionImage) => (
  <div className="avatar">
    <div className={`rounded-full ${className}`}>
      {image ? (
        <Image src={image} alt="image" width={24} height={24} />
      ) : (
        <div className="flex justify-center items-center rounded-full bg-gray-100 h-10 w-10">
          <Image src="/images/home.svg" alt="image" width={24} height={24} />
        </div>
      )}
    </div>
  </div>
);

export default SelectLangOptionImage;
