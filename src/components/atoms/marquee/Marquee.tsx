import { map } from "lodash";
import Image from "next/image";
import ReactFastMarquee from "react-fast-marquee";

import { IMarquee } from "@/components/atoms/marquee/types";

const Marquee = ({
  items,
  speed = 50,
  className = "",
  direction = "left",
  marqueeItemClassName = ""
}: IMarquee) => {
  return (
    <ReactFastMarquee speed={speed} direction={direction} className={className}>
      {map(items, (image, key) => (
        <div className={marqueeItemClassName} key={key}>
          <Image src={image} alt="image" width={160} height={50} />
        </div>
      ))}
    </ReactFastMarquee>
  );
};

export default Marquee;
