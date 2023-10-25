import { map } from "lodash";
import Image from "next/image";
import ReactFastMarquee from "react-fast-marquee";

import { IMarquee } from "@/components/atoms/marquee/types";

const Marquee = ({
  items,
  speed = 50,
  className = "",
  direction = "left",
  marqueeItemClassName = "",
  marqueeItemInnerClassName = "",
  marqueeImageClassName = ""
}: IMarquee) => {
  return (
    <ReactFastMarquee
      autoFill={true}
      speed={speed}
      direction={direction}
      className={className}>
      {map(items, (image, key) => (
        <div className={`relative ${marqueeItemClassName}`} key={key}>
          {image && (
            <div className={`relative ${marqueeItemInnerClassName}`}>
              <Image
                src={image}
                fill={true}
                alt="image"
                className={marqueeImageClassName}
              />
            </div>
          )}
        </div>
      ))}
    </ReactFastMarquee>
  );
};

export default Marquee;
