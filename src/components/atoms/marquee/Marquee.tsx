import { map } from "lodash";
import Image from "next/image";
import ReactFastMarquee from "react-fast-marquee";

import { IMarquee } from "@/components/atoms/marquee/types";

const Marquee = ({
  items,
  direction = "left",
  speed = 50,
  className = "",
  marqueeItemClassName = ""
}: IMarquee) => {
  return (
    <ReactFastMarquee speed={speed} direction={direction} className={className}>
      {map(items, (item, index) => (
        <div className={marqueeItemClassName}>
          <Image
            key={index}
            src={item.image}
            alt="image"
            width={160}
            height={50}
          />
        </div>
      ))}
    </ReactFastMarquee>
  );
};

export default Marquee;
