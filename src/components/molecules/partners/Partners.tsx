import {groupArrayBySize} from "@/utils/helper";

import Marquee from "@/components/atoms/marquee/Marquee";
import { IPartners } from "@/components/molecules/partners/types";

const Partners = ({ header, body }: IPartners) => {
  const marqueeItems = groupArrayBySize(body, 20);

  return (
    <div className="lg:px-40">
      <div className="flex flex-col items-center mb-10">
        <div className="text-[28px] lg:text-[42px] font-mi-sans-semi-bold mb-8 text-center">
          {header.title}
        </div>
        <p className="lg:px-60 text-lg lg:text-xl text-center text-gray-600">
          {header.description}
        </p>
      </div>
      {marqueeItems.map((item, index) => {
        return (
          <Marquee
            items={item}
            key={index}
            className="mb-4"
            direction={index % 2 === 0 ? "left" : "right"}
          />
        );
      })}
    </div>
  );
};

export default Partners;
